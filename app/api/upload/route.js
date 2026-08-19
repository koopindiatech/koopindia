import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import crypto from "crypto";

/* ─── Helper to initialize Firebase Admin safely inside handler ─── */
function getFirebaseAdmin() {
  if (!getApps().length) {
    let rawVal = process.env.GOOGLE_PRIVATE_KEY || "";
    rawVal = rawVal.trim();
    
    let cred;
    if (rawVal.startsWith("{")) {
      /* GOOGLE_PRIVATE_KEY is actually the full Service Account JSON object blob */
      try {
        const parsedJson = JSON.parse(rawVal);
        cred = cert(parsedJson);
      } catch {
        /* Fallback in case escaped characters need cleanup before JSON parsing */
        const cleanJson = JSON.parse(rawVal.replace(/\\n/g, "\\n"));
        cred = cert(cleanJson);
      }
    } else {
      /* GOOGLE_PRIVATE_KEY is a standalone RSA private key string */
      const privateKey = rawVal.replace(/^["']|["']$/g, "").replace(/\\n/g, "\n");
      cred = cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "koopindia",
        clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
        privateKey: privateKey,
      });
    }

    initializeApp({
      credential: cred,
      storageBucket: process.env.GOOGLE_STORAGE_BUCKET || "koopindia.appspot.com",
    });
  }
  return getApps()[0];
}

export async function POST(request) {
  try {
    /* Ensure Admin app is initialized within try/catch to return JSON on config errors */
    getFirebaseAdmin();

    const formData = await request.formData();
    const file = formData.get("file");
    const path = formData.get("path");

    if (!file || !path) {
      return Response.json({ error: "Missing file or path" }, { status: 400 });
    }

    /* Convert File to Buffer */
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const bucket = getStorage().bucket();
    const fileRef = bucket.file(path);

    /* Generate standard Firebase Storage download token to prevent public IAM permissions errors */
    const downloadToken = crypto.randomUUID();

    await fileRef.save(buffer, {
      metadata: { 
        contentType: file.type || "image/jpeg",
        metadata: {
          firebaseStorageDownloadTokens: downloadToken,
        }
      },
    });

    /* Return official Firebase Client SDK compatible URL */
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(path)}?alt=media&token=${downloadToken}`;

    return Response.json({ url: publicUrl });
  } catch (err) {
    console.error("Server upload error:", err);
    return Response.json({ error: err.message || "Server upload failed" }, { status: 500 });
  }
}

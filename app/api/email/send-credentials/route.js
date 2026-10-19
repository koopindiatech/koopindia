import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      to,
      name = "Partner",
      companyName = "",
      password,
      role = "buyer",
      profileId = "",
      loginUrl: customLoginUrl,
    } = body;

    if (!to || !to.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid recipient email ('to') is required" },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { success: false, error: "Password is required to send credentials" },
        { status: 400 }
      );
    }

    // SMTP Configuration
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpSecure = process.env.SMTP_SECURE !== "false";
    const fromAddress =
      process.env.SMTP_FROM ||
      (smtpUser ? `"Koop India Portal" <${smtpUser}>` : '"Koop India" <koopindiadl@gmail.com>');

    // If SMTP credentials are not yet configured in .env
    if (!smtpUser || !smtpPass) {
      console.warn(
        `[EMAIL NOTICE] Cannot send credentials to ${to}: SMTP_USER or SMTP_PASS is missing in .env.`
      );
      return NextResponse.json({
        success: false,
        notConfigured: true,
        message: "SMTP credentials (SMTP_USER / SMTP_PASS) not configured in .env",
      });
    }

    // Initialize Transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const adminPanelUrl = "https://www.koopindia.com/adminpanel";
    const customerName = (name && name.trim()) || (companyName && companyName.trim()) || "Valued Partner";
    const isSeller = role === "seller";
    const subject = `Welcome to Koop India! Registration Confirmation & Portal Details`.trim();

    // Professional HTML Email Template
    const htmlContent = isSeller ? `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.65;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;" cellspacing="0" cellpadding="0">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #ea580c 0%, #f97316 100%); padding: 32px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 900; letter-spacing: 0.5px;">KOOP INDIA</h1>
              <p style="margin: 5px 0 0 0; color: #ffedd5; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Connecting Brands with Business Opportunities.</p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 35px 32px 25px 32px;">
              <p style="margin: 0 0 18px 0; font-size: 16px; color: #0f172a;">Dear <strong>${customerName}</strong>,</p>
              
              <h2 style="margin: 0 0 14px 0; font-size: 20px; font-weight: 800; color: #ea580c;">Welcome to Koop India!</h2>
              
              <p style="margin: 0 0 14px 0; font-size: 14.5px; color: #334155;">
                Thank you for registering your company on Koop India as a Manufacturer / Brand Owner.
              </p>
              
              <p style="margin: 0 0 22px 0; font-size: 14.5px; color: #334155;">
                We are delighted to have you join our growing business network. At Koop India, we help manufacturers, startups, and established brands connect with potential distributors, dealers, wholesalers, and channel partners to expand their market presence.
              </p>

              <!-- How Koop India Can Help Your Brand Grow -->
              <div style="background-color: #fff7ed; border-left: 4px solid #ea580c; border-radius: 0 12px 12px 0; padding: 18px 20px; margin: 20px 0 24px 0;">
                <h3 style="margin: 0 0 10px 0; font-size: 15px; font-weight: 800; color: #9a3412;">
                  How Koop India Can Help Your Brand Grow
                </h3>
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #334155;">
                  By joining Koop India, you can explore opportunities to:
                </p>
                <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #334155;">
                  <li style="margin-bottom: 8px;">
                    <strong>Appoint Distributors & Dealers:</strong> Connect with potential channel partners interested in distributing your products.
                  </li>
                  <li style="margin-bottom: 8px;">
                    <strong>Expand Your Market Reach:</strong> Explore opportunities to grow your distribution network across different states and cities in India.
                  </li>
                  <li style="margin-bottom: 8px;">
                    <strong>Generate Business Enquiries:</strong> Get discovered by buyers, wholesalers, and distributors looking for products in your category.
                  </li>
                  <li style="margin-bottom: 8px;">
                    <strong>Build Your Brand Presence:</strong> Showcase your company, product portfolio, and business opportunities to a wider business audience.
                  </li>
                  <li style="margin-bottom: 0;">
                    <strong>Accelerate Business Growth:</strong> Explore new markets, strengthen your distribution strategy, and create opportunities for long-term business partnerships.
                  </li>
                </ul>
              </div>

              <!-- What Happens Next? -->
              <div style="margin: 22px 0;">
                <h3 style="margin: 0 0 10px 0; font-size: 15px; font-weight: 800; color: #0f172a;">
                  What Happens Next?
                </h3>
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #334155;">
                  Our team will review your company profile and product details to understand your business requirements. Based on your requirements, we can guide you toward suitable opportunities to develop your distributor and dealer network.
                </p>
                <p style="margin: 0 0 14px 0; font-size: 14px; color: #334155;">
                  To help us understand your brand better, please ensure that your company profile, product information, target locations, and distribution requirements are complete and up to date.
                </p>
              </div>

              <!-- Complete Your Profile Here Box -->
              <div style="background-color: #f1f5f9; border: 1.5px solid #cbd5e1; border-radius: 14px; padding: 20px 22px; margin: 24px 0;">
                <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: 800; color: #0f172a;">
                  Complete or Update Your Seller Profile:
                </p>
                <p style="margin: 0 0 14px 0; font-size: 14px;">
                  <a href="${adminPanelUrl}" target="_blank" style="color: #ea580c; font-weight: 700; text-decoration: underline; word-break: break-all;">
                    ${adminPanelUrl}
                  </a>
                </p>
                <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; font-size: 14px; font-family: Consolas, Menlo, Monaco, monospace;">
                  <div style="margin-bottom: 6px; color: #334155;">
                    <strong style="color: #64748b; font-family: sans-serif;">email - </strong> <span style="font-weight: 700; color: #0f172a;">${to}</span>
                  </div>
                  <div style="color: #334155;">
                    <strong style="color: #64748b; font-family: sans-serif;">password- </strong> <span style="font-weight: 700; color: #ea580c; background-color: #fff7ed; padding: 2px 8px; border-radius: 6px; border: 1px dashed #fdba74;">${password}</span>
                  </div>
                </div>
                <div style="text-align: center; margin-top: 18px;">
                  <a href="${adminPanelUrl}" target="_blank" style="display: inline-block; background-color: #ea580c; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-size: 14px; font-weight: 800; box-shadow: 0 3px 12px rgba(234, 88, 12, 0.3);">
                    Complete or Update Your Profile →
                  </a>
                </div>
              </div>

              <p style="margin: 22px 0 24px 0; font-size: 14px; color: #334155;">
                We look forward to supporting your brand in reaching new markets, connecting with potential channel partners, and building a stronger distribution network with Koop India.
              </p>

              <!-- Warm Regards -->
              <p style="margin: 0 0 4px 0; font-size: 14px; color: #334155;">Warm regards,</p>
              <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 800; color: #0f172a;">Team Koop India</p>
              <p style="margin: 0 0 2px 0; font-size: 13px; color: #475569;">
                Website: <a href="https://www.koopindia.com" target="_blank" style="color: #ea580c; text-decoration: none;">https://www.koopindia.com</a>
              </p>
              <p style="margin: 0 0 2px 0; font-size: 13px; color: #475569;">
                Email: <a href="mailto:koopindiadl@gmail.com" style="color: #ea580c; text-decoration: none;">koopindiadl@gmail.com</a>
              </p>
              <p style="margin: 0 0 16px 0; font-size: 13px; color: #475569;">
                Phone: <a href="tel:+919599826131" style="color: #ea580c; text-decoration: none; font-weight: 600;">+91 9599826131</a>
              </p>

              <div style="margin: 16px 0 0 0; border-top: 1px solid #f1f5f9; padding-top: 14px;">
                <p style="margin: 0 0 6px 0; font-size: 13px; font-style: italic; color: #64748b;">
                  Koop India – Connecting Brands with Business Opportunities.
                </p>
                <p style="margin: 0; font-size: 12.5px; font-style: italic; color: #475569;">
                  *If Have any Query Please reply on Same mail.*
                </p>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim() : `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.65;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;" cellspacing="0" cellpadding="0">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #ea580c 0%, #f97316 100%); padding: 32px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 900; letter-spacing: 0.5px;">KOOP INDIA</h1>
              <p style="margin: 5px 0 0 0; color: #ffedd5; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Connecting Businesses. Creating Opportunities.</p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 35px 32px 25px 32px;">
              <p style="margin: 0 0 18px 0; font-size: 16px; color: #0f172a;">Dear <strong>${customerName}</strong>,</p>
              
              <h2 style="margin: 0 0 14px 0; font-size: 20px; font-weight: 800; color: #ea580c;">Welcome to Koop India!</h2>
              
              <p style="margin: 0 0 14px 0; font-size: 14.5px; color: #334155;">
                Thank you for registering your profile on Koop India as a Buyer/Distributor.
              </p>
              
              <p style="margin: 0 0 22px 0; font-size: 14.5px; color: #334155;">
                We’re delighted to have you join our growing business network. At Koop India, our goal is to help buyers, wholesalers, and distributors connect with suitable brands and explore new business opportunities.
              </p>

              <!-- How Koop India Can Help You Grow -->
              <div style="background-color: #fff7ed; border-left: 4px solid #ea580c; border-radius: 0 12px 12px 0; padding: 18px 20px; margin: 20px 0 24px 0;">
                <h3 style="margin: 0 0 10px 0; font-size: 15px; font-weight: 800; color: #9a3412;">
                  How Koop India Can Help You Grow
                </h3>
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #334155;">
                  As a registered member, we will help you:
                </p>
                <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #334155;">
                  <li style="margin-bottom: 8px;">
                    <strong>Connect with Suitable Brands:</strong> Discover manufacturers and brands looking to appoint distributors, dealers, wholesalers, and channel partners.
                  </li>
                  <li style="margin-bottom: 8px;">
                    <strong>Explore New Business Opportunities:</strong> Find products and brands that match your business interests and investment capacity.
                  </li>
                  <li style="margin-bottom: 8px;">
                    <strong>Expand Your Product Portfolio:</strong> Explore opportunities across FMCG, food products, spices, personal care, agriculture, and other industries.
                  </li>
                  <li style="margin-bottom: 0;">
                    <strong>Grow Your Wholesale Business:</strong> Build new brand partnerships and explore opportunities to expand your market reach.
                  </li>
                </ul>
              </div>

              <!-- What Happens Next? -->
              <div style="margin: 22px 0;">
                <h3 style="margin: 0 0 10px 0; font-size: 15px; font-weight: 800; color: #0f172a;">
                  What Happens Next?
                </h3>
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #334155;">
                  Our team will review your profile and business requirements to help identify suitable brand opportunities. The more complete your profile is, the easier it will be for us to understand your requirements and assist you.
                </p>
                <p style="margin: 0 0 14px 0; font-size: 14px; color: #334155;">
                  If you haven't completed your profile yet, please update your business details and product preferences.
                </p>
              </div>

              <!-- Complete Your Profile Here Box -->
              <div style="background-color: #f1f5f9; border: 1.5px solid #cbd5e1; border-radius: 14px; padding: 20px 22px; margin: 24px 0;">
                <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: 800; color: #0f172a;">
                  Complete Your Profile Here:
                </p>
                <p style="margin: 0 0 14px 0; font-size: 14px;">
                  <a href="${adminPanelUrl}" target="_blank" style="color: #ea580c; font-weight: 700; text-decoration: underline; word-break: break-all;">
                    ${adminPanelUrl}
                  </a>
                </p>
                <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; font-size: 14px; font-family: Consolas, Menlo, Monaco, monospace;">
                  <div style="margin-bottom: 6px; color: #334155;">
                    <strong style="color: #64748b; font-family: sans-serif;">user email - </strong> <span style="font-weight: 700; color: #0f172a;">${to}</span>
                  </div>
                  <div style="color: #334155;">
                    <strong style="color: #64748b; font-family: sans-serif;">password- </strong> <span style="font-weight: 700; color: #ea580c; background-color: #fff7ed; padding: 2px 8px; border-radius: 6px; border: 1px dashed #fdba74;">${password}</span>
                  </div>
                </div>
                <div style="text-align: center; margin-top: 18px;">
                  <a href="${adminPanelUrl}" target="_blank" style="display: inline-block; background-color: #ea580c; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-size: 14px; font-weight: 800; box-shadow: 0 3px 12px rgba(234, 88, 12, 0.3);">
                    Login & Complete Your Profile →
                  </a>
                </div>
              </div>

              <p style="margin: 22px 0 24px 0; font-size: 14px; color: #334155;">
                We look forward to helping you discover new brands, build strong business relationships, and grow your wholesale business with Koop India.
              </p>

              <!-- Warm Regards -->
              <p style="margin: 0 0 4px 0; font-size: 14px; color: #334155;">Warm regards,</p>
              <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 800; color: #0f172a;">Team Koop India</p>
              <p style="margin: 0 0 2px 0; font-size: 13px; color: #475569;">
                Website: <a href="https://www.koopindia.com" target="_blank" style="color: #ea580c; text-decoration: none;">https://www.koopindia.com</a>
              </p>
              <p style="margin: 0 0 2px 0; font-size: 13px; color: #475569;">
                Email: <a href="mailto:koopindiadl@gmail.com" style="color: #ea580c; text-decoration: none;">koopindiadl@gmail.com</a>
              </p>
              <p style="margin: 0 0 16px 0; font-size: 13px; color: #475569;">
                Phone: <a href="tel:+919599826131" style="color: #ea580c; text-decoration: none; font-weight: 600;">+91 9599826131</a>
              </p>

              <div style="margin: 16px 0 0 0; border-top: 1px solid #f1f5f9; padding-top: 14px;">
                <p style="margin: 0 0 6px 0; font-size: 13px; font-style: italic; color: #64748b;">
                  Koop India – Connecting Businesses. Creating Opportunities.
                </p>
                <p style="margin: 0; font-size: 12.5px; font-style: italic; color: #475569;">
                  *If Have any Query Please reply on Same mail.*
                </p>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    // Plain Text Version
    const textContent = isSeller ? `
Dear ${customerName},

Welcome to Koop India!

Thank you for registering your company on Koop India as a Manufacturer / Brand Owner.

We are delighted to have you join our growing business network. At Koop India, we help manufacturers, startups, and established brands connect with potential distributors, dealers, wholesalers, and channel partners to expand their market presence.

How Koop India Can Help Your Brand Grow

By joining Koop India, you can explore opportunities to:

- Appoint Distributors & Dealers: Connect with potential channel partners interested in distributing your products.
- Expand Your Market Reach: Explore opportunities to grow your distribution network across different states and cities in India.
- Generate Business Enquiries: Get discovered by buyers, wholesalers, and distributors looking for products in your category.
- Build Your Brand Presence: Showcase your company, product portfolio, and business opportunities to a wider business audience.
- Accelerate Business Growth: Explore new markets, strengthen your distribution strategy, and create opportunities for long-term business partnerships.

What Happens Next?

Our team will review your company profile and product details to understand your business requirements. Based on your requirements, we can guide you toward suitable opportunities to develop your distributor and dealer network.

To help us understand your brand better, please ensure that your company profile, product information, target locations, and distribution requirements are complete and up to date.

Complete or Update Your Seller Profile:  
${adminPanelUrl}
email - ${to}
password- ${password}


We look forward to supporting your brand in reaching new markets, connecting with potential channel partners, and building a stronger distribution network with Koop India.

Warm regards,  
Team Koop India  
Website: https://www.koopindia.com  
Email: koopindiadl@gmail.com  
Phone: +91 9599826131  

Koop India – Connecting Brands with Business Opportunities.  
*If Have any Query Please reply on Same mail.*
    `.trim() : `
Dear ${customerName},

Welcome to Koop India!

Thank you for registering your profile on Koop India as a Buyer/Distributor.

We’re delighted to have you join our growing business network. At Koop India, our goal is to help buyers, wholesalers, and distributors connect with suitable brands and explore new business opportunities.

How Koop India Can Help You Grow

As a registered member, we will help you:

- Connect with Suitable Brands: Discover manufacturers and brands looking to appoint distributors, dealers, wholesalers, and channel partners.
- Explore New Business Opportunities: Find products and brands that match your business interests and investment capacity.
- Expand Your Product Portfolio: Explore opportunities across FMCG, food products, spices, personal care, agriculture, and other industries.
- Grow Your Wholesale Business: Build new brand partnerships and explore opportunities to expand your market reach.

What Happens Next?

Our team will review your profile and business requirements to help identify suitable brand opportunities. The more complete your profile is, the easier it will be for us to understand your requirements and assist you.

If you haven't completed your profile yet, please update your business details and product preferences.

Complete Your Profile Here:  
${adminPanelUrl}
user email - ${to}
password- ${password}


We look forward to helping you discover new brands, build strong business relationships, and grow your wholesale business with Koop India.

Warm regards,  
Team Koop India  
Website: https://www.koopindia.com  
Email: koopindiadl@gmail.com  
Phone: +91 9599826131  

Koop India – Connecting Businesses. Creating Opportunities.  
*If Have any Query Please reply on Same mail.*
    `.trim();

    // Send Mail
    const info = await transporter.sendMail({
      from: fromAddress,
      to,
      subject,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[EMAIL SUCCESS] Credentials email delivered to ${to} (MessageId: ${info.messageId})`);

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      recipient: to,
    });
  } catch (err) {
    console.error("[EMAIL ERROR] Failed to send credentials email:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to send email",
      },
      { status: 500 }
    );
  }
}

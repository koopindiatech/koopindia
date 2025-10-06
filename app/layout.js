import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { ModalProvider } from "@/context/ModalContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Koop India",
  description: "B2B Platform by Koop India",
  icons: {
    icon: "/favican.png",       
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ModalProvider>
        <ClientLayout>{children}</ClientLayout>
        </ModalProvider>
      </body>
    </html>
  );
}

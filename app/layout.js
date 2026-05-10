import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import ExtrasWrapper from "@/components/layout/ExtrasWrapper";
import { ModalProvider } from "@/context/ModalContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Koop India | Business Launchpad for Startups & Entrepreneurs",
  description:
    "Koop India is a business launchpad for startups and entrepreneurs, offering expert consultation, company registration, compliance, licensing, and growth support.",
  icons: {
    icon: "/favican.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
         <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KD68V3ZG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ModalProvider>
          {/* ClientLayout handles Header, Footer and Scroll Modal */}
          <ClientLayout>
            {children}
          </ClientLayout>
          
          {/* ExtrasWrapper handles pathname-based FloatingContact visibility */}
          <ExtrasWrapper />
        </ModalProvider>
      </body>
    </html>
  );
}
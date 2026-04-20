"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { ModalProvider } from "@/context/ModalContext";
import FloatingContact from "@/components/FloatingComponent";
import { usePathname } from "next/navigation";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// export const metadata = {
//   title: "Koop India | Business Launchpad for Startups & Entrepreneurs",
//   description:
//     "Koop India is a business launchpad for startups and entrepreneurs, offering expert consultation, company registration, compliance, licensing, and growth support.",
//   icons: {
//     icon: "/favican.png",
//   },
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // 👉 pages where you want clean layout
  const noLayoutRoutes = ["/services"];
  const hideExtras = noLayoutRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ModalProvider>
          
          {/* Header/Footer handled inside */}
          <ClientLayout>{children}</ClientLayout>

          {/* Hide floating contact also */}
          {!hideExtras && <FloatingContact />}

        </ModalProvider>
      </body>
    </html>
  );
}
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import ExtrasWrapper from "@/components/layout/ExtrasWrapper";
import { ModalProvider } from "@/context/ModalContext";
import Script from "next/script"; 

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`
    (function(w,d,s,l,i){w[l]=w[l]||[];
    w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;
    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KD68V3ZG');
  `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
          <ClientLayout>{children}</ClientLayout>

          {/* ExtrasWrapper handles pathname-based FloatingContact visibility */}
          <ExtrasWrapper />
        </ModalProvider>
      </body>
    </html>
  );
}

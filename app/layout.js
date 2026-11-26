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
  metadataBase: new URL("https://www.koopindia.com"),
  title: "Koop India — B2B Marketplace & Business Services India",
  description:
    "Koop India is India's B2B marketplace connecting manufacturers, suppliers, buyers & distributors. GST Registration, Trademark, FSSAI, Website Development, SEO & Distributor Appointment services — all in one place.",
  keywords: [
    "B2B marketplace India",
    "appoint distributors India",
    "distributor appointment service",
    "find distributors India",
    "GST registration India",
    "trademark registration India",
    "FMCG distributor India",
    "manufacturer supplier India",
    "MSME B2B platform",
    "seller buyer platform India",
    "startup services India",
    "business registration India",
    "distribution network India",
    "koopindia",
  ],
  authors: [{ name: "Koop India", url: "https://www.koopindia.com" }],
  creator: "Koop India",
  publisher: "Koop India",
  icons: { icon: "/favican.png" },
  alternates: {
    canonical: "https://www.koopindia.com",
    types: {
      "application/rss+xml": [
        {
          url: "https://www.koopindia.com/feed.xml",
          title: "Koop India Insights RSS Feed",
        },
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.koopindia.com",
    siteName: "Koop India",
    title: "Koop India — B2B Marketplace & Business Services India",
    description:
      "India's B2B marketplace connecting manufacturers, suppliers, buyers & distributors. GST, Trademark, FSSAI, Distributor Appointment & more.",
    images: [
      {
        url: "https://www.koopindia.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Koop India — B2B Marketplace & Business Services India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Koop India — B2B Marketplace & Business Services India",
    description:
      "India's B2B marketplace connecting manufacturers, suppliers, buyers & distributors. GST, Trademark, FSSAI, Distributor Appointment & more.",
    images: ["https://www.koopindia.com/og-image.png"],
    creator: "@koopindia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://www.google-analytics.com; img-src 'self' data: blob: https://www.facebook.com https://www.googletagmanager.com https://firebasestorage.googleapis.com https://*.firebasestorage.app https://images.unsplash.com;"
        />
        
                <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KD68V3ZG');
          `}
        </Script>

        {/* Google Analytics (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-RTR76SBCNM" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-RTR76SBCNM');
          `}
        </Script>

                <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1949577529262037');
            fbq('track', 'PageView');
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

                <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1949577529262037&ev=PageView&noscript=1"
            alt="facebook pixel"
          />
        </noscript>

        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Koop India",
              alternateName: "KoopIndia",
              url: "https://www.koopindia.com",
              logo: "https://www.koopindia.com/koopindia-logo.png",
              description:
                "India's B2B marketplace and business services platform connecting manufacturers, suppliers, buyers and distributors. Expert GST Registration, Trademark, Distributor Appointment, Website Development and more.",
              foundingDate: "2021",
              areaServed: "IN",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+91-9599826131",
                  contactType: "customer service",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi"],
                },
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Delhi",
                addressRegion: "Delhi",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.facebook.com/koopindia",
                "https://www.linkedin.com/company/koopindia",
                "https://www.instagram.com/koopindia",
              ],
            }),
          }}
        />
        {/* WebSite JSON-LD with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Koop India",
              url: "https://www.koopindia.com",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://www.koopindia.com/marketplace?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <ModalProvider>
          <ClientLayout>{children}</ClientLayout>
          <ExtrasWrapper />
        </ModalProvider>
      </body>
    </html>
  );
}
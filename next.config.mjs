/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "**.firebasestorage.app",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/documentation-compliance/company-registration",
        destination: "/documentation-compliance/company-registration-services",
        permanent: true,
      },
      {
        source: "/documentation-compliance/gst-registration",
        destination: "/gst-registration",
        permanent: true,
      },
      {
        source: "/documentation-compliance/trademark-registration",
        destination: "/trademark-registration",
        permanent: true,
      },
      {
        source: "/digital-marketing/social-media",
        destination: "/social-media-marketing",
        permanent: true,
      },
      {
        source: "/tech-solutions/website-development",
        destination: "/website-development",
        permanent: true,
      },
      {
        source: "/documentation-compliance/iso-certification",
        destination: "/iso-certification",
        permanent: true,
      },
      {
        source: "/documentation-compliance/startup-india-registration",
        destination: "/startup-india-registration",
        permanent: true,
      },
      {
        source: "/tech-solutions/crm-development",
        destination: "/crm-development",
        permanent: true,
      },
      {
        source: "/tech-solutions/seo",
        destination: "/seo-services",
        permanent: true,
      },
      {
        source: "/digital-marketing/social-media-marketing",
        destination: "/social-media-marketing",
        permanent: true,
      },
      {
        source: "/digital-marketing/logo-design",
        destination: "/logo-design",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/contactus",
        permanent: true,
      },
      {
        source: "/company-accounting-services",
        destination: "/documentation-compliance/company-accounting",
        permanent: true,
      },
      {
        source: "/content-writing-services",
        destination: "/digital-marketing/content-writing",
        permanent: true,
      },
      {
        source: "/google-my-business-services",
        destination: "/digital-marketing/gmb",
        permanent: true,
      },
      {
        source: "/logo-graphic-design",
        destination: "/logo-design",
        permanent: true,
      },
      {
        source: "/startup-consulting/distribution-model",
        destination: "/appoint-distributors",
        permanent: true,
      },
      {
        source: "/distribution-module",
        destination: "/appoint-distributors",
        permanent: true,
      },
      {
        source: "/company-registration/bangalore",
        destination: "/company-registration/bengaluru",
        permanent: true,
      },
      {
        source: "/company-registration",
        destination: "/documentation-compliance/company-registration-services",
        permanent: true,
      },
      {
        source: "/fssai-registration/bangalore",
        destination: "/fssai-registration/bengaluru",
        permanent: true,
      },
      {
        source: "/fssai-registration/delhi",
        destination: "/documentation-compliance/fssai-license",
        permanent: true,
      },
      {
        source: "/fssai-registration",
        destination: "/documentation-compliance/fssai-license",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/company-registration-in-:city",
        destination: "/company-registration/:city",
      },
      {
        source: "/fssai-registration-in-:city",
        destination: "/fssai-registration/:city",
      },
      {
        source: "/rss.xml",
        destination: "/feed.xml",
      },
      {
        source: "/blog/feed.xml",
        destination: "/feed.xml",
      },
      {
        source: "/blog/rss.xml",
        destination: "/feed.xml",
      },
    ];
  },
};

export default nextConfig;

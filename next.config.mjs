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
        destination: "/digital-marketing/social-media-marketing",
        permanent: true,
      },
      {
        source: "/tech-solutions/website-development",
        destination: "/website-development",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

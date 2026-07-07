/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
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
    ];
  },
};

export default nextConfig;

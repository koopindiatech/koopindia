export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/adminpanel/",
          "/seller-portal/",
          "/buyer-portal/",
          "/seller-onboarding",
        ],
      },
    ],
    sitemap: "https://www.koopindia.com/sitemap.xml",
  };
}

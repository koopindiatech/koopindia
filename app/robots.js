export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://www.koopindia.com/sitemap.xml",
    host: "https://www.koopindia.com",
  };
}

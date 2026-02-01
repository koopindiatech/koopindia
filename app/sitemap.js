export default function sitemap() {
  const baseUrl = "https://www.koopindia.com";
  const lastModified = new Date();

  return [

    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/aboutus`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contactus`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/term-services`,
      lastModified,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/termservices`,
      lastModified,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/brands`,
      lastModified,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/distributors`,
      lastModified,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tech-solutions/website-development`,
      lastModified,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tech-solutions/crm-development`,
      lastModified,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tech-solutions/seo`,
      lastModified,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/startup-consulting/business`,
      lastModified,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/startup-consulting/distribution-model`,
      lastModified,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/startup-consulting/franchise-model`,
      lastModified,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/startup-consulting/market-analysis`,
      lastModified,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/startup-consulting/product-valuation`,
      lastModified,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/documentation-compliance/company-registration`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/documentation-compliance/gst-registration`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/documentation-compliance/fssai-license`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/documentation-compliance/iso-certification`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/documentation-compliance/startup-india-registration`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/documentation-compliance/company-accounting`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/documentation-compliance/tax-compliance`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/documentation-compliance/trademark-registration`,
      lastModified,
      priority: 0.8,
    },

    {
      url: `${baseUrl}/digital-marketing/social-media`,
      lastModified,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/digital-marketing/gmb`,
      lastModified,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/digital-marketing/logo-design`,
      lastModified,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/digital-marketing/content-writing`,
      lastModified,
      priority: 0.75,
    },

    {
      url: `${baseUrl}/blog`,
      lastModified,
      priority: 0.7,
    },
  ];
}

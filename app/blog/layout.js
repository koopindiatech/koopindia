export const metadata = {
  title: "Koop India Insights | Blog",
  description:
    "Expert advice, industry trends, compliance guides, and actionable strategies to help your business thrive.",
  alternates: {
    canonical: "https://www.koopindia.com/blog",
    types: {
      "application/rss+xml": [
        {
          url: "https://www.koopindia.com/feed.xml",
          title: "Koop India Insights RSS Feed",
        },
      ],
    },
  },
};

export default function BlogLayout({ children }) {
  return children;
}

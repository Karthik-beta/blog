// Sitelinks configuration for Google Search Console
// This file defines the structure and data for Google Search sitelinks

export interface SitelinkItem {
  name: string;
  description: string;
  url: string;
}

export interface SitelinksConfig {
  websiteUrl: string;
  websiteName: string;
  description: string;
  sameAs: string[];
  sitelinks: SitelinkItem[];
}

// Configure your website's sitelinks here
export const sitelinksConfig: SitelinksConfig = {
  websiteUrl: "https://your-blog-domain.com", // Replace with your actual domain
  websiteName: "Pivotr Blog", // Replace with your blog name
  description: "Official blog of Pivotr - insights on ERP, technology, and business innovation",
  sameAs: [
    "https://www.linkedin.com/company/pivotr", // Replace with your social media URLs
    "https://twitter.com/pivotr", // Add your actual social media profiles
    "https://github.com/Karthik-beta"
  ],
  sitelinks: [
    {
      name: "Home",
      description: "Latest blog posts and company updates",
      url: "/"
    },
    {
      name: "Blog Posts",
      description: "All published articles and insights",
      url: "/posts"
    },
    {
      name: "About",
      description: "Learn more about our team and mission",
      url: "/about"
    },
    {
      name: "Contact",
      description: "Get in touch with our team",
      url: "/contact"
    },
    {
      name: "ERP Solutions",
      description: "Explore our enterprise resource planning solutions",
      url: "/erp-solutions"
    },
    {
      name: "Technology",
      description: "Latest technology articles and tutorials",
      url: "/technology"
    }
  ]
};

// Generate JSON-LD structured data for sitelinks
export function generateSitelinksJsonLd(config: SitelinksConfig): string {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${config.websiteUrl}/#website`,
        "url": config.websiteUrl,
        "name": config.websiteName,
        "description": config.description,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${config.websiteUrl}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        },
        "sameAs": config.sameAs
      },
      {
        "@type": "Organization",
        "@id": `${config.websiteUrl}/#organization`,
        "name": config.websiteName,
        "url": config.websiteUrl,
        "sameAs": config.sameAs,
        "logo": {
          "@type": "ImageObject",
          "url": `${config.websiteUrl}/logo.png` // Add your logo URL
        }
      },
      // Generate ItemList for sitelinks
      {
        "@type": "ItemList",
        "@id": `${config.websiteUrl}/#sitelinks`,
        "name": "Site Navigation",
        "numberOfItems": config.sitelinks.length,
        "itemListElement": config.sitelinks.map((sitelink, index) => ({
          "@type": "SiteNavigationElement",
          "position": index + 1,
          "name": sitelink.name,
          "description": sitelink.description,
          "url": `${config.websiteUrl}${sitelink.url}`
        }))
      }
    ]
  };

  return JSON.stringify(structuredData, null, 2);
}

// Generate individual page breadcrumb JSON-LD
export function generateBreadcrumbJsonLd(
  config: SitelinksConfig, 
  breadcrumbs: { name: string; url: string }[]
): string {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${config.websiteUrl}${crumb.url}`
    }))
  };

  return JSON.stringify(structuredData, null, 2);
}

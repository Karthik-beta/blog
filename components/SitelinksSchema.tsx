import { sitelinksConfig, generateSitelinksJsonLd, generateBreadcrumbJsonLd } from '../lib/sitelinks';

interface SitelinksSchemaProps {
  breadcrumbs?: { name: string; url: string }[];
}

export default function SitelinksSchema({ breadcrumbs }: SitelinksSchemaProps) {
  const sitelinksJsonLd = generateSitelinksJsonLd(sitelinksConfig);
  const breadcrumbJsonLd = breadcrumbs ? generateBreadcrumbJsonLd(sitelinksConfig, breadcrumbs) : null;

  return (
    <>
      {/* Sitelinks Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sitelinksJsonLd,
        }}
      />
      
      {/* Breadcrumb Schema (if provided) */}
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbJsonLd,
          }}
        />
      )}
    </>
  );
}

// Hook for easy breadcrumb management
export function useBreadcrumbs(currentPage: string, parentPages?: { name: string; url: string }[]) {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    ...(parentPages || []),
    { name: currentPage, url: '' } // Current page doesn't need URL
  ];
  
  return breadcrumbs.slice(0, -1); // Remove current page from breadcrumbs
}

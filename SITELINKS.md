# Google Search Sitelinks Implementation

This document explains how to configure and use the Google Search sitelinks functionality that has been added to your blog.

## Overview

Google Search sitelinks are additional links that appear below your main search result, helping users navigate directly to specific sections of your website. This implementation uses JSON-LD structured data to provide Google with the necessary information.

## Files Added/Modified

### 1. `lib/sitelinks.ts`
Contains the main configuration and utility functions:
- `SitelinksConfig` interface defining the structure
- `sitelinksConfig` object with your website's sitelinks
- `generateSitelinksJsonLd()` function to create structured data
- `generateBreadcrumbJsonLd()` function for breadcrumb navigation

### 2. `components/SitelinksSchema.tsx`
React component that renders the JSON-LD structured data:
- Renders sitelinks schema as `<script>` tags
- Supports optional breadcrumb navigation
- Includes `useBreadcrumbs()` hook for easy breadcrumb management

### 3. `pages/_document.tsx` (Modified)
Updated to include:
- Sitelinks schema component
- Additional SEO meta tags
- Open Graph and Twitter Card meta tags

## Configuration

### Step 1: Update Website Information

Edit `lib/sitelinks.ts` and update the following:

```typescript
export const sitelinksConfig: SitelinksConfig = {
  websiteUrl: "https://your-actual-domain.com", // ← Change this
  websiteName: "Your Blog Name", // ← Change this
  description: "Your blog description", // ← Change this
  sameAs: [
    "https://www.linkedin.com/company/your-company", // ← Add your social media
    "https://twitter.com/your-handle",
    "https://github.com/your-username"
  ],
  // ...
};
```

### Step 2: Configure Sitelinks

Update the `sitelinks` array with your actual pages:

```typescript
sitelinks: [
  {
    name: "Home",
    description: "Latest blog posts and updates",
    url: "/"
  },
  {
    name: "Blog Posts",
    description: "All published articles",
    url: "/posts"
  },
  // Add more sitelinks as needed
]
```

### Step 3: Update Meta Tags

In `pages/_document.tsx`, update the canonical URL:

```tsx
<link rel="canonical" href="https://your-actual-domain.com" />
```

## Usage

### Basic Usage
The sitelinks are automatically included on all pages through `_document.tsx`.

### Adding Breadcrumbs to Specific Pages

You can add breadcrumb navigation to individual pages:

```tsx
import SitelinksSchema, { useBreadcrumbs } from '../components/SitelinksSchema';
import Head from 'next/head';

export default function BlogPost() {
  const breadcrumbs = useBreadcrumbs('Post Title', [
    { name: 'Blog', url: '/blog' },
    { name: 'Category', url: '/blog/category' }
  ]);

  return (
    <>
      <Head>
        <SitelinksSchema breadcrumbs={breadcrumbs} />
      </Head>
      {/* Your page content */}
    </>
  );
}
```

### Manual Breadcrumb Configuration

```tsx
const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: 'Technology', url: '/blog/technology' }
];

<SitelinksSchema breadcrumbs={breadcrumbs} />
```

## SEO Best Practices

### 1. Choose Important Pages
- Select 4-6 most important pages for sitelinks
- Prioritize high-traffic, valuable content
- Include main navigation items

### 2. Write Clear Descriptions
- Keep descriptions under 160 characters
- Use action-oriented language
- Make them unique and descriptive

### 3. Ensure Pages Exist
- All sitelink URLs must return 200 status codes
- Pages should be crawlable and indexable
- Include proper internal linking

### 4. Monitor Performance
- Use Google Search Console to monitor sitelinks appearance
- Check for structured data errors
- Update sitelinks based on user behavior

## Testing

### 1. Structured Data Testing
Use Google's Structured Data Testing Tool:
1. Visit: https://search.google.com/test/rich-results
2. Enter your website URL
3. Verify the sitelinks data appears correctly

### 2. Local Testing
```bash
# Start development server
npm run dev
# or
yarn dev
# or
bun dev

# Open browser and view page source
# Look for JSON-LD script tags with sitelinks data
```

### 3. HTML Validation
```bash
# Check HTML structure
curl -s "http://localhost:3000" | grep -A 20 'application/ld+json'
```

## Troubleshooting

### Common Issues

1. **Sitelinks not appearing in search results**
   - Google decides when to show sitelinks
   - Ensure your site has good authority and traffic
   - Wait 2-4 weeks after implementation

2. **Structured data errors**
   - Check URLs are absolute (include domain)
   - Verify JSON-LD syntax is valid
   - Ensure all required properties are present

3. **TypeScript errors**
   - Verify all imports are correct
   - Check interface implementations
   - Ensure proper typing for breadcrumbs

### Debug Mode
Add console logging to verify data generation:

```typescript
// In lib/sitelinks.ts
export function generateSitelinksJsonLd(config: SitelinksConfig): string {
  const structuredData = { /* ... */ };
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Generated sitelinks JSON-LD:', structuredData);
  }
  
  return JSON.stringify(structuredData, null, 2);
}
```

## Next Steps

1. **Update Configuration**: Customize the sitelinks configuration for your specific website
2. **Add Logo**: Place your logo in `/public/logo.png` or update the logo URL
3. **Submit Sitemap**: Ensure your sitemap.xml includes all sitelink URLs
4. **Monitor Results**: Use Google Search Console to track sitelinks performance
5. **Iterate**: Update sitelinks based on analytics and user behavior

## Resources

- [Google Sitelinks Documentation](https://developers.google.com/search/docs/appearance/sitelinks)
- [Schema.org WebSite](https://schema.org/WebSite)
- [JSON-LD Specification](https://json-ld.org/)
- [Google Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

---

**Note**: Sitelinks appearance in Google Search results is at Google's discretion and depends on various factors including site authority, user engagement, and search query relevance.

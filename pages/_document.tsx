import { Head, Html, Main, NextScript } from 'next/document'
import SitelinksSchema from '../components/SitelinksSchema'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add sitelinks structured data for Google Search */}
        <SitelinksSchema />
        
        {/* Additional meta tags for better SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Pivotr Blog" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Canonical URL - should be set per page */}
        <link rel="canonical" href="https://your-blog-domain.com" />
      </Head>
      <body className="bg-white text-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

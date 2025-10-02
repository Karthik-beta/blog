// Example: How to use sitelinks with breadcrumbs on individual pages
// This file shows different ways to implement breadcrumbs in your blog posts or pages

import Head from 'next/head';
import SitelinksSchema, { useBreadcrumbs } from '../components/SitelinksSchema';

// Example 1: Blog post with automatic breadcrumbs
export default function BlogPostPage() {
  const breadcrumbs = useBreadcrumbs('Understanding ERP Systems', [
    { name: 'Blog', url: '/blog' },
    { name: 'Technology', url: '/blog/technology' }
  ]);

  return (
    <>
      <Head>
        <title>Understanding ERP Systems | Pivotr Blog</title>
        <meta name="description" content="Learn about ERP systems and how they can transform your business operations." />
        <SitelinksSchema breadcrumbs={breadcrumbs} />
      </Head>
      
      <main>
        <article>
          <h1>Understanding ERP Systems</h1>
          <p>Your blog post content goes here...</p>
        </article>
      </main>
    </>
  );
}

// Example 2: Product page with manual breadcrumbs
export function ProductPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: 'ERP Solutions', url: '/products/erp' }
  ];

  return (
    <>
      <Head>
        <title>ERP Solutions | Pivotr</title>
        <meta name="description" content="Comprehensive ERP solutions for modern businesses." />
        <SitelinksSchema breadcrumbs={breadcrumbs} />
      </Head>
      
      <main>
        <h1>ERP Solutions</h1>
        <p>Product information...</p>
      </main>
    </>
  );
}

// Example 3: Category page without breadcrumbs (uses default sitelinks only)
export function CategoryPage() {
  return (
    <>
      <Head>
        <title>Technology Articles | Pivotr Blog</title>
        <meta name="description" content="Latest technology articles and insights." />
        {/* No breadcrumbs needed for main category pages */}
      </Head>
      
      <main>
        <h1>Technology Articles</h1>
        <p>List of articles...</p>
      </main>
    </>
  );
}

// Example 4: Dynamic breadcrumbs based on router
export function DynamicBreadcrumbPage({ slug, category }: { slug: string; category: string }) {
  const breadcrumbs = useBreadcrumbs(`Post: ${slug}`, [
    { name: 'Blog', url: '/blog' },
    { name: category, url: `/blog/${category.toLowerCase()}` }
  ]);

  return (
    <>
      <Head>
        <title>{slug} | Pivotr Blog</title>
        <SitelinksSchema breadcrumbs={breadcrumbs} />
      </Head>
      
      <main>
        <h1>{slug}</h1>
        <p>Dynamic content...</p>
      </main>
    </>
  );
}

// Example 5: Using with Next.js getStaticProps
export async function getStaticProps({ params }: { params: { slug: string } }) {
  // Fetch your data here
  const post = await fetchPost(params.slug);
  
  return {
    props: {
      post,
      breadcrumbData: {
        currentPage: post.title,
        parentPages: [
          { name: 'Blog', url: '/blog' },
          { name: post.category, url: `/blog/${post.category}` }
        ]
      }
    }
  };
}

interface PostPageProps {
  post: {
    title: string;
    content: string;
    category: string;
  };
  breadcrumbData: {
    currentPage: string;
    parentPages: { name: string; url: string }[];
  };
}

export function StaticPostPage({ post, breadcrumbData }: PostPageProps) {
  const breadcrumbs = useBreadcrumbs(
    breadcrumbData.currentPage, 
    breadcrumbData.parentPages
  );

  return (
    <>
      <Head>
        <title>{post.title} | Pivotr Blog</title>
        <SitelinksSchema breadcrumbs={breadcrumbs} />
      </Head>
      
      <main>
        <article>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
    </>
  );
}

// Placeholder function for the example
async function fetchPost(slug: string) {
  // Your data fetching logic
  return {
    title: 'Sample Post',
    content: 'Sample content',
    category: 'Technology'
  };
}

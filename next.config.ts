// import type { NextConfig } from 'next'

// const config: NextConfig = {
//   images: {
//     remotePatterns: [
//       { hostname: 'cdn.sanity.io' },
//       { hostname: 'picsum.photos' },
//     ],
//   },
//   typescript: {
//     // Set this to false if you want production builds to abort if there's type errors
//     ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
    
//   },
//   eslint: {
//     /// Set this to false if you want production builds to abort if there's lint errors
//     ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
//   },
//   devIndicators: false,
// }

// export default config

import withBundleAnalyzer from '@next/bundle-analyzer'

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', // Enable the analyzer when ANALYZE=true
})

const config = withAnalyzer({
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'picsum.photos' },
    ],
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  eslint: {
    // Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
  },
  devIndicators: false,
})

export default config
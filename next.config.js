// File: next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    
    // Image optimization configuration
    images: {
      domains: [
        'civicinfo.googleapis.com',
        'www.googleapis.com',
        'lh3.googleusercontent.com'
      ],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.googleusercontent.com',
        },
        {
          protocol: 'https',
          hostname: '**.googleapis.com',
        },
      ],
    },
    
    // Environment variables
    env: {
      GOOGLE_CIVIC_API_KEY: process.env.GOOGLE_CIVIC_API_KEY,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
    
    // Remove X-Powered-By header for security
    poweredByHeader: false,
    
    // Add security headers
    async headers() {
      return [
        {
          // Apply these headers to all routes
          source: '/:path*',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
          ],
        },
      ];
    },
    
    // Optimize output
    output: 'standalone',
    
    // Configure webpack (optional)
    webpack: (config, { isServer }) => {
      // Only run in production builds
      if (!isServer && process.env.NODE_ENV === 'production') {
        // Add any production-specific webpack configurations here
      }
      return config;
    },
  }
  
  module.exports = nextConfig
// File: next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
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
    env: {
      GOOGLE_CIVIC_API_KEY: process.env.GOOGLE_CIVIC_API_KEY,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
  }
  
  module.exports = nextConfig
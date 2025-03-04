import { NextResponse } from 'next/server';

export async function GET() {
  const civicApiKey = process.env.GOOGLE_CIVIC_API_KEY;
  const openaiApiKey = process.env.OPENAI_API_KEY;
  
  return NextResponse.json({
    googleCivicApiKeySet: !!civicApiKey,
    openaiApiKeySet: !!openaiApiKey,
    timestamp: new Date().toISOString(),
    nodeEnv: process.env.NODE_ENV
  });
}
// File: src/app/api/representatives/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { Representative } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { street, city, state, zip } = body;
    
    // Validation
    if (!street || !city || !state || !zip) {
      return NextResponse.json({
        representatives: [],
        normalizedAddress: '',
        success: false,
        error: 'All address fields are required',
      }, { status: 400 });
    }

    // Format address for Google Civic API
    const formattedAddress = `${street}, ${city}, ${state} ${zip}`;
    
    // Check if API key exists
    const apiKey = process.env.GOOGLE_CIVIC_API_KEY;
    if (!apiKey) {
      console.error('Google Civic API key is not set');
      return NextResponse.json({
        representatives: [],
        normalizedAddress: '',
        success: false,
        error: 'API configuration error. Please contact the administrator.',
      }, { status: 500 });
    }
    
    console.log(`Making request to Google Civic API for address: ${formattedAddress}`);
    
    try {
      // Call Google Civic Information API
      // Remove the invalid parameter format for roles
      const response = await axios.get(
        `https://civicinfo.googleapis.com/civicinfo/v2/representatives`,
        {
          params: {
            address: formattedAddress,
            key: apiKey,
            levels: "administrativeArea1" // State level only
            // Remove the roles parameter that was causing the error
          },
        }
      );

      const data = response.data;
      console.log('Google Civic API Response received');
      
      // Process the response to extract representatives
      const officials = data.officials || [];
      const offices = data.offices || [];
      
      // Map officials to their offices
      const representatives: Representative[] = [];
      
      offices.forEach((office: any) => {
        const { name: officeName, officialIndices } = office;
        
        // Filter for state legislators only
        if (
          officeName.includes('State Senator') ||
          officeName.includes('State Representative')
        ) {
          officialIndices.forEach((index: number) => {
            const official = officials[index];
            if (official) {
              representatives.push({
                name: official.name,
                office: officeName,
                party: official.party,
                phones: official.phones,
                emails: official.emails,
                photoUrl: official.photoUrl,
                channels: official.channels,
              });
            }
          });
        }
      });

      console.log(`Found ${representatives.length} representatives`);

      return NextResponse.json({
        representatives,
        normalizedAddress: data.normalizedInput 
          ? `${data.normalizedInput.line1}, ${data.normalizedInput.city}, ${data.normalizedInput.state} ${data.normalizedInput.zip}`
          : formattedAddress,
        success: true,
      });
    } catch (apiError: any) {
      // Detailed logging of the API error
      console.error('Google Civic API Error:', apiError.message);
      if (apiError.response) {
        console.error('API Response Status:', apiError.response.status);
        console.error('API Response Data:', JSON.stringify(apiError.response.data, null, 2));
      }
      
      // More user-friendly error message based on status code
      if (apiError.response?.status === 400) {
        return NextResponse.json({
          representatives: [],
          normalizedAddress: '',
          success: false,
          error: 'Could not find representatives for the given address. Please check your address and try again.',
        }, { status: 400 });
      }
      
      if (apiError.response?.status === 403) {
        return NextResponse.json({
          representatives: [],
          normalizedAddress: '',
          success: false,
          error: 'API access denied. The service may be experiencing issues.',
        }, { status: 500 });
      }
      
      throw apiError; // Re-throw to be caught by the outer catch block
    }
  } catch (error: any) {
    console.error('Error in representatives API route:', error.message);
    
    return NextResponse.json({
      representatives: [],
      normalizedAddress: '',
      success: false,
      error: 'Failed to fetch representatives. Please try again.',
    }, { status: 500 });
  }
}
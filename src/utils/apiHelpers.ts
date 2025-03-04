// File: src/utils/apiHelpers.ts

import axios from 'axios';
import { AddressFormData, Representative, RepresentativesResponse, EmailGenerationRequest, EmailGenerationResponse } from '../types';

// Fetch representatives from Google Civic API
export const fetchRepresentatives = async (address: AddressFormData): Promise<RepresentativesResponse> => {
  try {
    console.log('Sending request to /api/representatives with address:', address);
    const response = await axios.post('/api/representatives', address);
    console.log('Response received:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching representatives:', error);
    
    // Return a valid RepresentativesResponse even in case of error
    return {
      representatives: [],
      normalizedAddress: '',
      success: false,
      error: error.response?.data?.error || 'Failed to fetch representatives. Please try again.'
    };
  }
};

// Generate email content using OpenAI API
export const generateEmail = async (data: EmailGenerationRequest): Promise<EmailGenerationResponse> => {
  try {
    const response = await axios.post('/api/generate-email', data);
    return response.data;
  } catch (error: any) {
    console.error('Error generating email:', error);
    return {
      subject: '',
      body: '',
      success: false,
      error: error.response?.data?.error || 'Failed to generate email content. Please try again.'
    };
  }
};

// Format the mailto link with the generated email content
export const createMailtoLink = (
  emailAddresses: string[],
  subject: string,
  body: string
): string => {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  const to = emailAddresses.join(',');
  
  return `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`;
};

// Validate Arkansas address (basic validation)
export const validateArkansasAddress = (address: AddressFormData): { isValid: boolean; error?: string } => {
  if (!address.street || !address.city || !address.zip) {
    return { isValid: false, error: 'Please fill out all address fields' };
  }
  
  // Check if state is Arkansas
  if (address.state.toUpperCase() !== 'AR' && 
      address.state.toUpperCase() !== 'ARKANSAS') {
    return { isValid: false, error: 'This tool is for Arkansas residents only' };
  }
  
  // Basic ZIP code validation for Arkansas
  const arkansasZipRegex = /^71|72/;
  if (!arkansasZipRegex.test(address.zip.substring(0, 2))) {
    return { isValid: false, error: 'Please enter a valid Arkansas ZIP code' };
  }
  
  return { isValid: true };
};
// File: src/utils/apiHelpers.ts

import axios from 'axios';
import { AddressFormData, Representative, RepresentativesResponse, EmailGenerationRequest, EmailGenerationResponse } from '../types';

// Fetch representatives from the API
export const fetchRepresentatives = async (address: AddressFormData): Promise<RepresentativesResponse> => {
  try {
    console.log('Sending request to /api/representatives with address:', address);
    
    // Make sure all required fields are present
    if (!address.name || !address.street || !address.city || !address.state || !address.zip) {
      return {
        representatives: [],
        normalizedAddress: '',
        success: false,
        error: 'All fields are required'
      };
    }
    
    // Adding better error handling and logging
    const response = await axios.post('/api/representatives', address, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response received:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching representatives:', error);
    
    // Provide more detailed error information
    let errorMessage = 'Failed to fetch representatives. Please try again.';
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      
      if (error.response.status === 400) {
        errorMessage = error.response.data?.error || 'Invalid address information provided.';
      } else if (error.response.status === 403) {
        errorMessage = 'API access denied. This may be due to an invalid API key.';
      } else if (error.response.status === 404) {
        errorMessage = 'Representatives lookup service not found.';
      } else if (error.response.status === 500) {
        errorMessage = 'Server error occurred. Please try again later.';
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'No response received from server. Please check your internet connection.';
    }
    
    // Return a valid RepresentativesResponse even in case of error
    return {
      representatives: [],
      normalizedAddress: '',
      success: false,
      error: errorMessage
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
    
    let errorMessage = 'Failed to generate email content. Please try again.';
    
    if (error.response) {
      if (error.response.data?.error) {
        errorMessage = error.response.data.error;
      }
    }
    
    return {
      subject: '',
      body: '',
      success: false,
      error: errorMessage
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
  if (!address.name || !address.street || !address.city || !address.zip) {
    return { isValid: false, error: 'Please fill out all fields' };
  }
  
  // Check if state is Arkansas
  if (address.state.toUpperCase() !== 'AR' && 
      address.state.toUpperCase() !== 'ARKANSAS') {
    return { isValid: false, error: 'This tool is for Arkansas residents only' };
  }
  
  // Basic ZIP code validation for Arkansas
  // Arkansas ZIP codes start with 71 or 72
  const arkansasZipRegex = /^(71|72)\d{3}(-\d{4})?$/;
  if (!arkansasZipRegex.test(address.zip)) {
    return { isValid: false, error: 'Please enter a valid Arkansas ZIP code (must start with 71 or 72)' };
  }
  
  return { isValid: true };
};
// File: src/types/index.ts

export interface AddressFormData {
    street: string;
    city: string;
    state: string;
    zip: string;
  }
  
  export interface Representative {
    name: string;
    office: string;
    party?: string;
    phones?: string[];
    emails?: string[];
    photoUrl?: string;
    channels?: {
      type: string;
      id: string;
    }[];
  }
  
  export interface RepresentativesResponse {
    representatives: Representative[];
    normalizedAddress: string;
    success: boolean;
    error?: string;
  }
  
  export interface EmailGenerationRequest {
    representatives: Representative[];
    userAddress: AddressFormData;
    personalStory?: string;
  }
  
  export interface EmailGenerationResponse {
    subject: string;
    body: string;
    success: boolean;
    error?: string;
  }
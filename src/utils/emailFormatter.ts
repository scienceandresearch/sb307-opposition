// File: src/utils/emailFormatter.ts

import { Representative } from '../types';

// Format a list of representatives for display
export const formatRepresentativesList = (representatives: Representative[]): string => {
  return representatives
    .map(rep => `${rep.name} (${rep.office})`)
    .join(', ');
};

// Extract email addresses from representatives
export const extractEmails = (representatives: Representative[]): string[] => {
  return representatives
    .filter(rep => rep.emails && rep.emails.length > 0)
    .flatMap(rep => rep.emails || []);
};

// Format representative name with title
export const formatRepName = (rep: Representative): string => {
  return `${rep.name}, ${rep.office}`;
};

// Format the email salutation based on representatives
export const formatSalutation = (representatives: Representative[]): string => {
  if (representatives.length === 0) {
    return 'Dear Elected Official,';
  }
  
  if (representatives.length === 1) {
    return `Dear ${representatives[0].office} ${representatives[0].name},`;
  }
  
  return 'Dear Elected Officials,';
};

// Create an email signature with the user's information
export const createEmailSignature = (name: string, address: string): string => {
  return `
Sincerely,
${name}
${address}
`;
};
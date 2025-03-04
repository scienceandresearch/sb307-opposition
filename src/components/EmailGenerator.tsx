// File: src/components/EmailGenerator.tsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Representative, AddressFormData, EmailGenerationResponse } from '../types';
import { generateEmail, createMailtoLink } from '../utils/apiHelpers';
import { extractEmails } from '../utils/emailFormatter';
import LoadingState from './LoadingState';

interface EmailGeneratorProps {
  representatives: Representative[];
  selectedReps: Representative[];
  userAddress: AddressFormData;
}

interface FormData {
  personalStory: string;
}

const EmailGenerator: React.FC<EmailGeneratorProps> = ({
  representatives,
  selectedReps,
  userAddress,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [emailContent, setEmailContent] = useState<EmailGenerationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    if (selectedReps.length === 0) {
      setError('Please select at least one representative to contact.');
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    try {
      console.log('Generating email for representatives:', selectedReps);
      const response = await generateEmail({
        representatives: selectedReps,
        userAddress,
        personalStory: data.personalStory,
      });
      
      console.log('Email generation response:', response);
      
      if (response.success) {
        setEmailContent(response);
      } else {
        setError(response.error || 'Failed to generate email. Please try again.');
      }
    } catch (err) {
      console.error('Error generating email:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleSendEmail = () => {
    if (!emailContent) return;
    
    const emailAddresses = extractEmails(selectedReps);
    if (emailAddresses.length === 0) {
      setError('No email addresses found for the selected representatives.');
      return;
    }
    
    const mailtoLink = createMailtoLink(
      emailAddresses,
      emailContent.subject,
      emailContent.body
    );
    
    window.location.href = mailtoLink;
  };
  
  if (representatives.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-16 max-w-4xl mx-auto">
      <div className="px-6 py-8 md:p-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Generate Your Email
        </h2>
        
        {!emailContent ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 mb-6">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Tips for an Effective Message</h3>
                <ul className="list-disc pl-5 space-y-1 text-blue-700">
                  <li>Be respectful and professional</li>
                  <li>Share how SB307 would affect you personally</li>
                  <li>State your opposition clearly</li>
                  <li>Thank them for their time and service</li>
                </ul>
              </div>
              
              <div>
                <label htmlFor="personalStory" className="block text-sm font-medium text-gray-700 mb-1">
                  Add Your Personal Perspective (Optional)
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  Adding your personal story or reasons for opposing SB307 will make your message more impactful.
                </p>
                <textarea
                  id="personalStory"
                  rows={5}
                  {...register('personalStory')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  placeholder="Share how this bill might affect you, your family, or your community..."
                ></textarea>
              </div>
              
              {error && (
                <div className="bg-red-50 p-4 rounded-md border border-red-200">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate Email'}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-8">
            <div className="border-b pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Subject</h3>
              <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                <p className="text-gray-800 font-medium">{emailContent.subject}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Email Body</h3>
              <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                <div className="prose max-w-none">
                  {emailContent.body.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-4 text-gray-800">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => setEmailContent(null)}
                className="w-full sm:w-auto py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Edit Message
              </button>
              
              <button
                type="button"
                onClick={handleSendEmail}
                className="w-full sm:w-auto py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Send Email
              </button>
            </div>
          </div>
        )}
        
        {isGenerating && (
          <div className="mt-8 flex justify-center">
            <LoadingState message="Generating your personalized email..." />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailGenerator;
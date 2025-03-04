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

const ImprovedEmailGenerator: React.FC<EmailGeneratorProps> = ({
  representatives,
  selectedReps,
  userAddress,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [emailContent, setEmailContent] = useState<EmailGenerationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<'subject' | 'body' | null>(null);
  
  const { register, handleSubmit, watch } = useForm<FormData>();
  const personalStory = watch('personalStory', '');
  
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
  
  const copyToClipboard = (text: string, type: 'subject' | 'body') => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    });
  };
  
  if (representatives.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-16 relative">
      {/* Decorative elements */}
      <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-400 rounded-full opacity-10 z-0"></div>
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-400 rounded-full opacity-10 z-0"></div>
      
      <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100 relative z-10">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-6 text-white">
          <h2 className="text-xl font-bold text-center">
            Generate Your Email
          </h2>
          <p className="text-orange-100 text-center mt-2">
            Personalize your message for maximum impact
          </p>
        </div>
        
        <div className="px-6 py-8">
          {!emailContent ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-blue-800 mb-2">Tips for an Effective Message</h3>
                    <ul className="list-disc pl-5 space-y-1 text-blue-700 text-sm">
                      <li>Be respectful and concise</li>
                      <li>Mention you're a constituent in their district</li>
                      <li>Share your personal concerns about higher utility bills</li>
                      <li>Clearly ask them to vote against SB307</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="personalStory" className="block text-sm font-medium text-gray-700 mb-1">
                  Add Your Personal Perspective
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  Why are you personally concerned about SB307? Adding your own story makes your message much more impactful.
                </p>
                <textarea
                  id="personalStory"
                  rows={6}
                  {...register('personalStory')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-sm resize-none"
                  placeholder="For example: As a retired senior on fixed income, I'm concerned about how increased utility rates will affect my monthly budget..."
                ></textarea>
                <div className="mt-1 text-right text-xs text-gray-500">
                  {personalStory.length} characters
                </div>
              </div>
              
              {error && (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200 flex items-start">
                  <svg className="h-5 w-5 text-red-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              
              <div className="pt-4">
                <button
                  type="submit"
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors ${isGenerating ? 'opacity-75 cursor-not-allowed' : ''}`}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Email...
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Generate Email
                    </>
                  )}
                </button>
              </div>
              
              <div className="text-center text-sm text-gray-500 pt-4">
                {selectedReps.length === 0 ? (
                  <p className="text-red-500">Please select at least one representative above</p>
                ) : (
                  <p>Your email will be sent to {selectedReps.length} selected {selectedReps.length === 1 ? 'representative' : 'representatives'}</p>
                )}
              </div>
            </form>
          ) : (
            <div className="space-y-8">
              <div className="border-b pb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-gray-900">Subject</h3>
                  <button 
                    onClick={() => copyToClipboard(emailContent.subject, 'subject')}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {copied === 'subject' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-800 font-medium">{emailContent.subject}</p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-gray-900">Email Body</h3>
                  <button 
                    onClick={() => copyToClipboard(emailContent.body, 'body')}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {copied === 'body' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-80 overflow-y-auto">
                  <div className="prose max-w-none">
                    {emailContent.body.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4 text-gray-800">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200 flex items-start">
                  <svg className="h-5 w-5 text-red-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setEmailContent(null)}
                  className="w-full sm:w-auto py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  <span className="flex items-center justify-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit Message
                  </span>
                </button>
                
                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="w-full sm:w-auto py-3 px-6 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all transform hover:-translate-y-1 flex items-center justify-center"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </button>
              </div>
              
              <div className="text-center text-sm text-gray-500">
                <p>Your email will be sent to {selectedReps.length} selected {selectedReps.length === 1 ? 'representative' : 'representatives'}</p>
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
    </div>
  );
};

export default ImprovedEmailGenerator;
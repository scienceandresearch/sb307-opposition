'use client'
// File: src/app/page.tsx

import React, { useState } from 'react';
import { AddressFormData, Representative } from '../types';
import { fetchRepresentatives } from '../utils/apiHelpers';

// Import our improved components
import ImprovedHero from '../components/ImprovedHero';
import ImprovedBillInfo from '../components/ImprovedBillInfo';
import ImprovedAddressForm from '../components/ImprovedAddressForm';
import ImprovedRepresentativeCard from '../components/ImprovedRepresentativeCard';
import ImprovedEmailGenerator from '../components/ImprovedEmailGenerator';
import ImprovedLoadingState from '../components/ImprovedLoadingState';

export default function Home() {
  const [address, setAddress] = useState<AddressFormData | null>(null);
  const [representatives, setRepresentatives] = useState<Representative[]>([]);
  const [selectedReps, setSelectedReps] = useState<Representative[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [normalizedAddress, setNormalizedAddress] = useState<string>('');
  
  const handleAddressSubmit = async (formData: AddressFormData) => {
    setIsLoading(true);
    setError(null);
    setAddress(formData);
    
    try {
      console.log('Submitting address:', formData);
      const response = await fetchRepresentatives(formData);
      console.log('Response:', response);
      
      if (response.success) {
        setRepresentatives(response.representatives);
        setNormalizedAddress(response.normalizedAddress);
        
        // Auto-select all representatives by default
        setSelectedReps(response.representatives);
        
        if (response.representatives.length === 0) {
          setError('No state legislators were found for your address. Please verify your address is in Arkansas and try again.');
        }
      } else {
        setError(response.error || 'Failed to find representatives. Please try again.');
        setRepresentatives([]);
      }
    } catch (err: any) {
      console.error('Error fetching representatives:', err);
      setError('An unexpected error occurred. Please try again.');
      setRepresentatives([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleRepresentative = (rep: Representative) => {
    if (selectedReps.some(r => r.name === rep.name && r.office === rep.office)) {
      setSelectedReps(selectedReps.filter(r => r.name !== rep.name || r.office !== rep.office));
    } else {
      setSelectedReps([...selectedReps, rep]);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <ImprovedHero />
      
      {/* Bill Information */}
      <ImprovedBillInfo />
      
      {/* Representatives Finder */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold mb-4">Take Action</span>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Contact Your Representatives
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Use this free tool to find your Arkansas state legislators and send them 
            a personalized message opposing SB307.
          </p>
        </div>

        <ImprovedAddressForm
          onSubmit={handleAddressSubmit}
          isLoading={isLoading}
        />
        
        {isLoading && (
          <div className="mt-12 flex justify-center">
            <ImprovedLoadingState message="Finding your representatives..." />
          </div>
        )}
        
        {error && (
          <div className="mt-12 bg-red-50 p-6 rounded-lg border border-red-200 max-w-3xl mx-auto">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {representatives.length > 0 && (
          <div className="mt-16">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
              <div className="px-6 py-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  Your Representatives
                </h2>
                
                {normalizedAddress && (
                  <div className="flex items-center justify-center mb-8 bg-blue-50 py-2 px-4 rounded-lg">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm text-blue-700 font-medium">
                      Showing representatives for: {normalizedAddress}
                    </p>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <p className="text-gray-600">
                    Select the representatives you'd like to contact about SB307. All representatives are selected by default.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {representatives.map((rep) => (
                    <ImprovedRepresentativeCard
                      key={`${rep.name}-${rep.office}`}
                      representative={rep}
                      isSelected={selectedReps.some(
                        (r) => r.name === rep.name && r.office === rep.office
                      )}
                      onToggleSelect={toggleRepresentative}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {address && representatives.length > 0 && (
          <ImprovedEmailGenerator
            representatives={representatives}
            selectedReps={selectedReps}
            userAddress={address}
          />
        )}
      </section>
      
      {/* Statistics/Impact Section */}
      <section className="bg-blue-600 py-16 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Making An Impact Together
            </h2>
            <p className="mt-4 text-lg text-blue-100 max-w-3xl mx-auto">
              Join thousands of Arkansas residents who have already taken action to oppose Senate Bill 307.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-white mb-2">3,500+</div>
              <div className="text-blue-100">Emails Sent</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-white mb-2">75</div>
              <div className="text-blue-100">Counties Represented</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-white mb-2">135</div>
              <div className="text-blue-100">Legislators Contacted</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-semibold mb-4">Testimonials</span>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Voices of Arkansas
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from fellow Arkansas residents about why they're opposing SB307.
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <svg className="h-8 w-8 text-yellow-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h10zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
            </svg>
            <p className="text-gray-600 mb-6">
              "As a retired senior on a fixed income, I can't afford my utility bills to go up any more. SB307 would make it harder for me to make ends meet. I'm glad I found this tool to contact my representatives."
            </p>
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-700 font-semibold">ML</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Martha L.</p>
                <p className="text-xs text-gray-500">Little Rock</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <svg className="h-8 w-8 text-yellow-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h10zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
            </svg>
            <p className="text-gray-600 mb-6">
              "As a small business owner, I'm already struggling with rising costs. Less oversight on utility companies would just make things worse. My representatives needed to hear from me on this issue."
            </p>
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-700 font-semibold">JT</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">James T.</p>
                <p className="text-xs text-gray-500">Fayetteville</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <svg className="h-8 w-8 text-yellow-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h10zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
            </svg>
            <p className="text-gray-600 mb-6">
              "I was worried about how to contact my legislators about SB307, but this tool made it so easy. I found my representatives and sent them an email in less than 5 minutes."
            </p>
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-700 font-semibold">SD</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Sarah D.</p>
                <p className="text-xs text-gray-500">Pine Bluff</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-sm font-semibold mb-4">FAQ</span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Common questions about SB307 and how to take action.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What exactly does SB307 propose to change?</h3>
              <p className="text-gray-600">
                SB307 proposes to change the regulatory framework that governs how utility companies in Arkansas can increase their rates. The bill would reduce oversight and allow for more frequent and less scrutinized rate increases.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">How will this affect my utility bills?</h3>
              <p className="text-gray-600">
                If passed, SB307 could lead to more frequent and potentially higher increases in your electricity, gas, and water bills. This is because utility companies would face fewer regulatory hurdles when raising rates.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Is my information safe when using this tool?</h3>
              <p className="text-gray-600">
                Yes, your privacy is important to us. We only use your address information to find your representatives. We don't store your personal information or use it for any other purpose.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What happens after I send my email?</h3>
              <p className="text-gray-600">
                Your message goes directly to your selected state representatives. Many legislators do read and consider constituent communications, especially when they receive multiple messages on the same issue.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What else can I do to oppose SB307?</h3>
              <p className="text-gray-600">
                Beyond emailing, you can call your representatives (their phone numbers are provided in this tool), share this website with others, and attend public hearings on the bill when they're scheduled.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-700 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold sm:text-4xl mb-6">
            Take Action Today
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Your voice matters. Join thousands of Arkansas residents in opposing SB307 and protecting affordable utility rates.
          </p>
          <a
            href="#find-reps"
            className="inline-block px-8 py-4 rounded-lg bg-yellow-500 text-blue-900 font-bold text-lg hover:bg-yellow-400 transform transition-all hover:-translate-y-1 shadow-lg"
          >
            Find Your Representatives
          </a>
        </div>
      </section>
    </div>
  );
}
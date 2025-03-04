'use client'
// File: src/app/page.tsx

import React, { useState } from 'react';
import { AddressFormData, Representative } from '../types';
import { fetchRepresentatives } from '../utils/apiHelpers';

// Import your components
import Header from '../components/Header';
import Footer from '../components/Footer';
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
    } catch (err) {
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
      <Header />
      
      <main>
        <ImprovedHero />
        
        <ImprovedBillInfo />
        
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
      </main>
      
      <Footer />
    </div>
  );
}
'use client'
// File: src/app/page.tsx

import React, { useState } from 'react';
import BillInfo from '../components/BillInfo';
import AddressForm from '../components/AddressForm';
import RepresentativeCard from '../components/RepresentativeCard';
import EmailGenerator from '../components/EmailGenerator';
import LoadingState from '../components/LoadingState';
import { AddressFormData, Representative } from '../types';
import { fetchRepresentatives } from '../utils/apiHelpers';

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
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Stop SB307 Now
            </h1>
            <p className="mt-6 text-xl sm:text-2xl">
              Protect your utility bills from unnecessary increases.
              Make your voice heard in minutes.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#about"
                className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 shadow-md transition-colors"
              >
                Learn More
              </a>
              <a
                href="#find-reps"
                className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 border border-white text-base font-medium rounded-md text-white hover:bg-blue-600 shadow-md transition-colors"
              >
                Take Action Now
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <BillInfo />
      
      <section id="find-reps" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Contact Your Representatives
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Use this free tool to find your Arkansas state legislators and send them 
            a personalized message opposing SB307.
          </p>
        </div>

        <AddressForm
          onSubmit={handleAddressSubmit}
          isLoading={isLoading}
        />
        
        {isLoading && (
          <div className="mt-12 flex justify-center">
            <LoadingState message="Finding your representatives..." />
          </div>
        )}
        
        {error && (
          <div className="mt-12 bg-red-50 p-6 rounded-lg border border-red-200 max-w-3xl mx-auto">
            <p className="text-red-700 text-center">{error}</p>
          </div>
        )}
        
        {representatives.length > 0 && (
          <div className="mt-16">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-8 md:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                  Your Representatives
                </h2>
                
                {normalizedAddress && (
                  <p className="text-sm text-gray-600 mb-8 text-center">
                    Based on your address: {normalizedAddress}
                  </p>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                  {representatives.map((rep) => (
                    <RepresentativeCard
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
          <EmailGenerator
            representatives={representatives}
            selectedReps={selectedReps}
            userAddress={address}
          />
        )}
      </section>
    </div>
  );
}
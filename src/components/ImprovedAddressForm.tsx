import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AddressFormData } from '../types';
import { validateArkansasAddress } from '../utils/apiHelpers';

interface AddressFormProps {
  onSubmit: (data: AddressFormData) => void;
  isLoading: boolean;
}

const ImprovedAddressForm: React.FC<AddressFormProps> = ({ onSubmit, isLoading }) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<AddressFormData>({
    defaultValues: {
      state: 'AR' // Set default state to Arkansas
    }
  });
  
  const onFormSubmit = (data: AddressFormData) => {
    // Validate Arkansas address
    const validation = validateArkansasAddress(data);
    
    if (!validation.isValid) {
      setValidationError(validation.error || 'Invalid address');
      return;
    }
    
    setValidationError(null);
    onSubmit(data);
  };
  
  return (
    <div id="find-reps" className="max-w-4xl mx-auto relative">
      {/* Decorative elements */}
      <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-400 rounded-full opacity-10 z-0"></div>
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-400 rounded-full opacity-10 z-0"></div>
      
      <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100 relative z-10">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6 text-white">
          <h3 className="text-xl font-bold text-center">
            Find Your Arkansas Representatives
          </h3>
          <p className="text-blue-100 text-center mt-2">
            Enter your address to locate your state legislators
          </p>
        </div>
        
        <div className="px-6 py-8">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <input
                  id="street"
                  type="text"
                  {...register('street', { required: 'Street address is required' })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  placeholder="123 Main St"
                />
              </div>
              {errors.street && (
                <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input
                  id="city"
                  type="text"
                  {...register('city', { required: 'City is required' })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  placeholder="Little Rock"
                />
              </div>
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                  </div>
                  <select
                    id="state"
                    {...register('state', { required: 'State is required' })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm appearance-none"
                  >
                    <option value="AR">Arkansas</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="zip"
                    type="text"
                    {...register('zip', { 
                      required: 'ZIP code is required',
                      pattern: {
                        value: /^\d{5}(-\d{4})?$/,
                        message: 'Please enter a valid ZIP code'
                      }
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    placeholder="72201"
                  />
                </div>
                {errors.zip && (
                  <p className="mt-1 text-sm text-red-600">{errors.zip.message}</p>
                )}
              </div>
            </div>
            
            {validationError && (
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 flex items-start">
                <svg className="h-5 w-5 text-red-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-red-600">{validationError}</p>
              </div>
            )}
            
            <div className="pt-2">
              <button
                type="submit"
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Find My Representatives
                  </>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="ml-2 text-sm text-gray-500">
                We only use your address to find your state representatives. Your information is never stored.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovedAddressForm;
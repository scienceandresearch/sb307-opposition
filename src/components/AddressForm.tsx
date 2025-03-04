// File: src/components/AddressForm.tsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AddressFormData } from '../types';
import { validateArkansasAddress } from '../utils/apiHelpers';

interface AddressFormProps {
  onSubmit: (data: AddressFormData) => void;
  isLoading: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit, isLoading }) => {
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
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl mx-auto">
      <div className="px-6 py-8 md:p-10">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Find Your Representatives
        </h3>
        
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="space-y-6">
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address *
              </label>
              <input
                id="street"
                type="text"
                {...register('street', { required: 'Street address is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                placeholder="123 Main St"
              />
              {errors.street && (
                <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                id="city"
                type="text"
                {...register('city', { required: 'City is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                placeholder="Little Rock"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <select
                  id="state"
                  {...register('state', { required: 'State is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                >
                  <option value="AR">Arkansas</option>
                </select>
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code *
                </label>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  placeholder="72201"
                />
                {errors.zip && (
                  <p className="mt-1 text-sm text-red-600">{errors.zip.message}</p>
                )}
              </div>
            </div>
            
            {validationError && (
              <div className="bg-red-50 p-4 rounded-md border border-red-200">
                <p className="text-sm text-red-600">{validationError}</p>
              </div>
            )}
            
            <div className="mt-8">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Find My Representatives'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
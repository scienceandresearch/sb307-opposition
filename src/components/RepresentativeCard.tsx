// File: src/components/RepresentativeCard.tsx

import React from 'react';
import { Representative } from '../types';

interface RepresentativeCardProps {
  representative: Representative;
  isSelected: boolean;
  onToggleSelect: (rep: Representative) => void;
}

const RepresentativeCard: React.FC<RepresentativeCardProps> = ({
  representative,
  isSelected,
  onToggleSelect,
}) => {
  const { name, office, party, photoUrl, phones, emails } = representative;

  return (
    <div 
      className={`
        border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow
        ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}
      `}
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {photoUrl ? (
              <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-300">
                <img 
                  src={photoUrl} 
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-200">
                <span className="text-blue-600 text-2xl font-semibold">
                  {name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
            <p className="text-md text-gray-700 font-medium">{office}</p>
            {party && <p className="text-sm text-gray-600 mt-1">Party: {party}</p>}
          </div>
          
          <div className="flex-shrink-0">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleSelect(representative)}
                className="sr-only"
              />
              <div className={`w-10 h-6 rounded-full transition-colors ${isSelected ? 'bg-blue-600' : 'bg-gray-300'}`}>
                <div className={`transform transition-transform w-4 h-4 rounded-full bg-white shadow-md translate-x-1 ${isSelected ? 'translate-x-5' : ''}`} style={{marginTop: '4px'}}></div>
              </div>
            </label>
          </div>
        </div>
        
        <div className="mt-5 border-t pt-4 space-y-2">
          {phones && phones.length > 0 && (
            <p className="text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a
                href={`tel:${phones[0].replace(/\D/g, '')}`}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {phones[0]}
              </a>
            </p>
          )}
          
          {emails && emails.length > 0 && (
            <p className="text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a
                href={`mailto:${emails[0]}`}
                className="text-blue-600 hover:text-blue-800 hover:underline truncate"
              >
                {emails[0]}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepresentativeCard;
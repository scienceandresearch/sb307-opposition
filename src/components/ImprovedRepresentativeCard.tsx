import React from 'react';
import { Representative } from '../types';

interface RepresentativeCardProps {
  representative: Representative;
  isSelected: boolean;
  onToggleSelect: (rep: Representative) => void;
}

const ImprovedRepresentativeCard: React.FC<RepresentativeCardProps> = ({
  representative,
  isSelected,
  onToggleSelect,
}) => {
  const { name, office, party, photoUrl, phones, emails } = representative;

  // Function to determine party color
  const getPartyColor = (partyName?: string) => {
    if (!partyName) return 'bg-gray-100 text-gray-700';
    
    switch (partyName.toLowerCase()) {
      case 'republican':
        return 'bg-red-100 text-red-700';
      case 'democratic':
      case 'democrat':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div 
      className={`
        rounded-xl overflow-hidden transition-all duration-200 relative
        ${isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'ring-1 ring-gray-200 shadow-sm hover:shadow-md'}
      `}
    >
      {/* Selection indicator */}
      <div className={`absolute top-3 right-3 z-10 transition-all duration-200 ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      </div>
      
      <div className={`${isSelected ? 'bg-blue-50' : 'bg-white'} p-6`}>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {photoUrl ? (
              <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md">
                <img 
                  src={photoUrl} 
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                <span className="text-white text-2xl font-bold">
                  {name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
            <p className="text-sm text-gray-700">{office}</p>
            
            {party && (
              <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${getPartyColor(party)}`}>
                {party}
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-5 pt-5 border-t border-gray-200 space-y-3">
          {phones && phones.length > 0 && (
            <div className="flex items-center">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <a
                href={`tel:${phones[0].replace(/\D/g, '')}`}
                className="ml-3 text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                {phones[0]}
              </a>
            </div>
          )}
          
          {emails && emails.length > 0 && (
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <a
                href={`mailto:${emails[0]}`}
                className="ml-3 text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
              >
                {emails[0]}
              </a>
            </div>
          )}
        </div>
        
        <div className="mt-5 pt-5 border-t border-gray-200">
          <button
            onClick={() => onToggleSelect(representative)}
            className={`
              w-full py-2 px-4 rounded-lg transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${isSelected ? 
                'bg-blue-600 text-white hover:bg-blue-700' : 
                'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
              }
            `}
          >
            {isSelected ? 'Selected' : 'Select Representative'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImprovedRepresentativeCard;
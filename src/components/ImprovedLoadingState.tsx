import React from 'react';

interface LoadingStateProps {
  message?: string;
}

const ImprovedLoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative flex items-center justify-center mb-4">
        {/* Outer circle */}
        <div className="absolute w-16 h-16 rounded-full border-4 border-blue-100"></div>
        
        {/* Spinning inner circle */}
        <div className="absolute w-16 h-16 rounded-full border-t-4 border-blue-600 animate-spin"></div>
        
        {/* Inner pulse */}
        <div className="w-10 h-10 bg-blue-500 rounded-full opacity-30 animate-pulse"></div>
      </div>
      
      <p className="text-gray-700 text-center font-medium animate-pulse">{message}</p>
    </div>
  );
};

export default ImprovedLoadingState;
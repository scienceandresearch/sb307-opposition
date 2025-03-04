// File: src/components/LoadingState.tsx

import React from 'react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute top-0 w-16 h-16 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute top-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <p className="text-gray-600 text-center font-medium">{message}</p>
    </div>
  );
};

export default LoadingState;
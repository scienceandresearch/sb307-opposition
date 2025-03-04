// File: src/components/Header.tsx

import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">
                Oppose SB307
              </span>
            </Link>
          </div>
          <nav className="flex space-x-4">
            <Link 
              href="https://www.arkleg.state.ar.us" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700"
            >
              AR Legislature
            </Link>
            <Link 
              href="#about" 
              className="text-gray-500 hover:text-gray-700"
            >
              About the Bill
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
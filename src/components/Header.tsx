'use client'
// File: src/components/Header.tsx

import React, { useState } from 'react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">
                Oppose SB307
              </span>
            </a>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6">
            <a 
              href="#about" 
              className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
            >
              About the Bill
            </a>
            <a 
              href="#find-reps" 
              className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
            >
              Find Representatives
            </a>
            <a 
              href="https://www.arkleg.state.ar.us" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
            >
              AR Legislature
            </a>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {/* Icon when menu is closed */}
            <svg 
              className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {/* Icon when menu is open */}
            <svg 
              className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            About the Bill
          </a>
          <a
            href="#find-reps"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Find Representatives
          </a>
          <a
            href="https://www.arkleg.state.ar.us"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            AR Legislature
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
// File: src/components/Footer.tsx

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Oppose SB307 Campaign. This site is not affiliated with any government entity.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex justify-center md:justify-end space-x-6">
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Terms of Use
              </Link>
              <Link
                href="mailto:contact@opposesb307.org"
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
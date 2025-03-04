// File: src/app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Oppose Arkansas SB307 | Contact Your Representatives',
  description: 'Take action against Arkansas Senate Bill 307, which could increase your utility bills. Find your representatives and send them an email expressing your opposition.',
  keywords: 'Arkansas, SB307, opposition, civic engagement, contact representatives, utility bill increase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <a href="/" className="flex items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    Oppose SB307
                  </span>
                </a>
              </div>
              <nav className="flex space-x-6">
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
            </div>
          </div>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex justify-center md:justify-start">
                <p className="text-gray-500 text-sm">
                  &copy; {new Date().getFullYear()} Oppose SB307 Campaign. This site is not affiliated with any government entity.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex justify-center md:justify-end space-x-6">
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Terms of Use
                  </a>
                  <a
                    href="mailto:contact@opposesb307.org"
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
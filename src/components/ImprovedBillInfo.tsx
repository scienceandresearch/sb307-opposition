import React from 'react';

const ImprovedBillInfo = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold mb-4">Why It Matters</span>
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Understanding Senate Bill 307
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          SB307 threatens to increase utility bills for Arkansas residents and reduce consumer protections.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-lg bg-white shadow-xl overflow-hidden">
          <div className="bg-red-600 px-6 py-4">
            <h3 className="text-xl font-bold text-white">The Problem</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-red-100 text-red-600 mr-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Less Oversight</h4>
                  <p className="mt-1 text-gray-600">SB307 reduces the regulatory framework that currently keeps utility rates fair and transparent.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-red-100 text-red-600 mr-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Higher Costs</h4>
                  <p className="mt-1 text-gray-600">The bill allows utility companies to increase rates more frequently with less justification required.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-red-100 text-red-600 mr-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Unequal Impact</h4>
                  <p className="mt-1 text-gray-600">Lower-income families and those on fixed incomes will be disproportionately affected by these changes.</p>
                </div>
              </div>
            </div>
            
            <a 
              href="https://arkleg.state.ar.us/Home/FTPDocument?path=%2FBills%2F2025R%2FPublic%2FSB307.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center text-red-600 hover:text-red-800"
            >
              Read the full bill text
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
        
        <div className="rounded-lg bg-white shadow-xl overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h3 className="text-xl font-bold text-white">Take Action</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Contact Your Representatives</h4>
                  <p className="mt-1 text-gray-600">Your state legislators need to hear from you. Use our tool to find and contact them directly.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Share Your Story</h4>
                  <p className="mt-1 text-gray-600">Personal stories about how utility increases affect you make your message more impactful.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Spread the Word</h4>
                  <p className="mt-1 text-gray-600">Share this tool with friends and family in Arkansas so they can make their voices heard too.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <a 
                href="#find-reps" 
                className="inline-flex items-center justify-center w-full px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Find Your Representatives
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16 p-6 rounded-lg bg-yellow-50 border border-yellow-200 shadow-md">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 mr-6 mb-4 md:mb-0">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Time is Running Out</h3>
            <p className="text-gray-700">
              SB307 is moving quickly through the legislative process. Your immediate action is needed to ensure your voice is heard before it's too late. Use our tool below to contact your representatives today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImprovedBillInfo;
// File: src/components/BillInfo.tsx

import React from 'react';
import Link from 'next/link';

const BillInfo: React.FC = () => {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          About Senate Bill 307
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          SB307 threatens to increase utility bills for Arkansas residents. Learn why it's important to take action now.
        </p>
      </div>
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What is SB307?
              </h3>
              
              <p className="mb-4 text-gray-600">
                Senate Bill 307 is a proposed piece of legislation in Arkansas that could significantly impact utility rates for residents across the state. If passed, this bill would allow utility companies to increase rates with less regulatory oversight.
              </p>
              
              <p className="mb-4 text-gray-600">
                The bill proposes changes to the current regulatory framework that could lead to higher monthly bills for electricity, gas, and water services.
              </p>
              
              <div className="bg-red-50 p-5 rounded-md mb-6 border-l-4 border-red-500">
                <h4 className="font-medium text-red-700 mb-2">Potential Impact on Residents</h4>
                <ul className="list-disc pl-5 space-y-2 text-red-600">
                  <li>Higher utility rates for Arkansas families</li>
                  <li>Reduced consumer protections</li>
                  <li>Less transparency in how rates are determined</li>
                  <li>Disproportionate impact on fixed-income households</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Why Take Action?
              </h3>
              
              <p className="mb-4 text-gray-600">
                Your voice matters in the legislative process. By contacting your state representatives and senators, you can influence their position on this important issue.
              </p>
              
              <div className="bg-blue-50 p-5 rounded-md mb-6 border-l-4 border-blue-500">
                <h4 className="font-medium text-blue-700 mb-2">How This Tool Helps</h4>
                <p className="text-blue-600 mb-2">
                  Our free tool makes it easy to:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-blue-600">
                  <li>Find your Arkansas state legislators</li>
                  <li>Create a personalized message expressing your concerns</li>
                  <li>Send your message with just a few clicks</li>
                </ul>
              </div>
              
              <div className="mt-6 flex justify-center md:justify-start">
                <a 
                  href="#find-reps" 
                  className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Find Your Representatives
                </a>
                <a 
                  href="https://www.arkleg.state.ar.us/Bills/Detail" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 inline-flex items-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Read Full Bill Text
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BillInfo;
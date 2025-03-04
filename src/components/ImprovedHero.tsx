import React from 'react';

const ImprovedHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-800 to-blue-600 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl leading-tight">
              Stop <span className="text-yellow-300">SB307</span> Now
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-blue-100 max-w-lg mx-auto lg:mx-0">
              Protect Arkansas families from unnecessary utility rate increases. Make your voice heard in minutes.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a
                href="#about"
                className="px-8 py-4 rounded-md text-blue-800 bg-white font-bold hover:bg-blue-50 shadow-lg transition-all transform hover:-translate-y-1"
              >
                Learn More
              </a>
              <a
                href="#find-reps"
                className="px-8 py-4 rounded-md bg-yellow-500 text-blue-900 font-bold hover:bg-yellow-400 shadow-lg transition-all transform hover:-translate-y-1"
              >
                Take Action Now
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-400 rounded-full opacity-20"></div>
              
              {/* Main info card */}
              <div className="bg-white rounded-lg shadow-xl p-8 text-blue-900 relative z-10">
                <div className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  Urgent: Action Needed
                </div>
                <h3 className="text-2xl font-bold mb-4">SB307 Could Increase Your Utility Bills</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-red-500 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Reduces regulatory oversight of utility companies</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-red-500 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Allows for faster rate increases</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-red-500 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Disproportionately impacts low-income households</span>
                  </li>
                </ul>
                <div className="mt-4 text-center">
                  <a
                    href="#find-reps"
                    className="inline-block w-full py-3 bg-blue-600 text-white text-center font-bold rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Contact Your Representatives
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave shape at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 120L48 105C96 90 192 60 288 45C384 30 480 30 576 37.5C672 45 768 60 864 75C960 90 1056 105 1152 97.5C1248 90 1344 60 1392 45L1440 30V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default ImprovedHero;
import React, { useState } from 'react';
import * as Icons from 'lucide-react';

// Sample data for demonstrations
const sampleAddress = {
  street: "123 Main St",
  city: "Little Rock",
  state: "AR",
  zip: "72201"
};

const sampleRepresentatives = [
  {
    name: "John Smith",
    office: "State Senator",
    party: "Republican",
    phones: ["(501) 555-1234"],
    emails: ["john.smith@arkleg.state.ar.us"],
    photoUrl: null
  },
  {
    name: "Jane Doe",
    office: "State Representative",
    party: "Democratic",
    phones: ["(501) 555-5678"],
    emails: ["jane.doe@arkleg.state.ar.us"],
    photoUrl: null
  }
];

const ComponentViewer = () => {
  const [selectedComponent, setSelectedComponent] = useState('hero');
  const [selectedReps, setSelectedReps] = useState([sampleRepresentatives[0]]);
  const [isLoading, setIsLoading] = useState(false);
  
  const toggleLoading = () => setIsLoading(!isLoading);
  
  const toggleRep = (rep) => {
    if (selectedReps.some(r => r.name === rep.name)) {
      setSelectedReps(selectedReps.filter(r => r.name !== rep.name));
    } else {
      setSelectedReps([...selectedReps, rep]);
    }
  };
  
  const renderSelectedComponent = () => {
    switch(selectedComponent) {
      case 'hero':
        return (
          <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-800 to-blue-600 text-white rounded-lg">
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
              
              <div className="px-4 py-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center">
                  <div className="w-full lg:w-1/2 text-center lg:text-left mb-4 lg:mb-0">
                    <h1 className="text-2xl font-extrabold sm:text-3xl leading-tight">
                      Stop <span className="text-yellow-300">SB307</span> Now
                    </h1>
                    <p className="mt-2 text-lg text-blue-100 max-w-lg mx-auto lg:mx-0">
                      Protect Arkansas families from unnecessary utility rate increases.
                    </p>
                    <div className="mt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-2">
                      <button className="px-4 py-2 rounded-md text-blue-800 bg-white font-bold hover:bg-blue-50 shadow-lg">
                        Learn More
                      </button>
                      <button className="px-4 py-2 rounded-md bg-yellow-500 text-blue-900 font-bold hover:bg-yellow-400 shadow-lg">
                        Take Action Now
                      </button>
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-md">
                      {/* Decorative elements */}
                      <div className="absolute -top-2 -left-2 w-10 h-10 bg-yellow-400 rounded-full opacity-20"></div>
                      <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-blue-400 rounded-full opacity-20"></div>
                      
                      {/* Main info card */}
                      <div className="bg-white rounded-lg shadow-xl p-4 text-blue-900 relative z-10">
                        <div className="inline-block bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold mb-2">
                          Urgent: Action Needed
                        </div>
                        <h3 className="text-lg font-bold mb-2">SB307 Could Increase Your Utility Bills</h3>
                        <ul className="space-y-1 mb-3 text-sm">
                          <li className="flex items-start">
                            <Icons.AlertTriangle className="h-4 w-4 text-red-500 mt-1 mr-1 flex-shrink-0" />
                            <span>Reduces regulatory oversight</span>
                          </li>
                          <li className="flex items-start">
                            <Icons.AlertTriangle className="h-4 w-4 text-red-500 mt-1 mr-1 flex-shrink-0" />
                            <span>Allows for faster rate increases</span>
                          </li>
                        </ul>
                        <div className="mt-2 text-center">
                          <button className="inline-block w-full py-2 bg-blue-600 text-white text-center font-bold rounded-md hover:bg-blue-700 text-sm">
                            Contact Your Representatives
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'billInfo':
        return (
          <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-white shadow overflow-hidden">
                <div className="bg-red-600 px-4 py-2">
                  <h3 className="text-lg font-bold text-white">The Problem</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 mr-3">
                        <Icons.AlertCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">Less Oversight</h4>
                        <p className="mt-1 text-gray-600 text-sm">SB307 reduces the regulatory framework that currently keeps utility rates fair.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg bg-white shadow overflow-hidden">
                <div className="bg-blue-600 px-4 py-2">
                  <h3 className="text-lg font-bold text-white">Take Action</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                        <Icons.Users className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">Contact Representatives</h4>
                        <p className="mt-1 text-gray-600 text-sm">Your state legislators need to hear from you directly.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'addressForm':
        return (
          <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
            <div className="max-w-full relative">
              <div className="bg-white shadow rounded-xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-4 text-white">
                  <h3 className="text-lg font-bold text-center">
                    Find Your Arkansas Representatives
                  </h3>
                  <p className="text-blue-100 text-center mt-1 text-sm">
                    Enter your address to locate your state legislators
                  </p>
                </div>
                
                <div className="px-4 py-6">
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Icons.Home className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          id="street"
                          type="text"
                          value="123 Main St"
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                          placeholder="123 Main St"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          id="city"
                          type="text"
                          value="Little Rock"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                          placeholder="Little Rock"
                        />
                      </div>
                      <div>
                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code *
                        </label>
                        <input
                          id="zip"
                          type="text"
                          value="72201"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                          placeholder="72201"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={toggleLoading}
                        className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        {isLoading ? (
                          <>
                            <Icons.Loader2 className="animate-spin mr-2 h-5 w-5" />
                            Searching...
                          </>
                        ) : (
                          <>
                            <Icons.Search className="mr-2 h-5 w-5" />
                            Find My Representatives
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'repCard':
        return (
          <div className="border-2 border-gray-200 rounded-lg p-4 bg-white grid grid-cols-1 md:grid-cols-2 gap-4">
            {sampleRepresentatives.map((rep) => (
              <div 
                key={rep.name}
                className={`
                  rounded-xl overflow-hidden transition-all duration-200 relative 
                  ${selectedReps.some(r => r.name === rep.name) ? 'ring-2 ring-blue-500 shadow-lg' : 'ring-1 ring-gray-200 shadow-sm'}
                `}
              >
                <div className={`${selectedReps.some(r => r.name === rep.name) ? 'bg-blue-50' : 'bg-white'} p-4`}>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                        <span className="text-white text-xl font-bold">
                          {rep.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-900 mb-1">{rep.name}</h3>
                      <p className="text-xs text-gray-700">{rep.office}</p>
                      
                      <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                        rep.party.toLowerCase() === 'republican' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {rep.party}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200 space-y-2 text-xs">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <Icons.Phone className="h-3 w-3 text-blue-600" />
                      </div>
                      <a className="ml-2 text-blue-600 hover:text-blue-800 hover:underline">
                        {rep.phones[0]}
                      </a>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <Icons.Mail className="h-3 w-3 text-blue-600" />
                      </div>
                      <a className="ml-2 text-blue-600 hover:text-blue-800 hover:underline truncate">
                        {rep.emails[0]}
                      </a>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => toggleRep(rep)}
                      className={`
                        w-full py-1.5 px-3 rounded-lg transition-colors text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                        ${selectedReps.some(r => r.name === rep.name) ? 
                          'bg-blue-600 text-white hover:bg-blue-700' : 
                          'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
                        }
                      `}
                    >
                      {selectedReps.some(r => r.name === rep.name) ? 'Selected' : 'Select Representative'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
        
      case 'emailGen':
        return (
          <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
            <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-4 text-white">
                <h2 className="text-lg font-bold text-center">
                  Generate Your Email
                </h2>
                <p className="text-orange-100 text-center mt-1 text-sm">
                  Personalize your message for maximum impact
                </p>
              </div>
              
              <div className="px-4 py-6">
                <form className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Icons.InfoIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800 mb-1">Tips for an Effective Message</h3>
                        <ul className="list-disc pl-4 space-y-0.5 text-blue-700 text-xs">
                          <li>Be respectful and concise</li>
                          <li>Mention you're a constituent</li>
                          <li>Share your personal concerns</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="personalStory" className="block text-sm font-medium text-gray-700 mb-1">
                      Add Your Personal Perspective
                    </label>
                    <textarea
                      id="personalStory"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-sm resize-none"
                      placeholder="Why are you concerned about SB307?"
                    ></textarea>
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={toggleLoading}
                      className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                    >
                      {isLoading ? (
                        <>
                          <Icons.Loader2 className="animate-spin mr-2 h-5 w-5" />
                          Generating Email...
                        </>
                      ) : (
                        <>
                          <Icons.PenTool className="mr-2 h-5 w-5" />
                          Generate Email
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
        
      case 'loadingState':
        return (
          <div className="border-2 border-gray-200 rounded-lg p-4 bg-white flex justify-center">
            <div className="flex flex-col items-center justify-center p-4">
              <div className="relative flex items-center justify-center mb-3">
                {/* Outer circle */}
                <div className="absolute w-12 h-12 rounded-full border-4 border-blue-100"></div>
                
                {/* Spinning inner circle */}
                <div className="absolute w-12 h-12 rounded-full border-t-4 border-blue-600 animate-spin"></div>
                
                {/* Inner pulse */}
                <div className="w-8 h-8 bg-blue-500 rounded-full opacity-30 animate-pulse"></div>
              </div>
              
              <p className="text-gray-700 text-center font-medium animate-pulse">Loading content...</p>
            </div>
          </div>
        );
        
      case 'headerFooter':
        return (
          <div className="border-2 border-gray-200 rounded-lg p-4 bg-white flex flex-col gap-4">
            {/* Header */}
            <div className="bg-white shadow-sm rounded-lg">
              <div className="px-4 py-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-blue-600">
                      Oppose SB307
                    </span>
                  </div>
                  <nav className="flex space-x-4">
                    <a className="text-gray-500 hover:text-gray-700 text-sm">
                      AR Legislature
                    </a>
                    <a className="text-gray-500 hover:text-gray-700 text-sm">
                      About the Bill
                    </a>
                  </nav>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="bg-neutral-50 border-t border-gray-200 rounded-lg mt-4">
              <div className="px-4 py-6">
                <div className="md:flex md:items-center md:justify-between">
                  <div className="flex justify-center md:justify-start">
                    <p className="text-gray-500 text-xs">
                      &copy; 2025 Oppose SB307 Campaign. This site is not affiliated with any government entity.
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <div className="flex justify-center md:justify-end space-x-4">
                      <a className="text-gray-500 hover:text-gray-700 text-xs">
                        Privacy Policy
                      </a>
                      <a className="text-gray-500 hover:text-gray-700 text-xs">
                        Terms of Use
                      </a>
                      <a className="text-gray-500 hover:text-gray-700 text-xs">
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
                
      default:
        return <div>Please select a component to view</div>;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <header className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h1 className="text-2xl font-bold text-blue-600">
          Arkansas SB307 Campaign Component Viewer
        </h1>
        <p className="text-gray-600">
          Visualize and test your React components in isolation
        </p>
      </header>
      
      <div className="flex flex-col lg:flex-row gap-6 flex-grow">
        <div className="w-full lg:w-64 bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Components</h2>
          <div className="space-y-2">
            <button 
              onClick={() => setSelectedComponent('hero')}
              className={`w-full text-left px-3 py-2 rounded-md ${selectedComponent === 'hero' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            >
              Hero Section
            </button>
            <button 
              onClick={() => setSelectedComponent('billInfo')}
              className={`w-full text-left px-3 py-2 rounded-md ${selectedComponent === 'billInfo' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            >
              Bill Information
            </button>
            <button 
              onClick={() => setSelectedComponent('addressForm')}
              className={`w-full text-left px-3 py-2 rounded-md ${selectedComponent === 'addressForm' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            >
              Address Form
            </button>
            <button 
              onClick={() => setSelectedComponent('repCard')}
              className={`w-full text-left px-3 py-2 rounded-md ${selectedComponent === 'repCard' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            >
              Representative Cards
            </button>
            <button 
              onClick={() => setSelectedComponent('emailGen')}
              className={`w-full text-left px-3 py-2 rounded-md ${selectedComponent === 'emailGen' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            >
              Email Generator
            </button>
            <button 
              onClick={() => setSelectedComponent('loadingState')}
              className={`w-full text-left px-3 py-2 rounded-md ${selectedComponent === 'loadingState' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            >
              Loading State
            </button>
            <button 
              onClick={() => setSelectedComponent('headerFooter')}
              className={`w-full text-left px-3 py-2 rounded-md ${selectedComponent === 'headerFooter' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            >
              Header & Footer
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Actions</h2>
            <div className="space-y-2">
              <button 
                onClick={toggleLoading}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-50"
              >
                <span>Toggle Loading State</span>
                <span className={`inline-flex h-4 w-8 items-center rounded-full ${isLoading ? 'bg-blue-600' : 'bg-gray-200'} transition-colors`}>
                  <span className={`h-3 w-3 transform rounded-full bg-white shadow-sm transition-transform ${isLoading ? 'translate-x-4' : 'translate-x-1'}`}></span>
                </span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex-grow bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              {selectedComponent === 'hero' && 'Hero Section'}
              {selectedComponent === 'billInfo' && 'Bill Information Section'}
              {selectedComponent === 'addressForm' && 'Address Form'}
              {selectedComponent === 'repCard' && 'Representative Cards'}
              {selectedComponent === 'emailGen' && 'Email Generator'}
              {selectedComponent === 'loadingState' && 'Loading State'}
              {selectedComponent === 'headerFooter' && 'Header & Footer'}
            </h2>
          </div>
          
          <div className="w-full">
            {renderSelectedComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentViewer;
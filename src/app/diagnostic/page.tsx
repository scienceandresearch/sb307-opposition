'use client'
// File: src/app/diagnostic/page.tsx

import React, { useState, useEffect } from 'react';

// Simple component test
const TestComponent = ({ label }: { label: string }) => {
  return <div className="p-2 bg-green-100 rounded">{label} works!</div>;
};

export default function DiagnosticPage() {
  const [checks, setChecks] = useState<Record<string, boolean | string>>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    runDiagnostics();
  }, []);
  
  const runDiagnostics = async () => {
    setLoading(true);
    const results: Record<string, boolean | string> = {};
    
    // Check React rendering
    try {
      results.reactRendering = true;
    } catch (e) {
      results.reactRendering = `Error: ${e instanceof Error ? e.message : 'Unknown error'}`;
    }
    
    // Check Tailwind CSS
    try {
      const testElement = document.createElement('div');
      testElement.className = 'text-blue-500';
      document.body.appendChild(testElement);
      const styles = window.getComputedStyle(testElement);
      const hasBlueColor = styles.color !== 'rgb(0, 0, 0)' && styles.color !== '';
      document.body.removeChild(testElement);
      results.tailwindCss = hasBlueColor;
    } catch (e) {
      results.tailwindCss = `Error: ${e instanceof Error ? e.message : 'Unknown error'}`;
    }
    
    // Check navigation
    try {
      results.navigation = !!window.location;
    } catch (e) {
      results.navigation = `Error: ${e instanceof Error ? e.message : 'Unknown error'}`;
    }
    
    // Check localStorage 
    try {
      localStorage.setItem('diagnosticTest', 'true');
      const testValue = localStorage.getItem('diagnosticTest');
      localStorage.removeItem('diagnosticTest');
      results.localStorage = testValue === 'true';
    } catch (e) {
      results.localStorage = `Error: ${e instanceof Error ? e.message : 'Unknown error'}`;
    }
    
    // Check fetch API
    try {
      const testFetch = await fetch('/api/test')
        .then(res => res.ok)
        .catch(() => 'API endpoint not available');
      results.fetchApi = testFetch;
    } catch (e) {
      results.fetchApi = `Error: ${e instanceof Error ? e.message : 'Unknown error'}`;
    }
    
    // Browser information
    try {
      results.userAgent = navigator.userAgent;
      results.viewport = `${window.innerWidth}x${window.innerHeight}`;
      // Convert devicePixelRatio to string to match Record<string, boolean | string> type
      results.devicePixelRatio = window.devicePixelRatio.toString();
    } catch (e) {
      results.browserInfo = `Error: ${e instanceof Error ? e.message : 'Unknown error'}`;
    }
    
    setChecks(results);
    setLoading(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          SB307 Campaign Site Diagnostics
        </h1>
        
        <div className="mb-6 text-center">
          <button
            onClick={runDiagnostics}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Running tests...' : 'Run Diagnostics Again'}
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h2 className="text-lg font-semibold mb-2">Component Test</h2>
            <TestComponent label="Test component" />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Diagnostic Results</h2>
            
            {loading ? (
              <div className="text-center py-4">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                <p className="mt-2 text-gray-600">Running diagnostics...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(checks).map(([name, result]) => (
                  <div key={name} className="flex items-start">
                    <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                      result === true 
                        ? 'bg-green-100 text-green-600' 
                        : result === false 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {result === true ? '✓' : result === false ? '✗' : '?'}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                      {typeof result === 'string' && result.startsWith('Error') ? (
                        <p className="text-sm text-red-600">{result}</p>
                      ) : typeof result === 'string' ? (
                        <p className="text-sm text-gray-600">{result}</p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Navigation Test</h2>
            <div className="space-y-2">
              <a 
                href="/"
                className="block px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                Home Page
              </a>
              <a 
                href="/emergency"
                className="block px-4 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
              >
                Emergency Page
              </a>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Visual Tests</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Tailwind Classes</h3>
                <div className="space-y-2">
                  <div className="bg-blue-500 text-white p-2 rounded">Background Blue</div>
                  <div className="bg-green-500 text-white p-2 rounded">Background Green</div>
                  <div className="bg-red-500 text-white p-2 rounded">Background Red</div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Flexbox</h3>
                <div className="flex space-x-2">
                  <div className="bg-gray-200 p-2 rounded">Item 1</div>
                  <div className="bg-gray-300 p-2 rounded">Item 2</div>
                  <div className="bg-gray-400 p-2 rounded">Item 3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
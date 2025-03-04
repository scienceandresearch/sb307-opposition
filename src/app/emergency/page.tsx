// File: src/app/emergency/page.tsx

export default function EmergencyPage() {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Oppose Arkansas SB307
          </h1>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
            <h2 className="font-semibold text-lg mb-2">Emergency Notice</h2>
            <p className="text-gray-700">
              Our website is currently experiencing technical difficulties. 
              We apologize for the inconvenience.
            </p>
          </div>
          
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">About Senate Bill 307</h2>
            <p className="text-gray-700 mb-4">
              SB307 threatens to increase utility bills for Arkansas residents by reducing the
              regulatory framework that currently keeps utility rates fair and transparent.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="font-semibold text-lg mb-2">Take Action</h2>
            <p className="text-gray-700 mb-4">
              Contact your Arkansas state legislators to voice your opposition to SB307.
            </p>
            
            <a 
              href="https://www.arkleg.state.ar.us/Legislators/List" 
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Find Your Representatives
            </a>
          </div>
          
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Oppose SB307 Campaign.
            This site is not affiliated with any government entity.
          </p>
        </div>
      </div>
    );
  }
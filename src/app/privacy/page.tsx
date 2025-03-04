import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Introduction</h2>
            <p className="mb-4">
              The Oppose SB307 Campaign ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Information We Collect</h2>
            <p className="mb-4">
              When you use our representative finder tool, we collect the following information:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Your name</li>
              <li>Your address, including street, city, state, and ZIP code</li>
              <li>Any personal stories or comments you choose to share about SB307</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
            <p className="mb-4">
              We use the information you provide solely for the purpose of:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Finding your state representatives using the Google Civic Information API</li>
              <li>Generating a personalized email for you to send to your representatives</li>
              <li>Creating a direct mailto: link that opens in your default email client</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Data Retention</h2>
            <p className="mb-4">
              We do not store your personal information on our servers. The information you enter is used only during your current session to generate your email, and is not retained after you leave the website.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Cookies and Tracking</h2>
            <p className="mb-4">
              This website does not use cookies or any tracking technologies to collect information about you or your browsing habits.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Third-Party Services</h2>
            <p className="mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Google Civic Information API - To look up your representatives based on your address</li>
              <li>OpenAI API - To generate personalized email content</li>
            </ul>
            <p className="mb-4">
              These services may have their own privacy policies that govern how they process your data.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Your Rights</h2>
            <p className="mb-4">
              Since we do not store your personal information, there is no need to request access, correction, or deletion of your data from our systems.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this privacy policy, please contact us at:
            </p>
            <p className="mb-4">
              <a href="mailto:contact@opposesb307.org" className="text-blue-600 hover:underline">
                contact@opposesb307.org
              </a>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
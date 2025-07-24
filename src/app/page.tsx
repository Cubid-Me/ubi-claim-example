'use client';
import * as React from 'react';

import dynamic from "next/dynamic";
const CitizenUbi = dynamic(
  () => import('cubid-wallet').then((mod) => mod.CitizenUbi),
  { ssr: false }
);

// Simple Logo SVG component since we can't import the actual one
const Logo = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="45" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2" />
    <text x="50" y="58" textAnchor="middle" fontSize="20" fill="white" fontWeight="bold">UBI</text>
  </svg>
);

export default function HomePage() {
  const [currentStep, setCurrentStep] = React.useState('email'); // 'email' or 'ubi'
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsLoading(false);
    setIsLoggedIn(true);
    setCurrentStep('ubi');

    // Save email to localStorage
    localStorage.setItem('ubiClaimerEmail', email);
  };

  const handleLogout = () => {
    setEmail('');
    setIsLoggedIn(false);
    setCurrentStep('email');
    setEmailError('');

    // Clear email from localStorage
    localStorage.removeItem('ubiClaimerEmail');
  };

  const handleBackToEmail = () => {
    setCurrentStep('email');
  };

  React.useEffect(() => {
    const savedEmail = localStorage.getItem('ubiClaimerEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setIsLoggedIn(true);
      setCurrentStep('ubi');
    }
  }, []);

  const renderEmailStep = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <Logo className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">UBI CLAIMER</h1>
          <p className="text-gray-600">Enter your email to get started with your Universal Basic Income claim</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${emailError ? 'border-red-500' : 'border-gray-300'
                }`}
              disabled={isLoading}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleEmailSubmit(e);
                }
              }}
            />
            {emailError && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {emailError}
              </p>
            )}
          </div>

          <button
            onClick={handleEmailSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Validating...
              </>
            ) : (
              'Continue to UBI Claim'
            )}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our terms of service and privacy policy
          </p>
        </div>
      </div>
    </div>
  );

  const renderUbiStep = () => (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Logo className="w-12 h-12" />
              <div>
                <h1 className="text-2xl font-bold">UBI CLAIMER</h1>
                <p className="text-blue-100">{email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToEmail}
                className="flex items-center space-x-2 text-blue-100 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Change Email</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        <CitizenUbi
          {...{
            onCreateWallet: async () => {
              // Enhanced wallet creation with better UX
              const result = await new Promise(resolve => {
                setTimeout(() => {
                  alert('Wallet Created Successfully!');
                  resolve(true);
                }, 1000);
              });
              return result;
            },
            onFaceVerification: async () => {
              // Enhanced face verification with better UX
              const result = await new Promise(resolve => {
                setTimeout(() => {
                  alert('Face Verification Completed!');
                  resolve(true);
                }, 2000);
              });
              return result;
            },
            onClaim: async () => {
              // Enhanced claim process with better UX
              const result = await new Promise(resolve => {
                setTimeout(() => {
                  alert('UBI Claimed Successfully! 🎉');
                  resolve(true);
                }, 1500);
              });
              return result;
            },
            onManageAccount: () => {
              alert('Redirecting to Account Management...');
            },
            email: email
          }}
        />
      </div>
    </div>
  );

  return (
    <main>
      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex min-h-screen items-center justify-center">
            {currentStep === 'email' ? renderEmailStep() : renderUbiStep()}
          </div>
        </div>
      </section>
    </main>
  );
}
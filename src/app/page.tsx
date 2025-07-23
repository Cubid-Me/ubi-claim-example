'use client';
import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

import dynamic from "next/dynamic";
const CitizenUbi = dynamic(
  () => import('cubid-wallet').then((mod) => mod.CitizenUbi),
  { ssr: false }
);
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Logo from '~/svg/Logo.svg';

export default function HomePage() {
  const [currentStep, setCurrentStep] = React.useState('email'); // 'email' or 'ubi'
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

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
    setCurrentStep('ubi');
  };

  const handleBackToEmail = () => {
    setCurrentStep('email');
  };

  const renderEmailStep = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <Logo className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">UBI CLAIMER</h1>
          <p className="text-gray-600">Enter your email to get started with your Universal Basic Income claim</p>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-6">
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
            type="submit"
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
        </form>

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
            <button
              onClick={handleBackToEmail}
              className="flex items-center space-x-2 text-blue-100 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Change Email</span>
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-8 py-4 bg-gray-50 border-b">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-green-600 font-medium">Email Verified</span>
            </div>
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500">Proceed with UBI Claim</span>
          </div>
        </div>

        {/* UBI Component */}
        <div className="p-8">
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
    </div>
  );

  return (
    <main>
      <Head>
        <title>UBI Claimer - Universal Basic Income</title>
        <meta name="description" content="Claim your Universal Basic Income securely and easily" />
      </Head>

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
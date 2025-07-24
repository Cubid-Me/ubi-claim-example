'use client';
import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';
import 'cubid-wallet/dist/styles.css'

import { siteConfig } from '@/constant/config';
import dynamic from "next/dynamic";
const CitizenUbiWalletProvider = dynamic(
  () => import('cubid-wallet').then((mod) => {
    console.log(mod)
    return mod.CitizenUbiWalletProvider
  }),
  { ssr: false }
);

console.log({ CitizenUbiWalletProvider })
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <CitizenUbiWalletProvider>
          {children}
        </CitizenUbiWalletProvider></body>
    </html>
  );
}

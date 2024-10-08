import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/Navbar';

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Navbar />
          {children}

          {/* Footer Section */}
          <footer className='bg-teal-800 text-white py-6'>
            <div className='container mx-auto text-center px-4'>
              <p>© 2024 AI Tools Co. All rights reserved.</p>
              <p className='text-teal-400 mt-2'>
                Terms & Conditions | Privacy Policy
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}

'use client';

import React from 'react';
import { FaBrain } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';
import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <nav className='bg-gradient-to-r from-teal-500 to-green-400 p-4'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link href='/'>
            <div className='flex items-center'>
              <FaBrain className='text-white text-3xl mr-2' />
              <span className='text-white text-2xl font-semibold'>
                AI Explorer
              </span>
            </div>
          </Link>
          {/* Menu */}

          <SignedIn>
            {' '}
            <div className='hidden md:flex space-x-4'>
              <Link
                className='text-white hover:text-gray-200 px-3 py-2 rounded-md text-lg font-medium'
                href='/'>
                Home
              </Link>
              <Link
                className='text-white hover:text-gray-200 px-3 py-2 rounded-md text-lg font-medium'
                href='/translator'>
                Translator
              </Link>
              <Link
                className='text-white hover:text-gray-200 px-3 py-2 rounded-md text-lg font-medium'
                href='/imagine'>
                Image Generator
              </Link>
              <SignedIn>
                <SignOutButton>
                  <span className='cursor-pointer text-white hover:text-gray-200 px-3 py-2 rounded-md text-lg font-normal'>
                    Sign Out
                  </span>
                </SignOutButton>
              </SignedIn>
            </div>
          </SignedIn>

          <SignedOut>
            <span className='text-white font-semibold'>
              <SignInButton />
            </span>
          </SignedOut>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center'>
            <button
              type='button'
              className='text-white hover:text-gray-200 focus:outline-none'
              aria-label='Menu'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16m-7 6h7'></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
          <Link
            className='block text-white hover:text-gray-200 px-3 py-2 rounded-md text-lg font-medium'
            href='/'>
            Home
          </Link>
          <Link
            href='/translator'
            className='block text-white hover:text-gray-200 px-3 py-2 rounded-md text-lg font-medium'>
            Translator
          </Link>
          <Link
            href='/imagine'
            className='block text-white hover:text-gray-200 px-3 py-2 rounded-md text-lg font-medium'>
            Image Generator
          </Link>
        </div>
      </div>
    </nav>
  );
}

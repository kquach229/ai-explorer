'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { SyncLoader } from 'react-spinners';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState<string>(''); // Explicitly set the type
  const [imageUrl, setImageUrl] = useState<string>(''); // Explicitly set the type
  const [loading, setLoading] = useState<boolean>(false); // Explicitly set the type
  const [error, setError] = useState<boolean>(false); // Explicitly set the type

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setImageUrl(''); // Reset the image URL

    try {
      const response = await fetch('/api/imagine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.image) {
        setImageUrl(data.image); // Set the image URL to the base64 string or URL
      }
    } catch (error) {
      setError(true);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-700 to-green-600'>
      <div className='relative py-4 sm:py-6 max-w-full sm:max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-teal-800 to-green-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative px-4 sm:px-8 py-8 sm:py-10 bg-white shadow-lg rounded-xl sm:rounded-3xl'>
          <div className='max-w-full sm:max-w-md mx-auto'>
            <h1 className='text-2xl sm:text-3xl font-semibold text-teal-600 mb-3 sm:mb-4 text-center'>
              AI Explorer - Imagination
            </h1>
            <form onSubmit={handleSubmit} className='divide-y divide-gray-200'>
              <div className='py-6 sm:py-8 text-base leading-6 space-y-3 sm:space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
                <div className='flex flex-col'>
                  <label className='text-teal-600 leading-loose'>
                    Enter your imagination
                  </label>
                  <input
                    type='text'
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder='Describe the image you want to generate...'
                    className='p-2 sm:p-3 border border-teal-300 rounded text-gray-700 focus:outline-none focus:border-teal-500 bg-teal-50'
                  />
                </div>
                <button
                  type='submit'
                  className='mt-3 sm:mt-5 px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-teal-500 to-green-400 text-white rounded shadow-md hover:shadow-lg transition duration-300'>
                  Generate Image
                </button>
              </div>
            </form>

            {loading && (
              <div className='flex justify-center items-center py-3'>
                <SyncLoader color='#38b2ac' loading={loading} />
              </div>
            )}
            {error && 'An error has occurred'}
            {imageUrl && (
              <div className='mt-6'>
                <Image
                  src={imageUrl} // Ensure that the imageUrl is valid
                  alt='Generated Image'
                  width={500} // Specify the width
                  height={300} // Specify the height
                  layout='intrinsic' // Choose layout as per your requirement
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

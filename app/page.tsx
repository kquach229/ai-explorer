import { SignedOut, SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='min-h-screen bg-teal-50'>
      {/* Hero Section */}
      <section className='bg-teal-600 text-white py-20'>
        <div className='container mx-auto text-center px-4'>
          <h1 className='text-3xl md:text-5xl font-bold mb-4'>
            Unlock the Power of AI Translation and Image Generation
          </h1>
          <p className='text-lg md:text-xl mb-8'>
            Transform your content with our AI-powered tools.
          </p>
          <p className='text-md md:text-lg'>Explore the options below!</p>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 px-4'>
          <Link href='/translator'>
            <div className='p-6 h-40 text-center bg-teal-100 rounded shadow hover:shadow-lg transition-shadow'>
              <h2 className='text-2xl font-bold text-teal-800'>
                AI Translator
              </h2>
              <p className='text-lg text-teal-700'>
                Seamlessly translate your content into multiple languages with
                high accuracy.
              </p>
            </div>
          </Link>
          <Link href='/imagine'>
            <div className='p-6 h-40 text-center bg-teal-100 rounded shadow hover:shadow-lg transition-shadow'>
              <h2 className='text-2xl  font-bold text-teal-800'>
                AI Image Generator
              </h2>
              <p className='text-lg text-teal-700'>
                Generate stunning images from text prompts in seconds.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-20 bg-light-green-50'>
        <div className='container mx-auto text-center px-4'>
          <h2 className='text-3xl font-bold text-teal-800 mb-8'>
            What Our Users Say
          </h2>
          <div className='flex flex-wrap justify-center gap-6'>
            <div className='p-6 bg-white shadow-md rounded max-w-xs'>
              <p className='text-teal-700'>
                "This AI tool has revolutionized my business! Translations are
                accurate, and images are incredible."
              </p>
              <p className='mt-4 text-teal-800 font-semibold'>- Happy User</p>
            </div>
            <div className='p-6 bg-white shadow-md rounded max-w-xs'>
              <p className='text-teal-700'>
                "The AI Image Generator is a game-changer for our design team.
                It saves so much time!"
              </p>
              <p className='mt-4 text-teal-800 font-semibold'>
                - Creative Designer
              </p>
            </div>
          </div>
        </div>
      </section>

      <SignedOut>
        {' '}
        {/* CTA Section */}
        <section className='bg-teal-600 text-white py-20 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-6'>
            Ready to Get Started?
          </h2>
          <p className='text-lg md:text-xl mb-8'>
            Sign up today and take advantage of our AI-powered tools.
          </p>
          <a
            href='#'
            className='inline-block px-6 py-3 bg-light-green-500 text-white font-semibold rounded hover:bg-light-green-600 transition-colors'>
            <SignUpButton>Sign Up to get started</SignUpButton>
          </a>
        </section>
      </SignedOut>
    </div>
  );
}

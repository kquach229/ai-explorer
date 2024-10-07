import React, { ReactNode } from 'react';
import { SyncLoader } from 'react-spinners';

// Define the type for the props
interface ResultCardProps {
  children?: ReactNode; // children can be React nodes
  error?: boolean; // error is a boolean
  loading?: boolean; // loading is a boolean
}

const ResultCard: React.FC<ResultCardProps> = ({
  children,
  error = false,
  loading = false,
}) => {
  return (
    <div className='bg-gray-50 rounded-lg h-[70vh] sm:w-full w-[100%] px-10 py-0 flex justify-center items-center'>
      <div className='gap-10'>
        {!children && 'Your results will show here'}
        {error && 'An error occurred'}
        {loading && (
          <div className='flex justify-center items-center py-3 mt-5'>
            <SyncLoader color='#38b2ac' loading={loading} />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default ResultCard;

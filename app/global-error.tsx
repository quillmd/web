'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError: React.FC<GlobalErrorProps> = ({ error, reset }) => {
  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-orange-200 flex-wrap">
      <div className="text-center mr-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{"Something's wrong here..."}</h1>
        <p className="text-gray-600 mb-8">{"We can't find the page you're looking for. Check out our Help Center or head back to home."}</p>

        <div className="flex justify-center space-x-4 mb-8">
          <Link href="/help">
            <div style={{ width: '75.14px', height: '40px' }} className="bg-amber-500 text-white flex items-center justify-center rounded-md hover:bg-amber-600 cursor-pointer">Help</div>
          </Link>
          <Link href="/">
            <div style={{ width: '75.14px', height: '40px' }} className="bg-gray-300 text-gray-700 flex items-center justify-center rounded-md hover:bg-gray-400 cursor-pointer">Home</div>
          </Link>
        </div>
      </div>

      <div className="logo flex-shrink-0">
        <Image src="/logo.svg" alt="Logo" width={400} height={400} />
      </div>
    </div>
  );
};

export default GlobalError;

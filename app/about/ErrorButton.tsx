// app/about/ErrorButton.tsx
'use client'; // This line is important to mark this as a client component

import React from 'react';

const triggerError = () => {
  throw new Error('This is an intentional error');
};

const ErrorButton: React.FC = () => {
  return (
    <div className="text-center">
      <button
        onClick={triggerError}
        className="mt-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Trigger Error
      </button>
    </div>
  );
};

export default ErrorButton;
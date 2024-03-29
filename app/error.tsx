// app/error.tsx
'use client';

import React from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const RootError: React.FC<ErrorProps> = ({ error, reset }) => {
  return (
    <div>
      <h2>Something went wrong! GLOBAL ERROR PAGE</h2>
      <p>Error: {error.message}</p>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}

export default RootError;

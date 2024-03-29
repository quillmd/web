// app/notes/error.tsx
'use client';

import React from 'react';

interface NotesErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const NotesError: React.FC<NotesErrorProps> = ({ error, reset }) => {
  return (
    <div>
      <h2>Oops, an error occurred in Notes!</h2>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}

export default NotesError;

'use client' // Error boundaries must be Client Components
 
import { logout, refreshToken } from '@/lib/auth';
import { useEffect } from 'react'
 
export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <span>Error code: {error.digest}</span>
      <button
        onClick={()=>refreshToken().then(()=>{console.log("retry")})}
      >        Try again
      </button>
    </div>
  )
}
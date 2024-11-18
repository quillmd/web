const getApiUrl = () => {
    if (typeof window === 'undefined') {
      // Server-side: use Docker service name
      return process.env.NEXT_PUBLIC_API
    } else {
      // Client-side: use public URL
      return process.env.NEXT_PUBLIC_API
    }
  }

  export const API_URL = getApiUrl()
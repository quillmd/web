"use client";

import { useEffect, useState } from 'react';

const KeepAwake = () => {
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel|null>(null);

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        const wakeLock = await navigator.wakeLock.request('screen');
        setWakeLock(wakeLock);
        console.log('Wake Lock is active');
      } catch (err) {
        console.error('Failed to acquire Wake Lock:', err);
      }
    };

    if ('wakeLock' in navigator) {
      requestWakeLock();
    } else {
      console.warn('Wake Lock API not supported');
    }

    return () => {
      if (wakeLock) {
        wakeLock.release();
        console.log('Wake Lock is released');
      }
    };
  }, []);

  return null;
};

export default KeepAwake;
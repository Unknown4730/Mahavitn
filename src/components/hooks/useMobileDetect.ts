import { useState, useEffect } from 'react';

interface MobileDetect {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isTouchDevice: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: 'portrait' | 'landscape';
}

export function useMobileDetect(): MobileDetect {
  const [mobileInfo, setMobileInfo] = useState<MobileDetect>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isIOS: false,
    isAndroid: false,
    isTouchDevice: false,
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1920,
    screenHeight: typeof window !== 'undefined' ? window.innerHeight : 1080,
    orientation: 'landscape',
  });

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const userAgent = navigator.userAgent.toLowerCase();
      
      // Detect platform
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isAndroid = /android/.test(userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Detect device type by screen size
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      
      // Detect orientation
      const orientation = width > height ? 'landscape' : 'portrait';

      setMobileInfo({
        isMobile,
        isTablet,
        isDesktop,
        isIOS,
        isAndroid,
        isTouchDevice,
        screenWidth: width,
        screenHeight: height,
        orientation,
      });
    };

    // Initial detection
    detectDevice();

    // Listen for resize and orientation changes
    window.addEventListener('resize', detectDevice);
    window.addEventListener('orientationchange', detectDevice);

    return () => {
      window.removeEventListener('resize', detectDevice);
      window.removeEventListener('orientationchange', detectDevice);
    };
  }, []);

  return mobileInfo;
}

// Utility functions
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

export const isTabletDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  const width = window.innerWidth;
  return width >= 768 && width < 1024;
};

export const isDesktopDevice = (): boolean => {
  if (typeof window === 'undefined') return true;
  return window.innerWidth >= 1024;
};

export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export const isIOSDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
};

export const isAndroidDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /android/.test(navigator.userAgent.toLowerCase());
};

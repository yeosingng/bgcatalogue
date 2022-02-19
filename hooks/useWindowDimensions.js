import { useState, useEffect } from 'react';

export const MOBILE_BREAKPOINT = 630;
export const TABLET_BREAKPOINT = 800;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;


  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({});

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
  }, [])

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: windowDimensions ? windowDimensions.width <= MOBILE_BREAKPOINT : false,
    isTablet: windowDimensions ? windowDimensions.width <= TABLET_BREAKPOINT && windowDimensions.width > MOBILE_BREAKPOINT: false,
  };
}
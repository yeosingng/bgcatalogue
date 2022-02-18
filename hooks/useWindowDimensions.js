import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 480;

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
  };
}
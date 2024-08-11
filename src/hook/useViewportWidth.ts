import { useCallback, useState } from 'react'
const browser = typeof window !== 'undefined'

export const useViewportWidth = () => {
  const [height, setHeight] = useState(browser ? window.innerHeight : 0)
  const [width, setWidth] = useState(browser ? window.innerWidth : 0)

  const setSize = useCallback(() => {
    setHeight(window.innerHeight || 0);
    setWidth(window.innerWidth || 0);
  }, []);

  window.addEventListener('resize', setSize, {passive: true});
  window.addEventListener('orientationchange', setSize, {passive: true});

  return {width, height};
}
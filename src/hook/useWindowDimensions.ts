import React, { useState, useEffect } from "react";

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window && window.innerWidth,
    height: window && window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window && window.innerWidth,
        height: window && window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
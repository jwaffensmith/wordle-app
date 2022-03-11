import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Banner = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const bannerRoot = document.getElementById("banner");
    bannerRoot.appendChild(elRef.current);
    return () => bannerRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Banner;



import { useState, useLayoutEffect } from "react";

const isBigScreen = (width = 992) => {
  return (
    typeof document !== "undefined" &&
    (window?.innerWidth > width || window?.document?.body?.clientWidth > width)
  );
};

const useWindowSize = () => {
  const [isDesktop, setIsDesktop] = useState(isBigScreen());

  const handleResize = () => {
    setIsDesktop(isBigScreen());
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isDesktop]);

  return isDesktop;
};

export default useWindowSize;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Function that automatically scrolls the window to the top of the page on every instantiation.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

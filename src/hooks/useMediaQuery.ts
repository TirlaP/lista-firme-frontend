import { useEffect, useState } from "react";

/**
 * useMediaQuery - Custom hook for responsive design
 *
 * @param {string} query - CSS media query to match
 * @returns {boolean} - Whether the query matches
 *
 * @example
 * const isDesktop = useMediaQuery('(min-width: 1024px)');
 *
 * if (isDesktop) {
 *   // Render desktop version
 * } else {
 *   // Render mobile version
 * }
 */
export function useMediaQuery(query) {
  // Default to true for SSR
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create media query list
    const media = window.matchMedia(query);

    // Initial check
    setMatches(media.matches);

    // Define listener
    const listener = (event) => {
      setMatches(event.matches);
    };

    // Add listener
    media.addEventListener("change", listener);

    // Cleanup
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}

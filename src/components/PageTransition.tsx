import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Wraps page content and fades out/in on route change.
 * Out: 150ms, In: 300ms.
 */
const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [phase, setPhase] = useState<"visible" | "out" | "in">("visible");
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname === prevPath.current) {
      // Same path, just update children (e.g. query change)
      setDisplayedChildren(children);
      return;
    }

    prevPath.current = location.pathname;

    // Fade out
    setPhase("out");

    const fadeOutTimer = setTimeout(() => {
      // Swap content, scroll to top, fade in
      setDisplayedChildren(children);
      window.scrollTo(0, 0);
      setPhase("in");

      const fadeInTimer = setTimeout(() => {
        setPhase("visible");
      }, 300);

      return () => clearTimeout(fadeInTimer);
    }, 150);

    return () => clearTimeout(fadeOutTimer);
  }, [location.pathname, children]);

  return (
    <div
      className={
        phase === "out"
          ? "page-transition-out"
          : phase === "in"
            ? "page-transition-in"
            : ""
      }
    >
      {displayedChildren}
    </div>
  );
};

export default PageTransition;

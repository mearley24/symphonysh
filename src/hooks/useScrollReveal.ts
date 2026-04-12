import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to the container ref.
 * Elements with `data-reveal` fade up when 15% visible.
 * Elements with `data-reveal-children` get their children staggered.
 * Once revealed, elements stay visible (observer unobserves them).
 */
export function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Collect all targets first, before modifying classes
    const revealEls = container.querySelectorAll("[data-reveal]");
    const staggerEls = container.querySelectorAll("[data-reveal-children]");

    const allTargets = new Set<Element>();

    revealEls.forEach((el) => allTargets.add(el));
    staggerEls.forEach((parent) => {
      Array.from(parent.children).forEach((child, i) => {
        (child as HTMLElement).style.setProperty("--stagger-index", String(i));
        allTargets.add(child);
      });
    });

    // Create observer before adding hidden classes
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("fade-up-hidden");
            entry.target.classList.add("fade-up-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    // Apply hidden classes and start observing in one rAF
    requestAnimationFrame(() => {
      allTargets.forEach((el) => {
        // Check if element is already well above the viewport (user scrolled past it)
        const rect = el.getBoundingClientRect();
        const isAboveViewport = rect.bottom < 0;
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        if (isAboveViewport) {
          // Already scrolled past — show immediately without animation
          el.classList.add("fade-up-visible");
        } else if (isInViewport) {
          // Currently visible — show with animation
          el.classList.add("fade-up-hidden");
          if (staggerEls.length > 0) {
            // Check if this is a stagger child
            const parent = el.parentElement;
            if (parent?.hasAttribute("data-reveal-children")) {
              el.classList.add("fade-up-stagger");
            }
          }
          // Trigger after a frame so the transition plays
          requestAnimationFrame(() => {
            el.classList.remove("fade-up-hidden");
            el.classList.add("fade-up-visible");
          });
        } else {
          // Below viewport — hide and observe
          el.classList.add("fade-up-hidden");
          if (staggerEls.length > 0) {
            const parent = el.parentElement;
            if (parent?.hasAttribute("data-reveal-children")) {
              el.classList.add("fade-up-stagger");
            }
          }
          observer.observe(el);
        }
      });

      // Also observe data-reveal elements
      revealEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0) {
          el.classList.add("fade-up-visible");
        } else if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("fade-up-hidden");
          requestAnimationFrame(() => {
            el.classList.remove("fade-up-hidden");
            el.classList.add("fade-up-visible");
          });
        } else {
          el.classList.add("fade-up-hidden");
          observer.observe(el);
        }
      });
    });

    return () => observer.disconnect();
  }, []);

  return containerRef;
}

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

    // Apply hidden class to all reveal targets
    const revealEls = container.querySelectorAll("[data-reveal]");
    revealEls.forEach((el) => {
      el.classList.add("fade-up-hidden");
    });

    // Apply hidden class + stagger index to children of stagger containers
    const staggerEls = container.querySelectorAll("[data-reveal-children]");
    staggerEls.forEach((parent) => {
      Array.from(parent.children).forEach((child, i) => {
        (child as HTMLElement).style.setProperty("--stagger-index", String(i));
        child.classList.add("fade-up-hidden", "fade-up-stagger");
      });
    });

    // Collect all targets
    const allTargets = new Set<Element>();
    revealEls.forEach((el) => allTargets.add(el));
    staggerEls.forEach((parent) => {
      Array.from(parent.children).forEach((child) => allTargets.add(child));
    });

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
      { threshold: 0.15 },
    );

    // Small delay to ensure DOM is painted with hidden state
    requestAnimationFrame(() => {
      allTargets.forEach((el) => observer.observe(el));
    });

    return () => observer.disconnect();
  }, []);

  return containerRef;
}

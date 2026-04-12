import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to the container ref.
 * Elements with `data-reveal` fade up when entering viewport.
 * Elements with `data-reveal-children` get their direct children staggered.
 * Once revealed, elements stay visible.
 */
export function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets: Element[] = [];

    // data-reveal elements
    container.querySelectorAll("[data-reveal]").forEach((el) => {
      targets.push(el);
    });

    // data-reveal-children → each child becomes a target
    container.querySelectorAll("[data-reveal-children]").forEach((parent) => {
      Array.from(parent.children).forEach((child, i) => {
        (child as HTMLElement).style.setProperty("--stagger-index", String(i));
        child.classList.add("fade-up-stagger");
        targets.push(child);
      });
    });

    // Apply hidden state and observe
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
      { threshold: 0.1 },
    );

    // Use a small timeout to let the browser paint the initial state,
    // then check each element's position
    const timer = setTimeout(() => {
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is already above or mostly in the viewport on load, show it immediately
        if (rect.top < window.innerHeight * 0.85) {
          el.classList.add("fade-up-visible");
        } else {
          el.classList.add("fade-up-hidden");
          observer.observe(el);
        }
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return containerRef;
}

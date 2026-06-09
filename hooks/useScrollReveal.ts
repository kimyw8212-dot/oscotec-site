"use client";
import { useEffect, useRef } from "react";

export function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = Array.from(
      el.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    /* #scroll-root 를 루트로 삼아 Intersection 관찰 */
    const root = document.getElementById("scroll-root") ?? null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          targets.forEach((child) => {
            const delay = parseInt(child.dataset.delay ?? "0", 10);
            setTimeout(() => child.classList.add("revealed"), delay);
          });
          observer.disconnect();
        }
      },
      { root, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

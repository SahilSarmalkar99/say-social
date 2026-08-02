import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useFadeUpCards(options = {}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const cards = gsap.utils.toArray(
      ref.current.querySelectorAll(
        options.selector || ".fade-card"
      )
    );

    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
  cards,
  {
    y: options.y ?? 80,
    opacity: 0,
    scale: options.scale ?? 0.98,
  },
  {
    y: 0,
    opacity: 1,
    scale: 1,

    duration: options.duration ?? 1,
    stagger: options.stagger ?? 0.15,
    ease: options.ease ?? "power3.out",

    scrollTrigger: {
      trigger: ref.current,
      start: options.start ?? "top 85%",
      toggleActions:
        options.toggleActions ??
        "play none none none",
      once: options.once ?? true,
    },
  }
);
    }, ref);

    return () => ctx.revert();
  }, [options]);

  return ref;
}
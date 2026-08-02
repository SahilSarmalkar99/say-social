import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useDashedLineReveal(lineRef) {
  useLayoutEffect(() => {
    if (!lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [lineRef]);
}
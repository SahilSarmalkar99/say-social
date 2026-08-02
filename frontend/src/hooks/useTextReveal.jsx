import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useTextReveal() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const element = ref.current;

    if (!element) return;

    const animation = gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: element,
          start: "top 75%",
          once: true,
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  return ref;
}
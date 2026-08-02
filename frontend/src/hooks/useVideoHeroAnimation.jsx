import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useVideoHeroAnimation(
  sectionRef,
  videoRef,
  overlayRef,
  heroRef,
  setShowNavbar
) {
  useLayoutEffect(() => {
    gsap.set(heroRef.current, {
      opacity: 0,
      y: 100,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.to(videoRef.current, {
      scale: 2.2,
      filter: "blur(25px)",
      ease: "none",
      opacity : 0,
    })

      .to(
        overlayRef.current,
        {
          opacity: 0,
        },
        0.4,
      )

      .to(
        heroRef.current,
        {
          opacity: 1,
          y: 0,

          onStart: () => {
            setShowNavbar(true);
          },

          onReverseComplete: () => {
            setShowNavbar(false);
          },
        },
        0.75,
      );
  }, []);
}

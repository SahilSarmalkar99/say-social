import { useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useFadeUpCards(options = {}) {
  const ref = useRef(null);

  // Keep the latest options without making the GSAP
  // initialization depend on the options object reference.
  const optionsRef = useRef(options);
  optionsRef.current = options;

  // Stores the GSAP cleanup function.
  const cleanupRef = useRef(null);

  // Prevents duplicate initialization.
  const initializedRef = useRef(false);

  const setRef = useCallback((section) => {
    /*
     * React gives us null when the element is actually
     * removed/unmounted.
     */
    if (!section) {
      cleanupRef.current?.();
      cleanupRef.current = null;
      initializedRef.current = false;
      return;
    }

    /*
     * If this section has already been initialized,
     * NEVER create another GSAP animation.
     */
    if (initializedRef.current) return;

    const setup = () => {
      if (initializedRef.current) return true;

      const {
        selector = ".fade-card",
        y = 80,
        scale = 0.98,
        duration = 1,
        stagger = 0.15,
        ease = "power3.out",
        start = "top 85%",
        toggleActions = "play none none none",
        once = true,
      } = optionsRef.current;

      const cards = gsap.utils.toArray(
        section.querySelectorAll(selector)
      );

      /*
       * The section can mount before API data/cards exist.
       * In that case, wait for the cards.
       */
      if (!cards.length) {
        return false;
      }

      initializedRef.current = true;

      /*
       * YOUR ORIGINAL GSAP ANIMATION.
       *
       * Nothing about the animation itself has been changed.
       */
      const ctx = gsap.context(() => {
        gsap.fromTo(
          cards,
          {
            y,
            opacity: 0,
            scale,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,

            duration,
            stagger,
            ease,

            scrollTrigger: {
              trigger: section,
              start,
              toggleActions,
              once,
            },
          }
        );
      }, section);

      /*
       * Cleanup only happens when this actual section
       * is unmounted.
       */
      cleanupRef.current = () => {
        ctx.revert();
      };

      return true;
    };

    /*
     * If cards already exist, initialize immediately.
     */
    if (setup()) {
      return;
    }

    /*
     * If cards are rendered later, wait for them.
     *
     * IMPORTANT:
     * We observe childList only.
     *
     * Video muted/play/pause/volume changes do NOT
     * cause this observer to recreate GSAP.
     */
    const observer = new MutationObserver(() => {
      if (setup()) {
        observer.disconnect();
      }
    });

    observer.observe(section, {
      childList: true,
      subtree: true,
    });

    cleanupRef.current = () => {
      observer.disconnect();
    };
  }, []);

  return setRef;
}
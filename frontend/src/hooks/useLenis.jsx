import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 3, // ⬅️ higher = heavier feel
      smooth: true,
      lerp: 0.08, // ⬅️ LOWER = heavier (default ~0.1–0.2)
      wheelMultiplier: 0.9, // ⬅️ reduces scroll sensitivity
      touchMultiplier: 1.2,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
};

export default useLenis;
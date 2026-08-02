import { useEffect } from "react";
import gsap from "gsap";

const useCarousel = (cardsRef) => {
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);

    if (!cards.length) return;

    const total = cards.length;

    let offset = 0;
    let frameId;
    let lastTime = performance.now();

    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      const width = window.innerWidth;

      const radius =
        width < 640
          ? 550 // mobile only
          : width < 768
            ? 800 // tablet
            : width < 1024
              ? 900 // keep as is
              : 1000; // keep as is

      cards.forEach((card, i) => {
        const progress = ((i + offset) % total) / total;

        // tighter cylinder
        const angle = gsap.utils.mapRange(
          0,
          1,
          width < 640
            ? -Math.PI / 1.5
            : width < 768
              ? -Math.PI / 2
              : -Math.PI / 2.15,

          width < 640
            ? Math.PI / 1.5
            : width < 768
              ? Math.PI / 2
              : Math.PI / 2.15,

          progress,
        );

        const x = Math.sin(angle) * radius;

        // tunnel effect
        const z = -(Math.cos(angle) * radius);

        // face center
        const rotateY = -(angle * 180) / Math.PI;

        const depth = (Math.cos(angle) + 1) / 2;

        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,

          x,
          y: 0,
          z,

          rotateY,

          // much more natural
          scale: 0.95 + depth * 0.05,

          opacity: 0.65 + depth * 0.35,

          zIndex: Math.round(-z),

          force3D: true,
        });
      });

      // frame-rate independent speed
      offset += delta * 0.00015;

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [cardsRef]);
};

export default useCarousel;

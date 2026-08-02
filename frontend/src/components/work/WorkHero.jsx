import React from "react";
import useFadeUpCards from "../../hooks/useFadeIn";

const WorkHero = () => {
  const fadeIn = useFadeUpCards();
  return (
    <section ref={fadeIn} className=" relative h-[60vh] min-h-[400px] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        loading="lazy"
        playsInline
        className="
        fade-card
          absolute
          inset-0
          w-full
          h-full
          object-cover
          object-center
        "
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
    </section>
  );
};

export default WorkHero;
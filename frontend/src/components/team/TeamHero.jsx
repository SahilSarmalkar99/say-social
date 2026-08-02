import React from "react";
import video from "../../assets/team/team.mp4"
const TeamHero = () => {
  return (
    <section className="relative h-[80vh] min-h-[400px] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        loading="lazy"
        playsInline
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          object-center
        "
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
    </section>
  );
};

export default TeamHero;
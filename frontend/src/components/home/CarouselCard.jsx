import { motion } from "framer-motion";

export default function CarouselCard({
  video,
  position,
  videoRef,
}) {
  const positions = {
    "-2": {
      x: -700,
      scale: 0.6,
      rotateY: 40,
      opacity: 0.2,
      zIndex: 10,
    },

    "-1": {
      x: -320,
      scale: 0.85,
      rotateY: 25,
      opacity: 0.8,
      zIndex: 20,
    },

    "0": {
      x: 0,
      scale: 1,
      rotateY: 0,
      opacity: 1,
      zIndex: 50,
    },

    "1": {
      x: 320,
      scale: 0.85,
      rotateY: -25,
      opacity: 0.8,
      zIndex: 20,
    },

    "2": {
      x: 700,
      scale: 0.6,
      rotateY: -40,
      opacity: 0.2,
      zIndex: 10,
    },
  };

  return (
    <motion.div
      layout
      animate={positions[position]}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        zIndex: positions[position].zIndex,
      }}
      className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
      "
    >
      <div
        className="
          overflow-hidden
          rounded-[32px]
          bg-black
          shadow-2xl
          w-[220px]
          h-[420px]
          md:w-[280px]
          md:h-[540px]
          lg:w-[340px]
          lg:h-[640px]
        "
      >
        <video
          ref={videoRef}
          muted
          loop
          loading="lazy"
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        >
          <source src={video.src} />
        </video>
      </div>
    </motion.div>
  );
}
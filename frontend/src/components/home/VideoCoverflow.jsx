import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useTextReveal from "../../hooks/useTextReveal";
import useFadeUpCards from "../../hooks/useFadeIn";
import { useState, useRef, useEffect } from "react";
import HomeAPI from "../../api/home.api";

// const videos = [
//   { id: 1, src: "https://res.cloudinary.com/dor2qddak/video/upload/v1782367626/sa1_rnyypa.mp4" },
//   { id: 2, src: "https://res.cloudinary.com/dor2qddak/video/upload/v1782367632/sa2_iqbzef.mp4" },
//   { id: 3, src: "https://res.cloudinary.com/dor2qddak/video/upload/v1782367619/sa3_yem6m3.mp4" },
//   { id: 4, src: "https://res.cloudinary.com/dor2qddak/video/upload/v1782367600/or1_oysbpg.mp4" },
//   { id: 5, src: "https://res.cloudinary.com/dor2qddak/video/upload/v1782367603/or2_asxea7.mp4" },
//   { id: 6, src: "https://res.cloudinary.com/dor2qddak/video/upload/v1782367604/or3_ckukxh.mp4" },
// ];

export default function VideoCoverflow() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef({});
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchFeaturedWork = async () => {
      try {
        const res = await HomeAPI.getAll();

        const section = res.data.find(
          (item) => item.section === "featured-work",
        );

        const videos =
          section?.videos.map((video, index) => ({
            id: index + 1,
            src: video.url,
          })) || [];

        setItems(videos);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedWork();
  }, []);

  useEffect(() => {
    if (!items.length) return;

    const visibleIds = [items[4]?.id, items[3]?.id, items[2]?.id];

    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (!video) return;

      if (visibleIds.includes(Number(id))) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [items]);

  const next = () => {
    setItems((prev) => {
      const arr = [...prev];
      const last = arr.pop();
      setIsAnimating(true);
      return [last, ...arr];
    });
  };

  const prev = () => {
    setItems((prev) => {
      const arr = [...prev];
      const first = arr.shift();
      setIsAnimating(true);

      return [...arr, first];
    });
  };

  const slots = [
    { x: -700, scale: 0.45, rotateY: 45, opacity: 0, zIndex: 0 },
    { x: -550, scale: 0.65, rotateY: 35, opacity: 0.25, zIndex: 10 },
    { x: -280, scale: 0.85, rotateY: 20, opacity: 0.8, zIndex: 20 },
    { x: 0, scale: 1, rotateY: 0, opacity: 1, zIndex: 50 },
    { x: 280, scale: 0.85, rotateY: -20, opacity: 0.8, zIndex: 20 },
    { x: 550, scale: 0.65, rotateY: -35, opacity: 0.25, zIndex: 10 },
  ];

  const textReveal = useTextReveal();
  const textReveal2 = useTextReveal();
  const fadeIn = useFadeUpCards();

  if (loading) {
    return (
      <section className="py-24 text-center text-white">Loading...</section>
    );
  }

  return (
    <section
      ref={fadeIn}
      className="
      md:py-24
      relative
      overflow-hidden
      flex
      items-center
      justify-center
    "
    >
      {/* Glow */}

      <div
        className="
        absolute
        w-[900px]
        h-[900px]
        rounded-full
        blur-[180px]
      "
      />

      <div className="absolute top-15 left-1/2 -translate-x-1/2 z-50 text-center">
        <h2
          ref={textReveal}
          className="
      text-4xl
      md:text-[72px]
      font-bold
      text-white
      mb-4
    "
        >
          Featured Work
        </h2>

        <p
          ref={textReveal2}
          className="
      text-white/70
      text-sm
      md:text-lg
      max-w-xl
      mx-auto
    "
        >
          Explore our latest projects, campaigns, and creative productions.
        </p>
      </div>

      {/* Carousel */}

      <div
        className="fade-card
        relative
        w-full
        h-[450px]
sm:h-[550px]
md:h-[650px]
lg:h-[700px]
        perspective-[2500px]
        mt-50
        md:mt-20
      "
      >
        {items.map((item, index) => {
          const slot = slots[index];

          const shouldPlay = index === 1 || index === 2 || index === 3;

          return (
            <motion.div
              key={item.id}
              layout
              onAnimationComplete={() => {
                if (index === 2) {
                  Object.values(videoRefs.current).forEach((video) => {
                    if (!video) return;

                    video.pause();
                  });

                  Object.entries(videoRefs.current).forEach(([id, video]) => {
                    if (!video) return;

                    const num = Number(id);

                    if (
                      num === items[1]?.id ||
                      num === items[2]?.id ||
                      num === items[3]?.id
                    ) {
                      video.play().catch(() => {});
                    }
                  });

                  setIsAnimating(false);
                }
              }}
              animate={{
                x: slot.x,
                scale: slot.scale,
                rotateY: slot.rotateY,
                opacity: slot.opacity,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                zIndex: slot.zIndex,
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
                  w-[180px]
                  h-[320px]
                  sm:w-[220px]
                  sm:h-[400px]
                  md:w-[280px]
                  md:h-[520px]
                "
              >
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[item.id] = el;
                  }}
                  src={item.src}
                  muted
                  loop
                  loading="lazy"
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />

                {index !== 2 && <div className="absolute inset-0 " />}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Prev */}

      <button
        onClick={prev}
        className="
          absolute
          left-3
          md:left-8
          z-50
          w-14
          h-14
          rounded-full
          bg-white/10
          backdrop-blur-lg
          border
          border-white/20
          text-white
          flex
          items-center
          justify-center
          mt-30
          md:mt-0
        "
      >
        <ChevronLeft />
      </button>

      {/* Next */}

      <button
        onClick={next}
        className="
          absolute
          right-3
          md:right-8
          mt-30
          md:mt-0
          z-50
          w-14
          h-14
          rounded-full
          bg-white/10
          backdrop-blur-lg
          border
          border-white/20
          text-white
          flex
          items-center
          justify-center
        "
      >
        <ChevronRight />
      </button>
    </section>
  );
}

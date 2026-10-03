import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
} from "lucide-react";
import useTextReveal from "../../hooks/useTextReveal";
import useFadeUpCards from "../../hooks/useFadeIn";
import { useState, useRef, useEffect } from "react";
import HomeAPI from "../../api/home.api";

export default function VideoCoverflow() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const videoRefs = useRef({});
  const [isMuted, setIsMuted] = useState(true);

  const textReveal = useTextReveal();
  const textReveal2 = useTextReveal();
  const fadeIn = useFadeUpCards();

  /*
   * -------------------------------------------------------
   * FETCH VIDEOS
   * -------------------------------------------------------
   */

  useEffect(() => {
    const fetchFeaturedWork = async () => {
      try {
        const res = await HomeAPI.getAll();

        const section = res.data.find(
          (item) => item.section === "featured-work"
        );

        const videos =
          section?.videos?.map((video, index) => ({
            id: index + 1,
            src: video.url,
          })) || [];

        setItems(videos);
      } catch (err) {
        console.error("Failed to load featured work:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedWork();
  }, []);

  /*
   * -------------------------------------------------------
   * CAROUSEL SLOTS
   *
   * index 2 = LEFT
   * index 3 = CENTER
   * index 4 = RIGHT
   * -------------------------------------------------------
   */

  const slots = [
    {
      x: -700,
      scale: 0.45,
      rotateY: 45,
      opacity: 0,
      zIndex: 0,
    },
    {
      x: -550,
      scale: 0.65,
      rotateY: 35,
      opacity: 0.25,
      zIndex: 10,
    },
    {
      x: -280,
      scale: 0.85,
      rotateY: 20,
      opacity: 0.8,
      zIndex: 20,
    },
    {
      x: 0,
      scale: 1,
      rotateY: 0,
      opacity: 1,
      zIndex: 50,
    },
    {
      x: 280,
      scale: 0.85,
      rotateY: -20,
      opacity: 0.8,
      zIndex: 20,
    },
    {
      x: 550,
      scale: 0.65,
      rotateY: -35,
      opacity: 0.25,
      zIndex: 10,
    },
  ];

  /*
   * -------------------------------------------------------
   * VIDEO PLAYBACK CONTROLLER
   *
   * ONLY:
   *
   * index 2 -> LEFT
   * index 3 -> CENTER
   * index 4 -> RIGHT
   *
   * are allowed to play.
   *
   * Everything else is paused.
   * -------------------------------------------------------
   */

  useEffect(() => {
    if (!items.length) return;

    // Give React time to update the refs after reordering.
    const timer = setTimeout(() => {
      items.forEach((item, index) => {
        const video = videoRefs.current[item.id];

        if (!video) return;

        const isVisibleVideo =
          index === 2 ||
          index === 3 ||
          index === 4;

        const isCenterVideo = index === 3;

        if (isVisibleVideo) {
          // Side videos are ALWAYS muted.
          if (!isCenterVideo) {
            video.muted = true;
          }

          // Center follows mute state.
          if (isCenterVideo) {
            video.muted = isMuted;
          }

          video.play().catch(() => {
            // Browser autoplay restrictions can block unmuted playback.
            // If that happens, fallback to muted playback.
            video.muted = true;

            video.play().catch(() => {});
          });
        } else {
          video.pause();
          video.currentTime = 0;
          video.muted = true;
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [items, isMuted]);

  /*
   * -------------------------------------------------------
   * NEXT
   * -------------------------------------------------------
   */

  const next = () => {
    setItems((prev) => {
      if (prev.length <= 1) return prev;

      const arr = [...prev];

      const last = arr.pop();

      return [last, ...arr];
    });
  };

  /*
   * -------------------------------------------------------
   * PREVIOUS
   * -------------------------------------------------------
   */

  const prev = () => {
    setItems((prev) => {
      if (prev.length <= 1) return prev;

      const arr = [...prev];

      const first = arr.shift();

      return [...arr, first];
    });
  };

  /*
   * -------------------------------------------------------
   * MUTE / UNMUTE
   *
   * Only center video gets audio.
   * -------------------------------------------------------
   */

  const toggleMute = () => {
    const centerItem = items[3];

    if (!centerItem) return;

    const centerVideo = videoRefs.current[centerItem.id];

    if (!centerVideo) return;

    const newMutedState = !isMuted;

    centerVideo.muted = newMutedState;

    setIsMuted(newMutedState);

    if (!newMutedState) {
      centerVideo
        .play()
        .catch(() => {
          // Browser may still reject autoplay with audio.
          centerVideo.muted = true;
          setIsMuted(true);
        });
    }
  };

  /*
   * -------------------------------------------------------
   * LOADING
   * -------------------------------------------------------
   */

  if (loading) {
    return (
      <section className="py-24 text-center text-white">
        Loading...
      </section>
    );
  }

  /*
   * -------------------------------------------------------
   * UI
   * -------------------------------------------------------
   */

  return (
    <section
      ref={fadeIn}
      className="
        relative
        flex
        items-center
        justify-center
        overflow-hidden
        py-16
        md:py-24
      "
    >
      {/* Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[600px]
          w-[600px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
         
          blur-[180px]
          md:h-[900px]
          md:w-[900px]
        "
      />

      {/* ------------------------------------------------ */}
      {/* HEADING */}
      {/* ------------------------------------------------ */}

      <div
        className="
          absolute
          left-1/2
          top-10
          z-[100]
          w-full
          -translate-x-1/2
          px-4
          text-center
          md:top-16
        "
      >
        <h2
          ref={textReveal}
          className="
            mb-3
            text-4xl
            font-bold
            text-white
            sm:text-5xl
            md:text-[72px]
          "
        >
          Featured Work
        </h2>

        <p
          ref={textReveal2}
          className="
            mx-auto
            max-w-xl
            text-sm
            text-white/70
            sm:text-base
            md:text-lg
          "
        >
          Explore our latest projects, campaigns, and creative productions.
        </p>
      </div>

      {/* ------------------------------------------------ */}
      {/* CAROUSEL */}
      {/* ------------------------------------------------ */}

      <div
        className="
          fade-card
          relative
          mt-20
          h-[420px]
          w-full
          perspective-[2500px]
          sm:h-[520px]
          md:mt-20
          md:h-[650px]
          lg:h-[700px]
        "
      >
        {items.map((item, index) => {
          const slot = slots[index];

          if (!slot) return null;

          const isCenter = index === 3;

          return (
            <motion.div
              key={item.id}
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
                  relative
                  h-[300px]
                  w-[170px]
                  overflow-hidden
                  rounded-[24px]
                  bg-black
                  shadow-2xl
                  sm:h-[400px]
                  sm:w-[220px]
                  sm:rounded-[28px]
                  md:h-[520px]
                  md:w-[280px]
                  md:rounded-[32px]
                "
              >
                <video
                  ref={(el) => {
                    if (el) {
                      videoRefs.current[item.id] = el;
                    } else {
                      delete videoRefs.current[item.id];
                    }
                  }}
                  src={item.src}
                  muted={!isCenter ? true : isMuted}
                  loop
                  playsInline
                  preload="auto"
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />

                {/* ------------------------------------------------ */}
                {/* SIDE VIDEO DARK OVERLAY */}
                {/* ------------------------------------------------ */}

                {!isCenter && (
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-black/20
                    "
                  />
                )}

                {/* ------------------------------------------------ */}
                {/* CENTER VIDEO GRADIENT */}
                {/* ------------------------------------------------ */}

                {isCenter && (
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/20
                      via-transparent
                      to-transparent
                    "
                  />
                )}

                {/* ------------------------------------------------ */}
                {/* MUTE / UNMUTE */}
                {/* ------------------------------------------------ */}

                {isCenter && (
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={
                      isMuted
                        ? "Unmute video"
                        : "Mute video"
                    }
                    className="
                      absolute
                      bottom-4
                      right-4
                      z-20
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/20
                      bg-black/50
                      text-white
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:scale-110
                      hover:bg-black/70
                      sm:h-12
                      sm:w-12
                    "
                  >
                    {isMuted ? (
                      <VolumeX
                        size={20}
                        strokeWidth={2}
                      />
                    ) : (
                      <Volume2
                        size={20}
                        strokeWidth={2}
                      />
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ------------------------------------------------ */}
      {/* PREVIOUS */}
      {/* ------------------------------------------------ */}

      <button
        type="button"
        onClick={prev}
        aria-label="Previous video"
        className="
          absolute
          left-3
          top-1/2
          z-[100]
          mt-16
          flex
          h-11
          w-11
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/20
          bg-white/10
          text-white
          backdrop-blur-lg
          transition-all
          duration-300
          hover:scale-110
          hover:bg-white/20
          sm:left-5
          sm:h-12
          sm:w-12
          md:left-8
          md:mt-0
          md:h-14
          md:w-14
        "
      >
        <ChevronLeft
          size={22}
          className="sm:h-6 sm:w-6"
        />
      </button>

      {/* ------------------------------------------------ */}
      {/* NEXT */}
      {/* ------------------------------------------------ */}

      <button
        type="button"
        onClick={next}
        aria-label="Next video"
        className="
          absolute
          right-3
          top-1/2
          z-[100]
          mt-16
          flex
          h-11
          w-11
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/20
          bg-white/10
          text-white
          backdrop-blur-lg
          transition-all
          duration-300
          hover:scale-110
          hover:bg-white/20
          sm:right-5
          sm:h-12
          sm:w-12
          md:right-8
          md:mt-0
          md:h-14
          md:w-14
        "
      >
        <ChevronRight
          size={22}
          className="sm:h-6 sm:w-6"
        />
      </button>
    </section>
  );
}
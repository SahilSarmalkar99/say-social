
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import useTextReveal from "../../hooks/useTextReveal";
import useFadeUpCards from "../../hooks/useFadeIn";
import { useState, useRef, useEffect } from "react";
import HomeAPI from "../../api/home.api";

export default function VideoCoverflow() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

  const videoRefs = useRef({});
  const modalVideoRef = useRef(null);
  const closeButtonRef = useRef(null);

  const textReveal = useTextReveal();
  const textReveal2 = useTextReveal();
  const fadeIn = useFadeUpCards();

  // Fetch featured videos.
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

  // Carousel positions.
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

  // Keep only visible carousel videos playing.
  // Pause every carousel preview while the fullscreen player is open.
  useEffect(() => {
    if (!items.length) return;

    if (activeVideo) {
      Object.values(videoRefs.current).forEach((video) => {
        if (video) {
          video.pause();
          video.muted = true;
        }
      });

      return;
    }

    const timer = setTimeout(() => {
      items.forEach((item, index) => {
        const video = videoRefs.current[item.id];

        if (!video) return;

        const isVisible =
          index === 2 || index === 3 || index === 4;

        if (isVisible) {
          // All carousel previews are muted.
          video.muted = true;

          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
          video.muted = true;
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [items, activeVideo]);

  // Open any visible video in fullscreen.
  const openVideo = (item) => {
    setActiveVideo(item);
  };

  // Close the fullscreen player.
  const closeVideo = () => {
    const video = modalVideoRef.current;

    if (video) {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
    }

    setActiveVideo(null);
  };

  // Fullscreen player setup and keyboard support.
  useEffect(() => {
    if (!activeVideo) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const video = modalVideoRef.current;

    if (video) {
      video.currentTime = 0;
      video.muted = false;
      video.volume = 1;

      video.play().catch((error) => {
        // Browsers can block autoplay when audio is enabled.
        console.warn("Audible autoplay was blocked:", error);
      });
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeVideo();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo]);

  // Rotate carousel forward.
  const next = () => {
    setItems((prev) => {
      if (prev.length <= 1) return prev;

      const arr = [...prev];
      const last = arr.pop();

      return [last, ...arr];
    });
  };

  // Rotate carousel backward.
  const prev = () => {
    setItems((prev) => {
      if (prev.length <= 1) return prev;

      const arr = [...prev];
      const first = arr.shift();

      return [...arr, first];
    });
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeVideo();
    }
  };

  if (loading) {
    return (
      <section className="py-24 text-center text-white">
        Loading...
      </section>
    );
  }

  return (
    <>
      <section
        ref={fadeIn}
        className="
          relative flex items-center justify-center
          overflow-hidden py-16 md:py-24
        "
      >
        {/* Background Glow */}
        <div
          className="
            pointer-events-none absolute left-1/2 top-1/2
            h-[600px] w-[600px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full blur-[180px]
            md:h-[900px] md:w-[900px]
          "
        />

        {/* Heading */}
        <div
          className="
            absolute left-1/2 top-10 z-[100]
            w-full -translate-x-1/2 px-4
            text-center md:top-16
          "
        >
          <h2
            ref={textReveal}
            className="
              mb-3 text-4xl font-bold text-white
              sm:text-5xl md:text-[72px]
            "
          >
            Featured Work
          </h2>

          <p
            ref={textReveal2}
            className="
              mx-auto max-w-xl text-sm text-white/70
              sm:text-base md:text-lg
            "
          >
            Explore our latest projects, campaigns, and creative productions.
          </p>
        </div>

        {/* 3D Carousel */}
        <div
          className="
            fade-card relative mt-20 h-[420px] w-full
            perspective-[2500px]
            sm:h-[520px] md:mt-20 md:h-[650px] lg:h-[700px]
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
                style={{ zIndex: slot.zIndex }}
                className="
                  absolute left-1/2 top-1/2
                  -translate-x-1/2 -translate-y-1/2
                "
              >
                <div
                  role="button"
                  tabIndex={slot.opacity > 0 ? 0 : -1}
                  aria-label={`Open featured video ${item.id} fullscreen`}
                  onClick={() => openVideo(item)}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" ||
                      event.key === " "
                    ) {
                      event.preventDefault();
                      openVideo(item);
                    }
                  }}
                  className={`
                    relative h-[300px] w-[170px]
                    overflow-hidden rounded-[24px]
                    bg-black shadow-2xl
                    cursor-pointer
                    focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-white
                    sm:h-[400px] sm:w-[220px] sm:rounded-[28px]
                    md:h-[520px] md:w-[280px] md:rounded-[32px]
                    ${isCenter ? "ring-1 ring-white/10" : ""}
                  `}
                >
                  {/* Carousel Video Preview */}
                  <video
                    ref={(el) => {
                      if (el) {
                        videoRefs.current[item.id] = el;
                      } else {
                        delete videoRefs.current[item.id];
                      }
                    }}
                    src={item.src}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="
                      h-full w-full object-cover
                      transition-transform duration-700
                      hover:scale-105
                    "
                  />

                  {/* Side Video Overlay */}
                  {!isCenter && (
                    <div
                      className="
                        pointer-events-none absolute inset-0
                        bg-black/20 transition-colors duration-300
                        hover:bg-black/10
                      "
                    />
                  )}

                  {/* Center Video Gradient */}
                  {isCenter && (
                    <div
                      className="
                        pointer-events-none absolute inset-0
                        bg-gradient-to-t from-black/30
                        via-transparent to-transparent
                      "
                    />
                  )}

                  {/* Click-to-Open Indicator */}
                  <div
                    className="
                      pointer-events-none absolute inset-0
                      flex items-center justify-center
                      opacity-0 transition-opacity duration-300
                      hover:opacity-100
                    "
                  >
                    <div
                      className="
                        flex h-14 w-14 items-center justify-center
                        rounded-full border border-white/30
                        bg-black/40 text-white backdrop-blur-xl
                      "
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polygon points="8 5 19 12 8 19 8 5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Previous */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous video"
          className="
            absolute left-3 top-1/2 z-[100] mt-16
            flex h-11 w-11 -translate-y-1/2
            items-center justify-center rounded-full
            border border-white/20 bg-white/10 text-white
            backdrop-blur-lg transition-all duration-300
            hover:scale-110 hover:bg-white/20
            sm:left-5 sm:h-12 sm:w-12
            md:left-8 md:mt-0 md:h-14 md:w-14
          "
        >
          <ChevronLeft size={22} className="sm:h-6 sm:w-6" />
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={next}
          aria-label="Next video"
          className="
            absolute right-3 top-1/2 z-[100] mt-16
            flex h-11 w-11 -translate-y-1/2
            items-center justify-center rounded-full
            border border-white/20 bg-white/10 text-white
            backdrop-blur-lg transition-all duration-300
            hover:scale-110 hover:bg-white/20
            sm:right-5 sm:h-12 sm:w-12
            md:right-8 md:mt-0 md:h-14 md:w-14
          "
        >
          <ChevronRight size={22} className="sm:h-6 sm:w-6" />
        </button>
      </section>

      {/* Fullscreen Video Player */}
      {activeVideo && (
        <div
          className="
            fixed inset-0 z-[9999]
            flex items-center justify-center
            bg-black/95 p-3 backdrop-blur-xl
            animate-lightbox-in
            sm:p-6 md:p-10
          "
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen featured video"
        >
          {/* Close Button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeVideo}
            aria-label="Close video"
            className="
              absolute right-4 top-4 z-[10001]
              flex h-12 w-12 items-center justify-center
              rounded-full border border-white/20
              bg-black/50 text-white backdrop-blur-xl
              transition-all duration-300
              hover:rotate-90 hover:scale-110
              hover:bg-white hover:text-black
              focus:outline-none focus:ring-2 focus:ring-white
              md:right-7 md:top-7
            "
          >
            <X size={25} strokeWidth={1.8} />
          </button>

          {/* Video */}
          <div
            className="
              flex h-full w-full items-center justify-center
              animate-lightbox-content
            "
          >
            <video
              key={activeVideo.id}
              ref={modalVideoRef}
              src={activeVideo.src}
              autoPlay
              controls
              playsInline
              preload="auto"
              className="
                h-auto max-h-full w-auto max-w-full
                rounded-lg object-contain
                shadow-[0_0_100px_rgba(255,255,255,0.08)]
              "
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Fullscreen Animations */}
      <style>{`
        @keyframes lightboxIn {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(20px);
          }
        }

        @keyframes lightboxContent {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-lightbox-in {
          animation: lightboxIn 350ms ease-out both;
        }

        .animate-lightbox-content {
          animation: lightboxContent 450ms
            cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-lightbox-in,
          .animate-lightbox-content {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

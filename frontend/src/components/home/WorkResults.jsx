
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import useTextReveal from "../../hooks/useTextReveal";
import useFadeUpCards from "../../hooks/useFadeIn";
import HomeAPI from "../../api/home.api";
import { Link } from "react-router-dom";

const filterOrder = [
  "Production",
  "Graphics",
  "Case Study",
  "Website",
];

export default function WorkResults() {
  const [workCategories, setWorkCategories] = useState([]);
  const [active, setActive] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

  const textReveal = useTextReveal();
  const fadeIn = useFadeUpCards();

  const modalVideoRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const res = await HomeAPI.getAll();

        const workSection = res.data.find(
          (item) => item.section === "work"
        );

        const categories = workSection?.workCategories || [];

        setWorkCategories(categories);

        const firstCategory = filterOrder.find((filter) =>
          categories.some(
            (group) => group.category?.name === filter
          )
        );

        if (firstCategory) {
          setActive(firstCategory);
        }
      } catch (err) {
        console.error("Failed to load work:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWork();
  }, []);

  // Automatically play the selected video with sound.
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
        // Browsers may block audible autoplay.
        // The user can start playback using the video controls.
        console.warn("Video autoplay was blocked:", error);
      });
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeVideo();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo]);

  const filters = filterOrder.filter((filter) =>
    workCategories.some(
      (group) => group.category?.name === filter
    )
  );

  const activeCategory =
    workCategories.find(
      (group) => group.category?.name === active
    ) || { videos: [] };

  const largeCards = activeCategory.videos.slice(0, 2);
  const smallCards = activeCategory.videos.slice(2);

  const getVideoId = (card, index) =>
    `${active}-${card.url}-${index}`;

  const handleVideoClick = (card, videoId) => {
    setActiveVideo({ card, videoId });
  };

  const closeVideo = () => {
    const video = modalVideoRef.current;

    if (video) {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
    }

    setActiveVideo(null);
  };

  // Close the modal when the user clicks the dark backdrop.
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
        className="py-15 md:py-24 px-5 text-white"
      >
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h2
            ref={textReveal}
            className="text-center text-3xl md:text-[72px] font-light mb-12"
          >
            Work That Delivers Results
          </h2>

          {/* Category Filters */}
          <div className="fade-card flex justify-center flex-wrap gap-3 md:gap-4 mb-14">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActive(filter)}
                className={`
                  relative px-5 md:px-8 py-2.5 md:py-3
                  rounded-full text-sm md:text-base border
                  transition-all duration-300 hover:scale-105
                  ${
                    active === filter
                      ? "bg-white text-black border-white shadow-lg"
                      : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                  }
                `}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Large Video Cards */}
          <div className="fade-card grid md:grid-cols-2 gap-6 mb-6">
            {largeCards.map((card, index) => {
              const videoId = getVideoId(card, index);

              return (
                <Card
                  key={videoId}
                  card={card}
                  large
                  onVideoClick={() =>
                    handleVideoClick(card, videoId)
                  }
                />
              );
            })}
          </div>

          {/* Small Video Cards */}
          <div className="fade-card grid grid-cols-2 md:grid-cols-4 gap-6">
            {smallCards.map((card, index) => {
              const videoId = getVideoId(card, index + 2);

              return (
                <Card
                  key={videoId}
                  card={card}
                  onVideoClick={() =>
                    handleVideoClick(card, videoId)
                  }
                />
              );
            })}
          </div>

          {/* View All */}
          <div className="fade-card flex justify-center mt-12">
            <Link to="/work">
              <button className="group flex items-center gap-3 px-8 md:px-10 py-3 md:py-4 rounded-full bg-white text-black font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]">
                View all our work
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Full-Screen Video Player */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/95 backdrop-blur-xl animate-lightbox-in"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Full-screen video player"
        >
          {/* Close Button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeVideo}
            aria-label="Close video"
            className="absolute top-4 right-4 md:top-7 md:right-7 z-[10001] flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-xl transition-all duration-300 hover:rotate-90 hover:scale-110 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white"
          >
            <X size={25} strokeWidth={1.8} />
          </button>

          {/* Video Information */}
          <div className="absolute top-5 left-5 md:top-8 md:left-8 z-[10000] pointer-events-none max-w-[65%] animate-lightbox-content">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/50 mb-2">
              {activeVideo.card.category?.name || active}
            </p>

            <h3 className="text-lg md:text-2xl font-medium text-white">
              {activeVideo.card.subCategory?.name || "Our Work"}
            </h3>
          </div>

          {/* Main Video */}
          <div className="relative w-full h-full flex items-center justify-center animate-lightbox-content">
            <video
              key={activeVideo.videoId}
              ref={modalVideoRef}
              src={activeVideo.card.url}
              autoPlay
              controls
              playsInline
              preload="auto"
              className="max-w-full max-h-full w-auto h-auto rounded-lg object-contain shadow-[0_0_100px_rgba(255,255,255,0.08)]"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Lightbox Animations */}
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
          animation: lightboxContent 450ms cubic-bezier(0.16, 1, 0.3, 1) both;
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

function Card({ card, large = false, onVideoClick }) {
  const videoRef = useRef(null);

  // Keep card previews muted and looping.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const playPreview = () => {
      video.play().catch(() => {
        // Preview autoplay may be restricted by the browser.
      });
    };

    playPreview();

    return () => {
      video.pause();
    };
  }, [card.url]);

  return (
    <button
      type="button"
      onClick={onVideoClick}
      aria-label={`Play ${card.subCategory?.name || "work"} video`}
      className={`
        relative block w-full overflow-hidden rounded-3xl
        group cursor-pointer bg-black text-left
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white
        ${large ? "aspect-video" : "aspect-[9/16]"}
      `}
    >
      {/* Silent Background Preview */}
      <video
        ref={videoRef}
        src={card.url}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="
          absolute inset-0 w-full h-full object-contain
          transition-transform duration-700
          group-hover:scale-105
        "
      />

      {/* Hover Gradient */}
      <div
        className="
          absolute inset-0 bg-gradient-to-t
          from-black/70 via-black/20 to-transparent
          opacity-0 transition-opacity duration-500
          group-hover:opacity-100 pointer-events-none
        "
      />

      {/* Play Indicator — visual only */}
      <div
        className="
          absolute top-4 right-4 z-10
          h-11 w-11 rounded-full
          backdrop-blur-xl bg-black/50 border border-white/20
          flex items-center justify-center
          opacity-0 scale-90
          transition-all duration-300
          group-hover:opacity-100 group-hover:scale-100
          pointer-events-none
        "
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="8 5 19 12 8 19 8 5" />
        </svg>
      </div>

      {/* Card Information */}
      <div
        className="
          absolute left-4 right-4 bottom-4
          rounded-2xl px-4 md:px-5 py-3 md:py-4
          backdrop-blur-xl bg-[#453050]/70
          opacity-0 translate-y-6
          transition-all duration-500
          group-hover:opacity-100 group-hover:translate-y-0
          pointer-events-none
        "
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base md:text-lg font-semibold text-white truncate">
              {card.subCategory?.name}
            </h3>

            <p className="text-sm text-white/70">
              {card.category?.name}
            </p>
          </div>

          <div
            className="
              shrink-0 h-10 w-10 md:h-11 md:w-11 rounded-full
              bg-white text-black flex items-center justify-center
              transition-all duration-300
              group-hover:rotate-12 group-hover:scale-110
            "
          >
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
    </button>
  );
}

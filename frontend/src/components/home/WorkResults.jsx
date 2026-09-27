import { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useEffect as useReactEffect } from "react";
import useTextReveal from "../../hooks/useTextReveal";
import useFadeUpCards from "../../hooks/useFadeIn";
import HomeAPI from "../../api/home.api";

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

  // Stores the currently active video
  const [activeVideo, setActiveVideo] = useState(null);

  const textReveal = useTextReveal();
  const fadeIn = useFadeUpCards();

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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWork();
  }, []);

  /*
   * Stop audio when clicking outside the active card
   */
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        activeVideo &&
        !event.target.closest("[data-video-card]")
      ) {
        setActiveVideo(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [activeVideo]);

  /*
   * Stop audio when changing category
   */
  useEffect(() => {
    setActiveVideo(null);
  }, [active]);

  const filters = filterOrder.filter((filter) =>
    workCategories.some(
      (group) => group.category?.name === filter
    )
  );

  const activeCategory =
    workCategories.find(
      (group) => group.category?.name === active
    ) || {
      videos: [],
    };

  const largeCards = activeCategory.videos.slice(0, 2);
  const smallCards = activeCategory.videos.slice(2);

  /*
   * Generate a unique ID for each video
   */
  const getVideoId = (card, index) => {
    return `${active}-${card.url}-${index}`;
  };

  /*
   * Handle video click
   */
  const handleVideoClick = (videoId) => {
    setActiveVideo((current) =>
      current === videoId ? null : videoId
    );
  };

  if (loading) {
    return (
      <section className="py-24 text-center text-white">
        Loading...
      </section>
    );
  }

  return (
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

        {/* Filters */}
        <div className="fade-card flex justify-center flex-wrap gap-3 md:gap-4 mb-14">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`
                relative
                px-5 md:px-8
                py-2.5 md:py-3
                rounded-full
                text-sm md:text-base
                border
                transition-all
                duration-300
                hover:scale-105

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

        {/* Large Cards */}
        <div className="fade-card grid md:grid-cols-2 gap-6 mb-6">
          {largeCards.map((card, index) => {
            const videoId = getVideoId(card, index);

            return (
              <Card
                key={videoId}
                card={card}
                large
                videoId={videoId}
                isActive={activeVideo === videoId}
                onVideoClick={handleVideoClick}
              />
            );
          })}
        </div>

        {/* Small Cards */}
        <div className="fade-card grid grid-cols-2 md:grid-cols-4 gap-6">
          {smallCards.map((card, index) => {
            const videoId = getVideoId(card, index + 2);

            return (
              <Card
                key={videoId}
                card={card}
                videoId={videoId}
                isActive={activeVideo === videoId}
                onVideoClick={handleVideoClick}
              />
            );
          })}
        </div>

        {/* View All */}
        <div className="fade-card flex justify-center mt-12">
          <button className="group flex items-center gap-3 px-8 md:px-10 py-3 md:py-4 rounded-full bg-white text-black font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]">
            View all our work

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

function Card({
  card,
  large = false,
  videoId,
  isActive,
  onVideoClick,
}) {
  const videoRef = useRef(null);

  /*
   * Whenever active state changes,
   * update the video's muted property.
   */
  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isActive;

    /*
     * Make sure video keeps playing
     * after switching audio.
     */
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }
  }, [isActive]);

  /*
   * Clicking the card controls audio.
   */
  const handleClick = (event) => {
    event.stopPropagation();
    onVideoClick(videoId);
  };

  return (
    <div
      data-video-card
      onClick={handleClick}
      className={`
        relative
        overflow-hidden
        rounded-3xl
        group
        cursor-pointer
        bg-black

        ${large ? "aspect-video" : "aspect-[9/16]"}

        ${
          isActive
            ? "ring-1 ring-white/30"
            : ""
        }
      `}
    >
      <video
        ref={videoRef}
        src={card.url}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="
          w-full
          h-full
          object-contain
          transition-transform
          duration-700
          group-hover:scale-105
        "
      />

      {/* Gradient */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/70
          via-black/20
          to-transparent
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
          pointer-events-none
        "
      />

      {/* Audio indicator */}
      <div
        className={`
          absolute
          top-4
          right-4
          z-10
          h-10
          w-10
          rounded-full
          backdrop-blur-xl
          bg-black/50
          border
          border-white/10
          flex
          items-center
          justify-center
          transition-all
          duration-300
          pointer-events-none

          ${
            isActive
              ? "opacity-100 scale-100"
              : "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
          }
        `}
      >
        {isActive ? (
          <div className="flex items-end gap-[2px] h-4">
            <span className="w-[2px] h-2 bg-white rounded-full animate-pulse" />
            <span className="w-[2px] h-4 bg-white rounded-full animate-pulse [animation-delay:100ms]" />
            <span className="w-[2px] h-3 bg-white rounded-full animate-pulse [animation-delay:200ms]" />
          </div>
        ) : (
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </div>

      {/* Information */}
      <div
        className="
          absolute
          left-4
          right-4
          bottom-4
          rounded-2xl
          px-5
          py-4
          backdrop-blur-xl
          bg-[#453050]/70
          opacity-0
          translate-y-6
          transition-all
          duration-500
          group-hover:opacity-100
          group-hover:translate-y-0
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {card.subCategory?.name}
            </h3>

            <p className="text-sm text-white/70">
              {card.category?.name}
            </p>
          </div>

          <div
            className="
              h-11
              w-11
              rounded-full
              bg-white
              text-black
              flex
              items-center
              justify-center
              transition-all
              duration-300
              group-hover:rotate-12
              group-hover:scale-110
            "
          >
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
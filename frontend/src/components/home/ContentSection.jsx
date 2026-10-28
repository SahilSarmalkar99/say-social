
import { ArrowUpRight, X } from "lucide-react";
import useTextReveal from "../../hooks/useTextReveal";
import useFadeUpCards from "../../hooks/useFadeIn";
import { useEffect, useRef, useState } from "react";
import HomeAPI from "../../api/home.api";

export default function ContentSection() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

  const textReveal = useTextReveal();
  const fadeIn = useFadeUpCards();
  const modalVideoRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Fetch content from the existing API.
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await HomeAPI.getAll();

        const section = res.data.find(
          (item) => item.section === "content-creating"
        );

        setVideos(section?.videos || []);
      } catch (err) {
        console.error("Failed to load content videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Full-screen player: autoplay with sound and lock background scrolling.
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
        // Browsers may block autoplay when sound is enabled.
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

  // Open the selected video.
  const handleVideoClick = (item, videoId) => {
    setActiveVideo({ item, videoId });
  };

  // Stop playback and close the overlay.
  const closeVideo = () => {
    const video = modalVideoRef.current;

    if (video) {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
    }

    setActiveVideo(null);
  };

  // Close when clicking the backdrop, not the video itself.
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeVideo();
    }
  };

  const topRow = videos.slice(0, 4);
  const bottomRow = videos.slice(4, 8);

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
        className="py-15 md:py-24 px-4 text-white"
      >
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h2
            ref={textReveal}
            className="
              text-center text-2xl md:text-4xl lg:text-[72px]
              mb-16 uppercase leading-tight
            "
          >
            Creating Content That Feels Real,
            <br className="hidden md:block" />
            Relatable And Impactful.
          </h2>

          {/* Top Row */}
          <div
            className="
              fade-card w-full grid grid-cols-2 lg:grid-cols-4
              gap-4 md:gap-6 mb-6
            "
          >
            {topRow.map((item, index) => {
              const videoId = `top-${index}-${item.url}`;

              return (
                <ContentCard
                  key={videoId}
                  video={item.url}
                  brandName={item.company?.name}
                  brandLogo={item.logoUrl}
                  onVideoClick={() =>
                    handleVideoClick(item, videoId)
                  }
                />
              );
            })}
          </div>

          {/* Bottom Row */}
          {bottomRow.length > 0 && (
            <div
              className="
                fade-card w-full grid grid-cols-2 lg:grid-cols-4
                gap-4 md:gap-6
              "
            >
              {bottomRow.map((item, index) => {
                const videoId = `bottom-${index}-${item.url}`;

                return (
                  <ContentCard
                    key={videoId}
                    video={item.url}
                    brandName={item.company?.name}
                    brandLogo={item.logoUrl}
                    onVideoClick={() =>
                      handleVideoClick(item, videoId)
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Full-Screen Video Lightbox */}
      {activeVideo && (
        <div
          className="
            fixed inset-0 z-[9999]
            flex items-center justify-center
            p-3 sm:p-6 md:p-10
            bg-black/95 backdrop-blur-xl
            animate-lightbox-in
          "
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Full-screen content video"
        >
          {/* Close Button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeVideo}
            aria-label="Close video"
            className="
              absolute top-4 right-4 md:top-7 md:right-7
              z-[10001] flex h-12 w-12 items-center
              justify-center rounded-full
              border border-white/20 bg-black/50
              text-white backdrop-blur-xl
              transition-all duration-300
              hover:rotate-90 hover:scale-110
              hover:bg-white hover:text-black
              focus:outline-none focus:ring-2 focus:ring-white
            "
          >
            <X size={25} strokeWidth={1.8} />
          </button>

          {/* Brand Information */}
          <div
            className="
              absolute top-5 left-5 md:top-8 md:left-8
              z-[10000] max-w-[65%]
              pointer-events-none animate-lightbox-content
            "
          >
            {activeVideo.item.company?.name && (
              <p
                className="
                  text-xs md:text-sm uppercase
                  tracking-[0.25em] text-white/60
                "
              >
                {activeVideo.item.company.name}
              </p>
            )}
          </div>

          {/* Selected Video */}
          <div
            className="
              relative w-full h-full
              flex items-center justify-center
              animate-lightbox-content
            "
          >
            <video
              key={activeVideo.videoId}
              ref={modalVideoRef}
              src={activeVideo.item.url}
              autoPlay
              controls
              playsInline
              preload="auto"
              className="
                max-w-full max-h-full
                w-auto h-auto object-contain
                rounded-lg
                shadow-[0_0_100px_rgba(255,255,255,0.08)]
              "
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

function ContentCard({
  video,
  brandName,
  brandLogo,
  onVideoClick,
}) {
  const videoRef = useRef(null);

  const hasLogo =
    typeof brandLogo === "string" && brandLogo.trim() !== "";

  const hasName =
    typeof brandName === "string" && brandName.trim() !== "";

  // Card previews always remain muted.
  useEffect(() => {
    const preview = videoRef.current;
    if (!preview) return;

    preview.muted = true;

    preview.play().catch(() => {
      // Browser autoplay restrictions may prevent preview playback.
    });

    return () => {
      preview.pause();
    };
  }, [video]);

  return (
    <button
      type="button"
      onClick={onVideoClick}
      aria-label={`Play ${brandName || "content"} video`}
      className="
        fade-card relative overflow-hidden rounded-[28px]
        group cursor-pointer w-full text-left bg-black
        h-[280px] sm:h-[320px] md:h-[380px] lg:h-[450px]
        transition-transform duration-500 ease-out
        focus:outline-none focus-visible:ring-2
        focus-visible:ring-white
      "
    >
      {/* Silent Preview */}
      <video
        ref={videoRef}
        src={video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="
          absolute inset-0 w-full h-full object-cover
          transition-transform duration-700 ease-out
          group-hover:scale-110
        "
      />

      {/* Gradient */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t from-black/60 via-black/10 to-transparent
          pointer-events-none
        "
      />

      {/* Play Indicator: visual only */}
      <div
        className="
          absolute top-4 right-4 z-10
          h-11 w-11 rounded-full
          border border-white/20 bg-black/40 backdrop-blur-xl
          flex items-center justify-center
          opacity-0 scale-90
          transition-all duration-300
          group-hover:opacity-100 group-hover:scale-100
          pointer-events-none
        "
      >
        <svg
          width="18"
          height="18"
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

      {/* Glass Brand Label */}
      {(hasLogo || hasName) && (
        <div
          className="
            absolute left-3 right-3 bottom-3
            sm:left-4 sm:right-4 sm:bottom-4
            flex items-center justify-between gap-3
            px-4 py-3 sm:px-5 sm:py-4
            rounded-2xl border border-white/10
            bg-[#4530508C] backdrop-blur-xl
            opacity-0 translate-y-6
            transition-all duration-500 ease-out
            group-hover:opacity-100 group-hover:translate-y-0
            pointer-events-none
          "
        >
          {/* Brand Logo or Name */}
          <div
            className="
              flex items-center justify-center
              min-w-0 flex-1
            "
          >
            {hasLogo ? (
              <img
                src={brandLogo}
                alt={brandName || "Brand logo"}
                className="
                  max-w-[110px] sm:max-w-[140px]
                  md:max-w-[160px] lg:max-w-[170px]
                  max-h-[35px] sm:max-h-[40px]
                  md:max-h-[45px] lg:max-h-[50px]
                  w-auto h-auto object-contain mx-auto
                "
              />
            ) : (
              <span
                className="
                  font-semibold text-sm sm:text-base
                  md:text-lg lg:text-xl text-white
                  text-center truncate
                "
              >
                {brandName}
              </span>
            )}
          </div>

          {/* Arrow */}
          <div
            className="
              h-8 w-8 sm:h-9 sm:w-9 rounded-full
              bg-white text-black
              flex items-center justify-center
              scale-75 transition-all duration-300
              group-hover:scale-100 group-hover:rotate-45
              shrink-0
            "
          >
            <ArrowUpRight size={18} />
          </div>
        </div>
      )}
    </button>
  );
}

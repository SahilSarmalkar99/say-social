
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import PortfolioAPI from "../../api/portfolio.api";

import CategoryTabs from "./CategoryTabs";
import SubCategoryTabs from "./SubCategoryTabs";
import WorkGrid from "./WorkGrid";

export default function WorkShowcase() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const [category, setCategory] = useState({
    _id: "all",
    name: "All",
  });

  const [subCategory, setSubCategory] = useState({
    _id: "all",
    name: "All",
  });

  // Currently open fullscreen video.
  const [activeVideo, setActiveVideo] = useState(null);

  // References to the videos rendered inside WorkGrid.
  const videoRefs = useRef({});
  const modalVideoRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    loadPortfolio();
  }, []);

  async function loadPortfolio() {
    try {
      setLoading(true);

      const res = await PortfolioAPI.getAll();
      setItems(res.data.data || []);
    } catch (err) {
      console.error("Failed to load portfolio:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  // Register video elements from WorkGrid.
  const registerVideo = (id, video) => {
    if (video) {
      videoRefs.current[id] = video;
    } else {
      delete videoRefs.current[id];
    }
  };

  // Open the selected video in fullscreen.
  const openVideo = (id) => {
    const item = items.find(
      (entry) => String(entry._id) === String(id)
    );

    if (!item) {
      console.warn("Portfolio item not found:", id);
      return;
    }

    setActiveVideo(item);
  };

  // Stop fullscreen playback and close the overlay.
  const closeVideo = () => {
    const video = modalVideoRef.current;

    if (video) {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
    }

    setActiveVideo(null);
  };

  // Fullscreen player lifecycle, autoplay and Escape key.
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
        // Browsers may block autoplay with audio.
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

  // Mute all card previews while fullscreen is open.
  useEffect(() => {
    Object.values(videoRefs.current).forEach((video) => {
      if (!video) return;

      video.muted = true;
    });
  }, [activeVideo]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeVideo();
    }
  };

  const handleCategoryChange = (cat) => {
    closeVideo();

    setCategory(cat);
    setSubCategory({
      _id: "all",
      name: "All",
    });
  };

  const handleSubCategoryChange = (subCat) => {
    closeVideo();
    setSubCategory(subCat);
  };

  const filteredItems = items.filter((item) => {
    const categoryId =
      typeof item.category === "object"
        ? item.category?._id
        : item.category;

    const subCategoryId =
      typeof item.subCategory === "object"
        ? item.subCategory?._id
        : item.subCategory;

    const categoryMatch =
      category._id === "all" ||
      String(categoryId) === String(category._id);

    const subCategoryMatch =
      subCategory._id === "all" ||
      String(subCategoryId) === String(subCategory._id);

    return categoryMatch && subCategoryMatch;
  });

  return (
    <>
      <section className="w-full overflow-hidden py-20 md:py-28">
        <CategoryTabs
          value={category}
          onChange={handleCategoryChange}
        />

        <SubCategoryTabs
          category={category}
          value={subCategory}
          onChange={handleSubCategoryChange}
        />

        <WorkGrid
          loading={loading}
          items={filteredItems}
          activeVideoId={null}
          onVideoActivate={openVideo}
          onRegisterVideo={registerVideo}
        />
      </section>

      {/* Fullscreen Video Lightbox */}
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
          aria-label="Fullscreen portfolio video"
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

          {/* Optional Portfolio Title */}
          <div
            className="
              pointer-events-none absolute left-5 top-5
              z-[10000] max-w-[65%]
              animate-lightbox-content
              md:left-8 md:top-8
            "
          >
            {activeVideo.title && (
              <h3 className="text-lg font-medium text-white md:text-2xl">
                {activeVideo.title}
              </h3>
            )}

            {activeVideo.category?.name && (
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60">
                {activeVideo.category.name}
              </p>
            )}
          </div>

          {/* Fullscreen Video */}
          <div
            className="
              flex h-full w-full items-center justify-center
              animate-lightbox-content
            "
          >
            <video
              key={activeVideo._id}
              ref={modalVideoRef}
              src={activeVideo.url}
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

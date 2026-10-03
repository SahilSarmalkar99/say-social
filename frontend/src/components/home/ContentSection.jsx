import { ArrowUpRight } from "lucide-react";
import useTextReveal from "../../hooks/useTextReveal";
import useFadeUpCards from "../../hooks/useFadeIn";
import { useEffect, useRef, useState } from "react";
import HomeAPI from "../../api/home.api";

export default function ContentSection() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Controls which video currently has audio
  const [activeVideo, setActiveVideo] = useState(null);

  const textReveal = useTextReveal();
  const fadeIn = useFadeUpCards();

  // =========================================
  // FETCH CONTENT
  // =========================================

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await HomeAPI.getAll();

        const section = res.data.find(
          (item) => item.section === "content-creating"
        );

        // console.log(section);

        setVideos(section?.videos || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // =========================================
  // CLOSE ACTIVE VIDEO WHEN CLICKING OUTSIDE
  // =========================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest("[data-content-video]")) {
        setActiveVideo(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // =========================================
  // VIDEO CLICK
  // =========================================

  const handleVideoClick = (videoId) => {
    setActiveVideo((current) =>
      current === videoId ? null : videoId
    );
  };

  // =========================================
  // SPLIT VIDEOS INTO ROWS
  // =========================================

  const topRow = videos.slice(0, 4);
  const bottomRow = videos.slice(4, 8);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <section className="py-24 text-center text-white">
        Loading...
      </section>
    );
  }

  // =========================================
  // MAIN SECTION
  // =========================================

  return (
    <section
      ref={fadeIn}
      className="py-15 md:py-24 px-4 text-white"
    >
      <div className="max-w-7xl mx-auto">

        {/* =====================================
            HEADING
        ====================================== */}

        <h2
          ref={textReveal}
          className="
            text-center
            text-2xl
            md:text-4xl
            lg:text-[72px]
            mb-16
            uppercase
            leading-tight
          "
        >
          Creating Content That Feels Real,
          <br className="hidden md:block" />
          Relatable And Impactful.
        </h2>

        {/* =====================================
            TOP ROW
            Mobile: 2 columns
            Desktop: 4 columns
        ====================================== */}

        <div
          className="
            fade-card
            w-full
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-4
            md:gap-6
            mb-6
          "
        >
          {topRow.map((item, index) => {
            const videoId = `top-${index}-${item.url}`;

            return (
              <ContentCard
                key={item.url || index}
                video={item.url}
                brandName={item.company?.name}
                brandLogo={item.logoUrl}
                videoId={videoId}
                isActive={activeVideo === videoId}
                onVideoClick={handleVideoClick}
              />
            );
          })}
        </div>

        {/* =====================================
            BOTTOM ROW
            Mobile: 2 columns
            Desktop: 4 columns
        ====================================== */}

        {bottomRow.length > 0 && (
          <div
            className="
              fade-card
              w-full
              grid
              grid-cols-2
              lg:grid-cols-4
              gap-4
              md:gap-6
            "
          >
            {bottomRow.map((item, index) => {
              const videoId = `bottom-${index}-${item.url}`;

              return (
                <ContentCard
                  key={item.url || index}
                  video={item.url}
                  brandName={item.company?.name}
                  brandLogo={item.logoUrl}
                  videoId={videoId}
                  isActive={activeVideo === videoId}
                  onVideoClick={handleVideoClick}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================
   CONTENT CARD
========================================= */

function ContentCard({
  video,
  brandName,
  brandLogo,
  videoId,
  isActive,
  onVideoClick,
}) {
  const videoRef = useRef(null);

  // =========================================
  // BRAND DATA
  // =========================================

  const hasLogo =
    brandLogo &&
    typeof brandLogo === "string" &&
    brandLogo.trim() !== "";

  const hasName =
    brandName &&
    typeof brandName === "string" &&
    brandName.trim() !== "";

  // =========================================
  // VIDEO AUDIO CONTROL
  // =========================================

  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isActive;
  }, [isActive]);

  // =========================================
  // CARD CLICK
  // =========================================

  const handleClick = (event) => {
    event.stopPropagation();

    onVideoClick(videoId);
  };

  // =========================================
  // CARD
  // =========================================

  return (
    <div
      data-content-video
      onClick={handleClick}
      className="
        fade-card

        relative
        overflow-hidden
        rounded-[28px]
        group
        cursor-pointer

        w-full

        h-[280px]
        sm:h-[320px]
        md:h-[380px]
        lg:h-[450px]

        transition-transform
        duration-500
        ease-out
      "
    >
      {/* =====================================
          VIDEO
      ====================================== */}

      <video
        ref={videoRef}
        src={video}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="
          absolute
          inset-0

          w-full
          h-full

          object-cover

          transition-transform
          duration-700
          ease-out

          group-hover:scale-110
        "
      />

      {/* =====================================
          GRADIENT
      ====================================== */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-t
          from-black/60
          via-black/10
          to-transparent

          pointer-events-none
        "
      />

      {/* =====================================
          GLASS BRAND LABEL
      ====================================== */}

      {(hasLogo || hasName) && (
        <div
          className="
            absolute

            left-3
            right-3
            bottom-3

            sm:left-4
            sm:right-4
            sm:bottom-4

            flex
            items-center
            justify-between

            gap-3

            px-4
            py-3

            sm:px-5
            sm:py-4

            rounded-2xl

            border
            border-white/10

            bg-[#4530508C]
            backdrop-blur-xl

            opacity-0
            translate-y-6

            transition-all
            duration-500
            ease-out

            group-hover:opacity-100
            group-hover:translate-y-0
          "
        >
          {/* =================================
              BRAND
          ================================== */}

          <div
            className="
              flex
              items-center
              justify-center

              min-w-0
              flex-1
            "
          >
            {hasLogo ? (
              <img
                src={brandLogo}
                alt={brandName || "Brand logo"}
                className="
                  max-w-[110px]
                  sm:max-w-[140px]
                  md:max-w-[160px]
                  lg:max-w-[170px]

                  max-h-[35px]
                  sm:max-h-[40px]
                  md:max-h-[45px]
                  lg:max-h-[50px]

                  w-auto
                  h-auto

                  object-contain
                  mx-auto
                "
              />
            ) : hasName ? (
              <span
                className="
                  font-semibold

                  text-sm
                  sm:text-base
                  md:text-lg
                  lg:text-xl

                  text-white
                  text-center
                  truncate
                "
              >
                {brandName}
              </span>
            ) : null}
          </div>

          {/* =================================
              ARROW
          ================================== */}

          <div
            className="
              h-8
              w-8

              sm:h-9
              sm:w-9

              rounded-full

              bg-white
              text-black

              flex
              items-center
              justify-center

              scale-75

              transition-all
              duration-300

              group-hover:scale-100
              group-hover:rotate-45

              shrink-0
            "
          >
            <ArrowUpRight size={18} />
          </div>
        </div>
      )}
    </div>
  );
}
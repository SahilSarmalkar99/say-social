import { ArrowUpRight } from "lucide-react";
import useTextReveal from "../../hooks/useTextReveal";
import useFadeUpCards from "../../hooks/useFadeIn";
import { useEffect, useState } from "react";
import HomeAPI from "../../api/home.api";

export default function ContentSection() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const textReveal = useTextReveal();
  const fadeIn = useFadeUpCards();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await HomeAPI.getAll();

        const section = res.data.find(
          (item) => item.section === "content-creating",
        );

        console.log(section);

        setVideos(section?.videos || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const topRow = videos.slice(0, 4);
  const bottomRow = videos.slice(4);

  if (loading) {
    return (
      <section className="py-24 text-center text-white">Loading...</section>
    );
  }

  return (
    <section ref={fadeIn} className="py-15 md:py-24 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2
          ref={textReveal}
          className="
            text-center
            text-2xl
            md:text-4xl
            lg:text-[72px]
            mb-16
            uppercase
          "
        >
          Creating Content That Feels Real,
          <br className="hidden md:block" />
          Relatable And Impactful.
        </h2>

        {/* TOP ROW */}
        <div className="fade-card w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 justify-items-center">
          {topRow.slice(0, 4).map((item, index) => (
            <ContentCard
              key={item.url || index}
              video={item.url}
              brandName={item.company?.name}
              brandLogo={item.logoUrl}
            />
          ))}
        </div>

        {/* BOTTOM ROW */}
        <div className="fade-card w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {bottomRow.slice(0, 4).map((item, index) => (
            <ContentCard
              key={item.url || index}
              video={item.url}
              brandName={item.company?.name}
              brandLogo={item.logoUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================
   CONTENT CARD
========================================= */

function ContentCard({ video, brandName, brandLogo }) {
  /*
    Priority:

    1. Logo if available
    2. Name if logo is not available
    3. Nothing if both are unavailable
  */

  const hasLogo =
    brandLogo && typeof brandLogo === "string" && brandLogo.trim() !== "";

  const hasName =
    brandName && typeof brandName === "string" && brandName.trim() !== "";

  return (
    <div
      className="
        fade-card
        relative
        overflow-hidden
        rounded-[28px]
        group

        w-[220px]
        h-[330px]

        md:w-[230px]
        md:h-[340px]

        lg:w-[270px]
        lg:h-[450px]

        cursor-pointer
      "
    >
      {/* =========================
          VIDEO
      ========================== */}
      <video
        src={video}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="
          w-full
          h-full
          object-contain
          transition-transform
          duration-700
          ease-out
          group-hover:scale-110
        "
      />

      {/* =========================
          GRADIENT
      ========================== */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/50
          via-black/10
          to-transparent
        "
      />

      {/* =========================
          GLASS LABEL
      ========================== */}
      {(hasLogo || hasName) && (
        <div
          className="
            absolute
            left-4
            right-4
            bottom-4

            flex
            items-center
            justify-between

            px-5
            py-4

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
          {/* =========================
              BRAND
          ========================== */}
          <div className="flex items-center justify-center min-w-0 w-full">
            {hasLogo ? (
              <img
                src={brandLogo}
                alt={brandName || "Brand logo"}
                className="
        max-w-[170px]
        max-h-[50px]
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
        text-base
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

          {/* =========================
              ARROW
          ========================== */}
          <div
            className="
              h-9
              w-9
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

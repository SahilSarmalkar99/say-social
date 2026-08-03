import useFadeUpCards from "../../hooks/useFadeIn";
import useTextReveal from "../../hooks/useTextReveal";

import { useEffect, useState } from "react";
import HomeAPI from "../../api/home.api";

export default function BrandingSection() {
  const textReveal = useTextReveal();
  const fadeIn = useFadeUpCards();

  const [brandingItems, setBrandingItems] = useState([]);

  useEffect(() => {
    fetchBranding();
  }, []);

  async function fetchBranding() {
    try {
      const data = await HomeAPI.getAll();

      const section = data.data.find(
        (item) => item.section === "design-identities",
      );

      if (section) {
        setBrandingItems(section.videos || []);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section ref={fadeIn} className="py-15 md:py-24 px-4 md:px-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="max-w-7xl mx-auto mb-12 md:mb-16">
          <h2
            ref={textReveal}
            className="
              text-center
              text-3xl
              sm:text-4xl
              md:text-[72px]
              font-light
              leading-tight
            "
          >
            Designing Identities That Leave <br className="hidden sm:block" />A
            Lasting Impression
          </h2>
        </div>

        {/* ================= DESKTOP ================= */}

        <div
          className="fade-card
            hidden
            lg:grid
            grid-cols-[1fr_2.8fr_1fr]
            gap-5
          "
        >
          {/* LEFT */}
          <div className="flex flex-col gap-5">
            <Card image={brandingItems[0]?.url} className="h-[500px]" />

            <Card image={brandingItems[1]?.url} className="h-[300px]" />
          </div>

          {/* CENTER */}
          <div className="flex flex-col gap-5">
            <Card image={brandingItems[2]?.url} className="h-[220px]" />

            <Card image={brandingItems[3]?.url} className="h-[220px]" />

            <Card image={brandingItems[4]?.url} className="h-[360px]" />
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-5">
            <Card image={brandingItems[5]?.url} className="h-[220px]" />

            <Card image={brandingItems[6]?.url} className="h-[220px]" />

            <Card image={brandingItems[7]?.url} className="h-[360px]" />
          </div>
        </div>

        {/* ================= TABLET ================= */}

        <div
          className="
          fade-card
            hidden
            sm:grid
            lg:hidden
            grid-cols-2
            gap-4
          "
        >
          {brandingItems.map((item) => (
            <Card key={item.id} image={item.image} className="aspect-[4/3]" />
          ))}
        </div>

        {/* ================= MOBILE ================= */}

        <div
          className="fade-card
            grid
            sm:hidden
            grid-cols-1
            gap-4
          "
        >
          {brandingItems.map((item) => (
            <Card key={item.id} image={item.image} className="h-[260px]" />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ image, video, className }) {
  return (
    <div
      className={`
        ${className}
        relative
        overflow-hidden
        rounded-[28px]
        lg:rounded-[34px]
        bg-[#18121F]
        border border-white/5
        shadow-[0_10px_40px_rgba(0,0,0,0.35)]
        group
        cursor-pointer
        transition-all
        duration-500
        hover:-translate-y-1.5
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.55)]
      `}
    >
      {video ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
            transition-transform
            duration-700
            group-hover:scale-105
          "
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
            transition-transform
            duration-700
            ease-out
            group-hover:scale-107
          "
        />
      )}

      {/* Soft Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* Shine */}
      <div
        className="
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/10
          to-transparent
          group-hover:translate-x-full
          transition-transform
          duration-[1200ms]
        "
      />

      {/* Soft Border Glow */}
      <div className="absolute inset-0 rounded-[28px] ring-1 ring-white/5 group-hover:ring-white/15 transition duration-500" />
    </div>
  );
}

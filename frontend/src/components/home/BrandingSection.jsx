import useFadeUpCards from "../../hooks/useFadeIn";
import useTextReveal from "../../hooks/useTextReveal";

const brandingItems = [
  {
    id: 1,
    image: "/branding/bag.jpg",
  },
  {
    id: 2,
    image: "/branding/stationary.jpg",
  },
  {
    id: 3,
    image: "/branding/card.jpg",
  },
  {
    id: 4,
    image: "/branding/logo.jpg",
  },
  {
    id: 5,
    image: "/branding/stationary2.jpg",
  },
  {
    id: 6,
    video: "/branding/branding-video.mp4",
  },
  {
    id: 7,
    image: "/branding/mug.jpg",
  },
  {
    id: 8,
    image: "/branding/notebook.jpg",
  },
];

export default function BrandingSection() {

  const textReveal = useTextReveal();
  const fadeIn = useFadeUpCards();
  return (
    <section ref={fadeIn} className="py-15 md:py-24 px-4 md:px-6 text-white">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="max-w-7xl mx-auto mb-12 md:mb-16">
          <h2 ref={textReveal}
            className="
              text-center
              text-3xl
              sm:text-4xl
              md:text-[72px]
              font-light
              leading-tight
            "
          >
            Designing Identities That Leave{" "}
            <br className="hidden sm:block" />
            A Lasting Impression
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
            <Card
              image={brandingItems[0].image}
              className="h-[450px]"
            />

            <Card
  video={brandingItems[5].video}
  className="h-[260px]"
/>
          </div>

          {/* CENTER */}
          <div className="flex flex-col gap-5">
            <Card
              image={brandingItems[1].image}
              className="h-[190px]"
            />

            <Card
              image={brandingItems[3].image}
              className="h-[190px]"
            />

            <Card
              image={brandingItems[6].image}
              className="h-[260px]"
            />
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-5">
            <Card
              image={brandingItems[2].image}
              className="h-[190px]"
            />

            <Card
              image={brandingItems[4].image}
              className="h-[190px]"
            />

            <Card
              image={brandingItems[7].image}
              className="h-[260px]"
            />
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
            <Card
              key={item.id}
              image={item.image}
              className="aspect-[4/3]"
            />
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
            <Card
              key={item.id}
              image={item.image}
              className="h-[260px]"
            />
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
        rounded-[24px]
        md:rounded-[30px]
        bg-white/[0.03]
        border
        border-white/10
        group
        cursor-pointer
      `}
    >
      {video ? (
        <video
          autoPlay
          muted
          loading="lazy"
          loop
          playsInline
          className="
            w-full
            h-full
            object-cover
            transition-all
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
          className="
            w-full
            h-full
            object-cover
            transition-all
            duration-700
            group-hover:scale-110
          "
        />
      )}

      {/* Gradient */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/40
          via-transparent
          to-transparent
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-500
        "
      />

      {/* Shine */}
      <div
        className="
          absolute
          inset-0
          -translate-x-full
          group-hover:translate-x-full
          transition-transform
          duration-1000
          bg-gradient-to-r
          from-transparent
          via-white/10
          to-transparent
        "
      />
    </div>
  );
}
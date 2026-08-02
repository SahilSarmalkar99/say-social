import { ArrowUpRight } from "lucide-react";
import useTextReveal from "../../hooks/useTextReveal";
import useFadeUpCards from "../../hooks/useFadeIn";
import { useEffect, useState } from "react";
import HomeAPI from "../../api/home.api";

// const topRow = [
//   {
//     id: 1,
//     video: "https://res.cloudinary.com/dor2qddak/video/upload/v1782367588/ugc8_nqpxfo.mp4",
//     brand: "Tribalveda",
//   },
//   {
//     id: 2,
//     video: "https://res.cloudinary.com/dor2qddak/video/upload/v1782367591/ugc3_j88exq.mp4",
//     brand: "Sugar.fit",
//   },
//   {
//     id: 3,
//     video: "https://res.cloudinary.com/dor2qddak/video/upload/v1782367583/ugc5_vraq5c.mp4",
//     brand: "Kyari",
//   },
// ];

// const bottomRow = [
//   {
//     id: 4,
//     video: "https://res.cloudinary.com/dor2qddak/video/upload/v1782367610/ugc2_ul13pi.mp4",
//     brand: "Siddhayu",

//   },
//   {
//     id: 5,
//     video: "https://res.cloudinary.com/dor2qddak/video/upload/v1782367592/ugc9_qckw8l.mp4",
//     brand: "FreshCon",
//   },
//   {
//     id: 6,
//     video: "https://res.cloudinary.com/dor2qddak/video/upload/v1782367614/ugc1_g9spbv.mp4",
//     brand: "Blix",
//   },
//   {
//     id: 7,
//     video: "https://res.cloudinary.com/dor2qddak/video/upload/v1782972973/autorecractor_cc_1_1_1_np8uvr.mp4",
//     brand: "Ugaoo",
//   },
// ];

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

        setVideos(section?.videos || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const topRow = videos.slice(0, 3);
  const bottomRow = videos.slice(3);

  if (loading) {
    return (
      <section className="py-24 text-center text-white">Loading...</section>
    );
  }

  return (
    <section ref={fadeIn} className="py-15 md:py-24 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={textReveal}
          className="text-center text-2xl md:text-4xl lg:text-[72px]  mb-16 uppercase"
        >
          Creating Content That Feels Real,
          <br className="hidden md:block" />
          Relatable And Impactful.
        </h2>

        {/* Top Row */}
        <div className="fade-card flex justify-center flex-wrap gap-6 mb-6">
          {topRow.map((item, index) => (
            <ContentCard
              key={item.url || index}
              video={item.url}
              brand={item.company?.name}
            />
          ))}
        </div>

        {/* Bottom Row */}
        <div className="fade-card flex justify-center flex-wrap gap-6">
          {bottomRow.map((item, index) => (
            <ContentCard
              key={item.url || index}
              video={item.url}
              brand={item.company?.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContentCard({ video, brand }) {
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
      {/* Video */}
      <video
        src={video}
        autoPlay
        muted
        loop
        loading="lazy"
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

      {/* Gradient */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-black/50
          via-black/10
          to-transparent
        "
      />

      {/* Glass Label */}
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
          border border-white/10

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
        <span className="font-medium text-sm md:text-base text-white">
          {brand}
        </span>

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
          "
        >
          <ArrowUpRight size={18} />
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { workData } from "../../data/workData";
import useTextReveal from "../../hooks/useTextReveal";
import useFadeUpCards from "../../hooks/useFadeIn";
import HomeAPI from "../../api/home.api";

export default function WorkResults() {
  const [workCategories, setWorkCategories] = useState([]);
  const [active, setActive] = useState("");
  const [workData, setWorkData] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(workCategories);

  const textReveal = useTextReveal();
  const fadeIn = useFadeUpCards();

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const res = await HomeAPI.getAll();
        // console.log(res);
        const workSection = res.data.find(
  (item) => item.section === "work"
);

        const categories = workSection?.workCategories || [];

        setWorkCategories(categories);

        if (categories.length) {
          setActive(categories[0].category?.name);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWork();
  }, []);

  // const items = workData.filter((item) => item.category?.name === active);

  // const largeCards = items.slice(0, 2);
  // const smallCards = items.slice(2);

  // filters
  const filters = workCategories.map((group) => group.category?.name);

  const activeCategory = workCategories.find(
    (group) => group.category?.name === active,
  ) || {
    videos: [],
  };

  const largeCards = activeCategory.videos.slice(0, 2);

  const smallCards = activeCategory.videos.slice(2);



  if (loading) {
    return (
      <section className="py-24 text-center text-white">Loading...</section>
    );
  }

  return (
    <section ref={fadeIn} className="py-15 md:py-24 px-5 text-white">
      <div className="max-w-7xl mx-auto">
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
                relative px-5 md:px-8 py-2.5 md:py-3 rounded-full
                text-sm md:text-base border transition-all duration-300 hover:scale-105
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
          {largeCards.map((card, index) => (
            <Card key={`${card.url}-${index}`} card={card} large />
          ))}
        </div>

        {/* Small Cards */}
        <div className="fade-card grid grid-cols-2 md:grid-cols-4 gap-6">
          {smallCards.map((card, index) => (
            <Card key={`${card.url}-${index}`} card={card} />
          ))}
        </div>

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

function Card({ card, large = false }) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-3xl
        group
        cursor-pointer
        bg-black
        ${large ? "aspect-video" : "aspect-[9/16]"}
      `}
    >
      <video
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

      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-black/70
          via-black/20
          to-transparent
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

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

            <p className="text-sm text-white/70">{card.category?.name}</p>
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

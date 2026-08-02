import { ArrowUpRight } from "lucide-react";
import DashedSeparator from "../DashedSeparator";
import CommonFooter from "../CommonFooter";

export default function ResultsSection() {
  const featuredProjects = [
    {
      image:
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200",
      title: "Beyond Why",
    },
    {
      image:
        "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=1200",
      title: "Pineapple",
    },
  ];

  return (
    <section className="relative text-white overflow-hidden">
      {/* Top Divider */}
      <DashedSeparator />

      <div className="max-w-[1400px] mx-auto px-6 py-24">
        {/* RESULTS */}
        <div className="mb-10">
          <h2 className="text-center font-serif text-4xl md:text-5xl mb-12">
            Results
          </h2>

          <div
            className="
            overflow-hidden
            rounded-[24px]
            border
            border-white/10
            bg-white/[0.03]
          "
          >
            <img
              src="/result-banner.jpg"
              alt=""
              className="
                w-full
                h-[250px]
                sm:h-[400px]
                md:h-[550px]
                object-cover
              "
            />
          </div>
        </div>

        <DashedSeparator />

        {/* OTHER PROJECTS */}
        <div className="mt-10">
          <h2 className="text-center font-serif text-4xl md:text-5xl mb-14">
            Other Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                className="
                relative
                group
                overflow-hidden
                rounded-[20px]
                border
                border-white/10
              "
              >
                <img
                  src={project.image}
                  alt=""
                  className="
                    w-full
                    h-[240px]
                    md:h-[280px]
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-105
                  "
                />

                {/* Overlay Button */}
                <div
                  className="
                  absolute
                  left-1/2
                  -translate-x-1/2
                  bottom-6
                  w-[80%]
                "
                >
                  <button
                    className="  w-full backdrop-blur-xl bg-white/30 border border-white/10 rounded-full py-4 flex items-center justify-center gap-3 hover:bg-white/15 transition"
                  >
                    View Work

                    <span
                      className=" w-8 h-8 rounded-full bg-white text-black flex items-center justify-center
                    "
                    >
                      <ArrowUpRight size={16} />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <CommonFooter />
    </section>
  );
}
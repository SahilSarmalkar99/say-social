import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link to={`/project/${project.slug}`} className="block group">
      <div className="relative overflow-hidden rounded-[24px] md:rounded-[40px] bg-black">
        {/* IMAGE */}
        <div className="h-[320px] sm:h-[450px] md:h-[600px] lg:h-[720px] overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="
              w-full
              h-full
              object-cover
              transition-all
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:scale-105
            "
          />
        </div>

        {/* OVERLAY */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/90
            via-black/30
            to-transparent
            transition-all
            duration-500
            group-hover:from-black/95
          "
        />

        {/* CONTENT */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-8">
          <div
            className="
              backdrop-blur-xl
              bg-black/20
              border
              border-white/10
              rounded-[20px]
              md:rounded-[30px]
              p-5
              md:p-8
              transition-all
              duration-500
              group-hover:bg-black/40
            "
          >
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              {/* LEFT */}
              <div
                className="
                  transition-all
                  duration-500
                  group-hover:-translate-y-1
                "
              >
                <h2
                  className="
                    text-white
                    font-bold
                    leading-none
                    text-2xl
                    sm:text-3xl
                    md:text-5xl
                    lg:text-6xl
                  "
                >
                  {project.title}
                </h2>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-4 py-2 rounded-full border border-white/30 text-white">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* DESKTOP BUTTON */}
              <div
                className="
                  hidden md:flex
                  items-center
                  gap-3
                  bg-white
                  text-black
                  rounded-full
                  px-8
                  py-4
                  font-semibold
                  whitespace-nowrap
                  transition-all
                  duration-500
                  opacity-0
                  translate-x-10
                  group-hover:opacity-100
                  group-hover:translate-x-0
                "
              >
                View Project
                <ArrowUpRight size={22} />
              </div>
            </div>

            {/* MOBILE BUTTON */}
            <div
              className="
                md:hidden
                overflow-hidden
                max-h-0
                opacity-0
                mt-0
                transition-all
                duration-500
                group-hover:max-h-20
                group-hover:opacity-100
                group-hover:mt-4
              "
            >
              <div
                className="
                  w-full
                  bg-white
                  text-black
                  rounded-full
                  py-3
                  flex
                  items-center
                  justify-center
                  gap-2
                  font-semibold
                "
              >
                View Project
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

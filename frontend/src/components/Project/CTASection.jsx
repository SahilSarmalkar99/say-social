import {
  CalendarDays,
  Award,
} from "lucide-react";

export default function CTASection() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
    
    >
      <div className="max-w-7xl mx-auto px-5">
        {/* CTA CARD */}
        <div className="relative mx-auto max-w-6xl">
          {/* angled corner */}
          <div
            className="
              bg-[#f5f5f7]
              rounded-[30px]
              md:rounded-[40px]
              relative
              overflow-hidden
            "
          >
            
            

            <div className="px-6 md:px-12 py-20 md:py-24 text-center">
              <h2
                className="
                  text-[#060527]
                  font-bold
                  leading-[1.05]
                  tracking-[-0.04em]
                  text-4xl
                  sm:text-5xl
                  md:text-6xl
                  max-w-4xl
                  mx-auto
                "
              >
                Ready to discuss
                <br />
                your project with us?
              </h2>

              <p
                className="
                  mt-8
                  text-[#66667a]
                  text-base
                  md:text-xl
                  max-w-3xl
                  mx-auto
                  leading-relaxed
                "
              >
                Let’s talk about how we can craft a user experience that not
                only looks great but drives real growth for your product.
              </p>

              <button
                className="
                  mt-10
                  inline-flex
                  items-center
                  gap-8
                  bg-[#4727d6]
                  hover:bg-[#3d20c0]
                  text-white
                  font-semibold
                  uppercase
                  tracking-wide
                  rounded-full
                  pl-8
                  pr-2
                  py-2
                  transition-all
                  duration-300
                "
              >
                <span>Book a Call</span>

                <span
                  className="
                    h-12
                    w-12
                    rounded-full
                    bg-white
                    flex
                    items-center
                    justify-center
                  "
                >
                  <CalendarDays
                    size={20}
                    className="text-[#4727d6]"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* LOGOS */}
        <div
          className="
            mt-14
            grid
            grid-cols-2
            md:grid-cols-4
            gap-10
            text-center
          "
        >
          {[
            {
              name: "Clutch",
              text: "4.9 AVG. SCORE\nBASED ON 80+ REVIEWS",
            },
            {
              name: "Upwork",
              text: "TOP RATED COMPANY\nWITH 100% JOB SUCCESS",
            },
            {
              name: "Sortlist",
              text: "FEATURED WEB DESIGN\nAGENCY",
            },
            {
              name: "Dribbble",
              text: "TOP DESIGN AGENCY\nWORLDWIDE",
            },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-center mb-3">
                <Award
                  size={32}
                  className="text-white/90"
                />
              </div>

              <h3 className="text-white text-3xl font-medium">
                {item.name}
              </h3>

              <div className="text-yellow-400 text-sm mt-2">
                ★★★★★
              </div>

              <p
                className="
                  mt-3
                  text-white/80
                  text-xs
                  md:text-sm
                  uppercase
                  tracking-[0.2em]
                  whitespace-pre-line
                "
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
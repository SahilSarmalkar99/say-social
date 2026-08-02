import {
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  
  return (
    <footer className=" ">
      <div
        className="
          relative
          overflow-hidden

          min-h-[700px]
          px-6
          md:px-12
          lg:px-20
          py-12
          md:py-16
          flex
          flex-col
          justify-between
        "
      >
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Center Glow */}
          <div
            className="
              absolute
              w-[500px]
              h-[300px]
              rounded-full
              blur-[180px]
              opacity-40
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
            "
            style={{
              background: "#51385F",
            }}
          />

          {/* Bottom Left Glow */}
          <div
            className="
              absolute
              w-[400px]
              h-[400px]
              rounded-full
              blur-[140px]
              opacity-50
              left-20
              bottom-0
            "
            style={{
              background: "#51385F",
            }}
          />

          {/* Bottom Right Glow */}
          <div
            className="
              absolute
              w-[500px]
              h-[500px]
              rounded-full
              blur-[150px]
              opacity-40
              right-0
              bottom-0
            "
            style={{
              background: "#51385F",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Contact */}
          <div className="max-w-7xl">
            <div className="flex items-center gap-2 text-[32px] text-gray-300  mb-6">
              <Sparkles size={12} />
              <span>Contact Us</span>
            </div>

            <h2
              className="
                text-white
                text-3xl
                sm:text-4xl
                md:text-5xl
                lg:text-[72px]
                font-medium
                leading-tight
                tracking-tight
              "
            >
              Interested in working together,
              trying our platform or simply
              learning more?
            </h2>
          </div>

          {/* Middle Section */}
          <div
            className="
              mt-16
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-12
            "
          >
            {/* Email */}
            <div>
              <p className="text-gray-400 text-sm mb-3">
                Contact us at:
              </p>

              <a
                href="mailto:hello@agency.com"
                className="
                  text-white
                  text-xl
                  md:text-2xl
                  flex
                  items-center
                  gap-2
                  hover:text-gray-300
                  transition
                "
              >
                hello@agency.com
                <ArrowUpRight size={18} />
              </a>
            </div>

            {/* Navigation */}
            <nav
              className="
                flex
                flex-wrap
                gap-6
                md:gap-10
                text-white
                text-lg
              "
            >
              <a href="#">How It Works</a>
              <a href="#">Benefits</a>
              <a href="#">Features</a>
              <a href="#">Team</a>
            </nav>
          </div>
        </div>

        {/* Large Logo */}
        <div className="relative z-10 mt-20">
          <div
            className="
              flex
              flex-col
              lg:flex-row
              items-start
              lg:items-end
              gap-6
            "
          >
            {/* Symbol */}
            <div
              className="
                w-24
                h-24
                md:w-32
                md:h-32
                rounded-[30px]
                border-2
                border-white
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <div
                className="
                  w-10
                  h-10
                  md:w-14
                  md:h-14
                  bg-white
                  rotate-45
                  rounded-[18px]
                "
              />
            </div>

            {/* Text Logo */}
            <h1
              className="
                text-white
                font-bold
                leading-none
                tracking-tight
                text-[4rem]
                sm:text-[6rem]
                md:text-[8rem]
                lg:text-[10rem]
                xl:text-[12rem]
              "
            >
              datawizz
            </h1>
          </div>

          {/* Bottom Bar */}
          <div
            className="
              mt-8
              flex
              flex-col
              md:flex-row
              justify-between
              gap-4
              text-xs
              text-gray-400
            "
          >
            <p>
              © 2026 Datawizz. All rights reserved.
            </p>

            <div className="flex gap-6">
              <a href="#">LinkedIn</a>
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
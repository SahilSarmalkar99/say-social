import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "../../styles/WorkCTA.css";

export default function DribbbleShowcase() {
  const row1 = useRef(null);
  const row2 = useRef(null);

  // Contact number
  const phoneNumber = "7021374839";
  const phoneLink = `tel:+91${phoneNumber}`;

  const videos = [
    "/videos/work1.mp4",
    "/videos/work2.mp4",
    "/videos/work3.mp4",
    "/videos/work4.mp4",
    "/videos/work5.mp4",
    "/videos/work6.mp4",
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(row1.current, {
        xPercent: -50,
        duration: 25,
        ease: "none",
        repeat: -1,
      });

      gsap.to(row2.current, {
        xPercent: 50,
        duration: 25,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="
        relative
        py-10
        md:py-16
        overflow-hidden
      "
    >
      <div
        className="
          max-w-6xl
          mx-auto
          px-4 md:px-6
        "
      >
        <div
          className="
            relative
            bg-[#F5F5F7]
            rounded-[40px]
            overflow-hidden
          "
        >
          {/* =========================
              TOP NOTCH
          ========================== */}
          <div
            className="
              absolute
              top-0
              left-1/2
              -translate-x-1/2
              w-[140px]
              md:w-[180px]
              h-[26px]
              md:h-[32px]
              bg-[#F5F5F7]
              rounded-b-[40px]
              z-20
            "
          />

          <div className="p-5 md:p-8 lg:p-10">

            {/* =========================
                HEADER
            ========================== */}
            <div
              className="
                grid
                lg:grid-cols-2
                gap-10
                mb-10
                lg:mb-14
              "
            >
              {/* LEFT */}
              <div>
                <h2
                  className="
                    text-[#05072B]
                    text-5xl
                    md:text-6xl
                    lg:text-7xl
                    xl:text-8xl
                    font-black
                    leading-[0.9]
                  "
                >
                  CONTENT
                  <br />
                  THAT CONVERTS
                </h2>
              </div>

              {/* RIGHT */}
              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  justify-between
                  gap-8
                "
              >
                <p
                  className="
                    max-w-md
                    text-[#05072B]
                    text-base
                    md:text-lg
                    font-medium
                  "
                >
                  We create high-impact video content for brands, startups,
                  and creators—turning attention into engagement, and
                  engagement into growth.
                </p>

                {/* =========================
                    BOOK A CALL
                ========================== */}
                <a
                  href={phoneLink}
                  aria-label="Call us at 7021374839"
                  className="
                    w-24
                    h-24
                    rounded-full
                    bg-pink-500
                    text-white
                    text-xs
                    font-semibold
                    flex
                    items-center
                    justify-center
                    text-center
                    shrink-0
                    hover:scale-110
                    transition
                    duration-300
                    cursor-pointer
                  "
                >
                  Book
                  <br />
                  A Call
                </a>
              </div>
            </div>


            {/* =========================
                BOTTOM
            ========================== */}
            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-[240px_1fr]
                gap-5
              "
            >

              {/* =========================
                  STATS CARD
              ========================== */}
              <div
                className="
                  border
                  border-black/10
                  rounded-[32px]
                  p-6
                  min-h-[280px]
                  lg:min-h-[380px]
                  flex
                  flex-col
                  justify-between
                "
              >
                <div>
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      bg-[#05072B]
                      text-white
                      px-4
                      py-2
                      rounded-full
                      text-xs
                    "
                  >
                    ✦ TRUSTED BY FAST-GROWING BRANDS
                  </div>
                </div>

                <div>
                  <h3
                    className="
                      text-[#05072B]
                      text-5xl
                      md:text-6xl
                      font-bold
                    "
                  >
                    500+
                  </h3>

                  <p
                    className="
                      mt-5
                      text-[#05072B]
                      text-lg
                      font-medium
                    "
                  >
                    Projects delivered for ambitious brands looking to stand
                    out in a crowded digital world.
                  </p>
                </div>
              </div>


              {/* =========================
                  VIDEO CAROUSEL
              ========================== */}
              <div
                className="
                  relative
                  h-[320px]
                  sm:h-[400px]
                  md:h-[500px]
                  lg:h-[600px]
                  rounded-[32px]
                  overflow-hidden
                  bg-white
                "
              >

                {/* =========================
                    ROW 1
                ========================== */}
                <div
                  ref={row1}
                  className="
                    absolute
                    left-1/2
                    top-[18%]
                    md:top-[15%]
                    -translate-x-1/2
                    rotate-[18deg]
                    overflow-visible
                  "
                >
                  {/* Moving Track */}
                  <div
                    className="
                      diagonal-scroll
                      flex
                      gap-5
                      w-max
                    "
                  >
                    {[...videos, ...videos].map(
                      (video, index) => (
                        <div
                          key={index}
                          className="
                            w-[140px]
                            sm:w-[180px]
                            md:w-[260px]
                            lg:w-[300px]
                            h-[90px]
                            sm:h-[120px]
                            md:h-[180px]
                            lg:h-[210px]
                            rounded-[24px]
                            overflow-hidden
                            shrink-0
                          "
                        >
                          <video
                            src={video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="
                              w-full
                              h-full
                              object-cover
                              bg-black
                            "
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>


                {/* =========================
                    ROW 2
                ========================== */}
                <div
                  ref={row2}
                  className="
                    absolute
                    left-1/2
                    top-[52%]
                    md:top-[56%]
                    -translate-x-1/2
                    rotate-[18deg]
                    overflow-visible
                  "
                >
                  {/* Moving Track */}
                  <div
                    className="
                      diagonal-scroll
                      reverse
                      flex
                      gap-5
                      w-max
                    "
                  >
                    {[...videos, ...videos].map(
                      (video, index) => (
                        <div
                          key={index}
                          className="
                            w-[140px]
                            sm:w-[180px]
                            md:w-[260px]
                            lg:w-[300px]
                            h-[90px]
                            sm:h-[120px]
                            md:h-[180px]
                            lg:h-[210px]
                            rounded-[24px]
                            overflow-hidden
                            shrink-0
                          "
                        >
                          <video
                            src={video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="
                              w-full
                              h-full
                              object-cover
                              bg-black
                            "
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>


                {/* =========================
                    GRADIENT FADE LEFT
                ========================== */}
                <div
                  className="
                    absolute
                    inset-y-0
                    left-0
                    w-32
                    bg-gradient-to-r
                    from-white
                    to-transparent
                    z-10
                    pointer-events-none
                  "
                />


                {/* =========================
                    GRADIENT FADE RIGHT
                ========================== */}
                <div
                  className="
                    absolute
                    inset-y-0
                    right-0
                    w-32
                    bg-gradient-to-l
                    from-white
                    to-transparent
                    z-10
                    pointer-events-none
                  "
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Star } from "lucide-react";
import "../../styles/Testinomial.css";
import useTextReveal from "../../hooks/useTextReveal";
import useFadeUpCards from "../../hooks/useFadeIn";

const testimonials = [
  {
    name: "Anushka Sharma",
    location: "Mumbai, Maharashtra",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "Virat Kohli",
    location: "Mumbai, Maharashtra",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "Goli Beta",
    location: "Mumbai, Maharashtra",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "Jethalal Gada",
    location: "Mumbai, Maharashtra",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export default function Testimonial() {
  const textReveal = useTextReveal();
  const fadeIn = useFadeUpCards();
  return (
    <section ref={fadeIn} className="py-15 md:py-24 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 ref={textReveal}
          className="
            text-center
            text-3xl
            sm:text-4xl
            md:text-[72px]
            font-light
            mb-12
            md:mb-14
          "
        >
          What Our Clients Think
        </h2>

        <div className="fade-card testimonialcarousel-trust">
          <div className="group-trust">
            {testimonials.map((item, i) => (
              <TestimonialCard key={i} {...item} />
            ))}
          </div>

          <div className="group-trust" aria-hidden>
            {testimonials.map((item, i) => (
              <TestimonialCard key={`copy-${i}`} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, location, review }) {
  return (
    <div
      className="
        testimonial-card
        flex-shrink-0

        rounded-[24px]

        border
        border-white/10

        bg-[linear-gradient(135deg,rgba(88,28,135,.28),rgba(255,255,255,.05))]
        backdrop-blur-xl

        transition-all
        duration-500
      "
    >
      {/* Profile */}
      <div className="flex items-center gap-3 md:gap-5 mb-6 md:mb-8">
        <div
          className="
            h-14
            w-14
            md:h-20
            md:w-20

            rounded-full

            bg-gradient-to-br
            from-violet-400
            via-pink-400
            to-orange-300

            flex
            items-center
            justify-center

            text-xl
            md:text-3xl

            font-semibold
            text-black
          "
        >
          {name.charAt(0)}
        </div>

        <div>
          <h3
            className="
              text-lg
              md:text-3xl
              leading-none
              font-light
            "
          >
            {name}
          </h3>

          <p className="mt-2 text-xs md:text-sm text-white/40">
            {location}
          </p>
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4 md:mb-5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            fill="currentColor"
            className="text-yellow-300"
          />
        ))}
      </div>

      {/* Review */}
      <p
        className="
          text-sm
          md:text-[15px]
          leading-6
          md:leading-7
          text-white/70
        "
      >
        {review}
      </p>
    </div>
  );
}
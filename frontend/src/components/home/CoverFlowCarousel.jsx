import { useRef } from "react";

import useCarousel from "../../hooks/useCoverFlowCarousel";
import { carouselImages } from "../../data/carouselData";

export default function Carousel() {
  const cardsRef = useRef([]);

  useCarousel(cardsRef);

  return (
    <div
      className="
    w-full
    h-screen
    relative
    overflow-hidden
    mt-15
    [perspective:500px]
    md:[perspective:3000px]
    [transform-style:preserve-3d]
  "
    >
      {carouselImages.map((image, index) => (
        <div
          key={index}
          ref={(el) => (cardsRef.current[index] = el)}
         className="
          absolute
          w-[260px]
          h-[580px]
          md:w-[270px]
          md:h-[650px]
          lg:w-[280px]
          lg:h-[520px]
          xl:w-[320px]
          xl:h-[600px]
          rounded-[20px]
          overflow-hidden
          top-1/2
          left-1/2
          [transform-style:preserve-3d]
          will-change-transform
          "
        >
          <img
            src={image}
            alt=""
            className="
              w-full
              h-full
              object-cover
            "
          />
        </div>
      ))}
    </div>
  );
}

import React from "react";
import "../../styles/Trust.css";

import img1 from "../../assets/trust/img1.avif";
import img2 from "../../assets/trust/img2.avif";
import img3 from "../../assets/trust/img3.avif";
import img4 from "../../assets/trust/img4.avif";
import img5 from "../../assets/trust/img5.avif";
import img6 from "../../assets/trust/img6.avif";
import img7 from "../../assets/trust/img7.avif";
import img8 from "../../assets/trust/img8.avif";
import img9 from "../../assets/trust/img9.avif";
import useFadeUpCards from "../../hooks/useFadeIn";

const Item = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
];

const TrustCarousel = () => {

  const fadeIn = useFadeUpCards();
  return (
    <div ref={fadeIn} className="w-full flex flex-col">
      
      {/* Normal Scroll */}
      <div className="carousel-trust">
        <div className="group-trust">
          {Item.map((item, i) => (
            <div key={i} className="card-trust">
              <img
                src={item}
                alt={`trust-${i}`}
                className="h-[60px] w-auto object-contain"
              />
            </div>
          ))}
        </div>

        <div className="group-trust" aria-hidden>
          {Item.map((item, i) => (
            <div key={`copy-${i}`} className="card-trust">
              <img
                src={item}
                alt=""
                className="h-[60px] w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Reverse Scroll */}
      <div className="carousel-trust">
        <div className="group-reverse-trust">
          {Item.map((item, i) => (
            <div key={`reverse-${i}`} className="card-trust">
              <img
                src={item}
                alt={`trust-${i}`}
                className="h-[60px] w-auto object-contain"
              />
            </div>
          ))}
        </div>

        <div className="group-reverse-trust" aria-hidden>
          {Item.map((item, i) => (
            <div key={`reverse-copy-${i}`} className="card-trust">
              <img
                src={item}
                alt=""
                className="h-[60px] w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TrustCarousel;
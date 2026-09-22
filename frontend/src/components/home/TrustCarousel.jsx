import React, { useEffect, useState } from "react";
import "../../styles/Trust.css";

import { getLogos } from "../../api/adminContentApi";
import useFadeUpCards from "../../hooks/useFadeIn";

const TrustCarousel = () => {
  const fadeIn = useFadeUpCards();

  const [topLogos, setTopLogos] = useState([]);
  const [bottomLogos, setBottomLogos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getLogos();

        console.log("Logos API:", response.data);

        const data = response.data?.data;

        console.log(data)

        setTopLogos(data?.top || []);
        setBottomLogos(data?.bottom || []);
      } catch (error) {
        console.error("Failed to fetch logos:", error);
        setError("Unable to load logos");
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="w-full text-center text-white/50 py-10">
        Loading logos...
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <div className="w-full text-center text-red-400 py-10">
        {error}
      </div>
    );
  }

  /* =========================================================
     EMPTY
  ========================================================= */

  if (topLogos.length === 0 && bottomLogos.length === 0) {
    return (
      <div className="w-full text-center text-white/50 py-10">
        No logos available.
      </div>
    );
  }

  return (
    <div
      ref={fadeIn}
      className="w-screen relative left-1/2 -translate-x-1/2 flex flex-col"
    >
      {/* =====================================================
          TOP CAROUSEL
          Normal direction
      ====================================================== */}

      {topLogos.length > 0 && (
        <div className="carousel-trust w-full">
          {/* First Group */}
          <div className="group-trust">
            {topLogos.map((logo) => (
              <div
                key={logo._id}
                className="card-trust"
              >
                <img
                  src={logo.cloudUri}
                  alt={
                    logo.alt ||
                    logo.name ||
                    "Trusted company"
                  }
                  className="
                    h-[45px]
                    sm:h-[50px]
                    md:h-[60px]
                    w-auto
                    max-w-[180px]
                    object-contain
                  "
                />
              </div>
            ))}
          </div>

          {/* Duplicate Group */}
          <div
            className="group-trust"
            aria-hidden="true"
          >
            {topLogos.map((logo) => (
              <div
                key={`copy-${logo._id}`}
                className="card-trust"
              >
                <img
                  src={logo.cloudUri}
                  alt=""
                  className="
                    h-[45px]
                    sm:h-[50px]
                    md:h-[60px]
                    w-auto
                    max-w-[180px]
                    object-contain
                  "
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================
          BOTTOM CAROUSEL
          Reverse direction
      ====================================================== */}

      {bottomLogos.length > 0 && (
        <div className="carousel-trust w-full">
          {/* First Group */}
          <div className="group-reverse-trust">
            {bottomLogos.map((logo) => (
              <div
                key={`reverse-${logo._id}`}
                className="card-trust"
              >
                <img
                  src={logo.cloudUri}
                  alt={
                    logo.alt ||
                    logo.name ||
                    "Trusted company"
                  }
                  className="
                    h-[45px]
                    sm:h-[50px]
                    md:h-[60px]
                    w-auto
                    max-w-[180px]
                    object-contain
                  "
                />
              </div>
            ))}
          </div>

          {/* Duplicate Group */}
          <div
            className="group-reverse-trust"
            aria-hidden="true"
          >
            {bottomLogos.map((logo) => (
              <div
                key={`reverse-copy-${logo._id}`}
                className="card-trust"
              >
                <img
                  src={logo.cloudUri}
                  alt=""
                  className="
                    h-[45px]
                    sm:h-[50px]
                    md:h-[60px]
                    w-auto
                    max-w-[180px]
                    object-contain
                  "
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrustCarousel;
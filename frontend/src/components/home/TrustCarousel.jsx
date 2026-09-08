import React, { useEffect, useState } from "react";
import "../../styles/Trust.css";

import { getLogos } from "../../api/adminContentApi";
import useFadeUpCards from "../../hooks/useFadeIn";

const TrustCarousel = () => {
  const fadeIn = useFadeUpCards();

  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        setLoading(true);

        const response = await getLogos();

        console.log("Logos API:", response.data);

        setLogos(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch logos:", error);
        setError("Unable to load logos");
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);

  if (loading) {
    return (
      <div className="w-full text-center text-white/50 py-10">
        Loading logos...
      </div>
    );
  }

  if (error) {
    return <div className="w-full text-center text-red-400 py-10">{error}</div>;
  }

  if (logos.length === 0) {
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
      {/* ================= NORMAL SCROLL ================= */}
      <div className="carousel-trust w-full">
        {/* First Group */}
        <div className="group-trust">
          {logos.map((logo) => (
            <div key={logo._id} className="card-trust">
              <img
                src={logo.cloudUri}
                alt={logo.alt || logo.name || "Trusted company"}
                className="h-[60px] w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Duplicate Group */}
        <div className="group-trust" aria-hidden="true">
          {logos.map((logo) => (
            <div key={`copy-${logo._id}`} className="card-trust">
              <img
                src={logo.cloudUri}
                alt=""
                className="h-[60px] w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ================= REVERSE SCROLL ================= */}
      <div className="carousel-trust w-full">
        {/* First Group */}
        <div className="group-reverse-trust">
          {logos.map((logo) => (
            <div key={`reverse-${logo._id}`} className="card-trust">
              <img
                src={logo.cloudUri}
                alt={logo.alt || logo.name || "Trusted company"}
                className="h-[60px] w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Duplicate Group */}
        <div className="group-reverse-trust" aria-hidden="true">
          {logos.map((logo) => (
            <div key={`reverse-copy-${logo._id}`} className="card-trust">
              <img
                src={logo.cloudUri}
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

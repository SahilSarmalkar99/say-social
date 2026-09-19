import React, { useEffect, useState } from "react";
import useFadeUpCards from "../../hooks/useFadeIn";
import {getSiteSettings} from "../../api/site-settings";

const WorkHero = () => {
  const fadeIn = useFadeUpCards();
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const response = await getSiteSettings();
        setVideoUrl(response.data.heroVideos.work);
      } catch (error) {
        console.error("Failed to fetch work hero video:", error);
      }
    };

    fetchSiteSettings();
  }, []);

  return (
    <section
      ref={fadeIn}
      className="relative h-[60vh] min-h-[400px] overflow-hidden"
    >
      {videoUrl && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="
            fade-card
            absolute
            inset-0
            w-full
            h-full
            object-cover
            object-center
          "
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
    </section>
  );
};

export default WorkHero;
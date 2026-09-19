import React, { useEffect, useState } from "react";
import {getSiteSettings} from "../../api/site-settings";

const TeamHero = () => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const response = await getSiteSettings();
        setVideoUrl(response.data.heroVideos.team);
      } catch (error) {
        console.error("Failed to fetch team hero video:", error);
      }
    };

    fetchSiteSettings();
  }, []);

  return (
    <section className="relative h-[80vh] min-h-[400px] overflow-hidden">
      {videoUrl && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="
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

export default TeamHero;

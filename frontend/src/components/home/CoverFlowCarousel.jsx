import { useEffect, useRef, useState } from "react";

import useCarousel from "../../hooks/useCoverFlowCarousel";
import { getCarouselVideos } from "../../api/videoApi";

function VideoCarousel({ videos }) {
  const cardsRef = useRef([]);

  // YOUR HOOK — COMPLETELY UNCHANGED
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
      {videos.map((video, index) => (
        <div
          key={video._id}
          ref={(el) => (cardsRef.current[index] = el)}
          className="
            absolute
            w-[260px]
            h-[700px]
            md:w-[270px]
            md:h-[650px]
            lg:w-[380px]
            lg:h-[580px]
            xl:w-[520px]
            xl:h-[900px]
            rounded-[20px]
            overflow-hidden
            top-1/2
            left-1/2
            [transform-style:preserve-3d]
            will-change-transform
          "
        >
          <video
            src={video.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="
              w-full
              h-full
              object-cover
              block
            "
          />
        </div>
      ))}
    </div>
  );
}

export default function Carousel() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await getCarouselVideos();

        console.log("Carousel videos:", data);

        setVideos(data.videos || []);
      } catch (error) {
        console.error("Failed to fetch carousel videos:", error);
      }
    };

    loadVideos();
  }, []);

  if (!videos.length) {
    return null;
  }

  return <VideoCarousel videos={videos} />;
}
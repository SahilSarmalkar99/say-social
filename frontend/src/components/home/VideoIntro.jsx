import { useEffect, useState } from "react";
import { getMainVideo } from "../../api/videoApi";

const VideoIntro = ({ sectionRef, videoRef, overlayRef }) => {
  const [mainVideo, setMainVideo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    // Initial value
    setIsMobile(mediaQuery.matches);

    // Listen for resize / breakpoint changes
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Fetch main video
  useEffect(() => {
    const fetchMainVideo = async () => {
      try {
        const data = await getMainVideo();

        // console.log("MAIN VIDEO:", data);

        setMainVideo(data.video);
      } catch (error) {
        console.error("Failed to fetch main video:", error);
      }
    };

    fetchMainVideo();
  }, []);

  // Select video according to device
  const videoUrl = isMobile
    ? mainVideo?.mobileVideoUrl
    : mainVideo?.videoUrl;

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-[100vh]
        md:h-[120vh]
      "
    >
      <div
        className="
          sticky
          top-0
          h-[100svh]
          overflow-hidden
        "
      >
        {/* VIDEO */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            object-center
            will-change-transform
          "
        >
          {videoUrl && (
            <source
              src={videoUrl}
              type="video/mp4"
            />
          )}
        </video>

        {/* DARK OVERLAY */}
        <div
          ref={overlayRef}
          className="
            absolute
            inset-0
            bg-black
            opacity-0
          "
        />
      </div>
    </section>
  );
};

export default VideoIntro;
import { useEffect, useState } from "react";
import { getMainVideo } from "../../api/videoApi";

const VideoIntro = ({ sectionRef, videoRef, overlayRef }) => {
  const [mainVideo, setMainVideo] = useState(null);

  useEffect(() => {
    const fetchMainVideo = async () => {
      try {
        const data = await getMainVideo();

        console.log("MAIN VIDEO:", data);

        setMainVideo(data.video);
      } catch (error) {
        console.error("Failed to fetch main video:", error);
      }
    };

    fetchMainVideo();
  }, []);

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
          loading="lazy"
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
          {mainVideo?.videoUrl && (
            <source src={mainVideo.videoUrl} type="video/mp4" />
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

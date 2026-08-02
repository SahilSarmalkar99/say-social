const VideoIntro = ({
  sectionRef,
  videoRef,
  overlayRef,
}) => {
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
          <source
            src="https://media.istockphoto.com/id/1942771288/video/split-multi-screen-collage-in-data-center-diverse-group-of-it-specialists-technicians.mp4?p=1&s=mp4-640x640-is&k=20&c=tff8dSJqN7cTGV6bHgpGc64qTAUZXPT5ekHuZUXgfIg="
            type="video/mp4"
          />
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
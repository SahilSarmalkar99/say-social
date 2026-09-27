import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";

export default function WorkCard({
  item,
  activeVideoId,
  onVideoActivate,
  onRegisterVideo,
}) {
  const videoId = item._id;

  const isActive = String(activeVideoId) === String(videoId);

  return (
    <div
      className="
        group
        relative
        w-full
        h-screen
        max-h-[800px]
        min-h-[500px]
        overflow-hidden
        rounded-[34px]
        bg-black
      "
    >
      {/* =====================================================
          VIDEO
      ===================================================== */}

      <video
        ref={(video) => {
          onRegisterVideo?.(videoId, video);
        }}
        src={item.previewVideo}
        autoPlay
        muted={!isActive}
        loop
        playsInline
        preload="metadata"
        data-portfolio-video
        onClick={(e) => {
          e.stopPropagation();

          onVideoActivate?.(videoId);
        }}
        className="
          absolute
          inset-0
          w-full
          h-full
          min-w-full
          min-h-full
          object-cover
          cursor-pointer
          transition-transform
          duration-700
          ease-out
          group-hover:scale-105
        "
      />



  

      {/* =====================================================
          AUDIO STATUS
      ===================================================== */}

      <div
        className={`
          pointer-events-none
          absolute
          right-5
          top-5
          z-30
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-black/40
          text-white
          backdrop-blur-xl
          transition-all
          duration-300
          ${
            isActive
              ? "scale-100 opacity-100"
              : "scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100"
          }
        `}
      >
        {isActive ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </div>

      {/* =====================================================
          INFO
      ===================================================== */}

      <div
        className="
          absolute
          left-4
          right-4
          bottom-4
          sm:left-6
          sm:right-6
          sm:bottom-6
          rounded-2xl
          border
          border-white/10
          bg-white/10
          backdrop-blur-xl
          px-4
          py-4
          sm:px-6
          sm:py-5
          flex
          justify-between
          items-center
          translate-y-8
          opacity-0
          transition-all
          duration-500
          group-hover:translate-y-0
          group-hover:opacity-100
        "
      >
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-white">
            {item.subCategory?.name}
          </h3>

          <p className="text-sm sm:text-base text-white/70">
            {item.category?.name}
          </p>
        </div>

        <ArrowUpRight size={26} className="shrink-0 text-white" />
      </div>
    </div>
  );
}

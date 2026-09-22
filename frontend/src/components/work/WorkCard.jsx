import { ArrowUpRight } from "lucide-react";

export default function WorkCard({ item }) {
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
      {/* VIDEO */}
      <video
        src={item.previewVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="
          absolute
          inset-0
          w-full
          h-full
          min-w-full
          min-h-full
          object-cover
          transition-transform
          duration-700
          ease-out
          group-hover:scale-105
        "
      />

      {/* OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-black/25
          transition-all
          duration-500
          group-hover:bg-black/40
        "
      />

      {/* INFO */}
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

        <ArrowUpRight
          size={26}
          className="text-white shrink-0"
        />
      </div>
    </div>
  );
}
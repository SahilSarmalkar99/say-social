import { ArrowUpRight } from "lucide-react";

export default function WorkCard({ item }) {
  return (
    <div className="group relative h-[90vh] max-h-[800px] min-h-[500px] overflow-hidden rounded-[34px] bg-black">
      <video
        src={item.previewVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/25 transition-all duration-500 group-hover:bg-black/40" />

      <div
        className="
          absolute
          left-6
          right-6
          bottom-6
          rounded-2xl
          border
          border-white/10
          bg-white/10
          backdrop-blur-xl
          px-6
          py-5
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
          <h3 className="text-xl font-semibold text-white">
            {item.subCategory?.name}
          </h3>

          <p className="text-white/70">
            {item.category?.name}
          </p>
        </div>

        <ArrowUpRight
          size={26}
          className="text-white"
        />
      </div>
    </div>
  );
}
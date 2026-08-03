import React from "react";

const MediaCard = ({ url, className }) => {
  const isVideo = url
    ? /\.(mp4|webm|ogg|mov|m4v)$/i.test(url)
    : false;

  return (
    <div
      className={`${className} overflow-hidden rounded-2xl lg:rounded-[32px] bg-zinc-900 shadow-lg`}
    >
      {url ? (
        isVideo ? (
          <video
            src={url}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={url}
            alt=""
            className="h-full w-full object-cover"
          />
        )
      ) : (
        <div className="flex h-full items-center justify-center bg-zinc-800 text-white">
          No Preview
        </div>
      )}
    </div>
  );
};

const DesignIdentityTemplate = ({ formData }) => {
  const media = formData?.videos || [];

  return (
    <div className="rounded-2xl lg:rounded-3xl bg-[#1D1523] p-4 sm:p-6 lg:p-8">
      <h2 className="mb-6 lg:mb-8 text-2xl sm:text-3xl font-bold text-white">
        Live Preview
      </h2>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
        {/* LEFT */}
        <div className="flex flex-col gap-5 lg:col-span-3 lg:gap-6">
          <MediaCard
            url={media[0]?.url}
            className="h-[320px] sm:h-[420px] lg:h-[560px]"
          />

          <MediaCard
            url={media[1]?.url}
            className="h-[220px] sm:h-[260px] lg:h-[300px]"
          />
        </div>

        {/* CENTER */}
        <div className="flex flex-col gap-5 lg:col-span-6 lg:gap-6">
          <MediaCard
            url={media[2]?.url}
            className="h-[220px] sm:h-[260px] lg:h-[235px]"
          />

          <MediaCard
            url={media[3]?.url}
            className="h-[220px] sm:h-[260px] lg:h-[235px]"
          />

          <MediaCard
            url={media[4]?.url}
            className="h-[300px] sm:h-[380px] lg:h-[325px]"
          />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-5 lg:col-span-3 lg:gap-6">
          <MediaCard
            url={media[5]?.url}
            className="h-[220px] sm:h-[260px] lg:h-[235px]"
          />

          <MediaCard
            url={media[6]?.url}
            className="h-[220px] sm:h-[260px] lg:h-[235px]"
          />

          <MediaCard
            url={media[7]?.url}
            className="h-[300px] sm:h-[380px] lg:h-[325px]"
          />
        </div>
      </div>
    </div>
  );
};

export default DesignIdentityTemplate;
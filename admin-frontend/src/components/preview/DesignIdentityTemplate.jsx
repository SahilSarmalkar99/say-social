import React from "react";

const MediaCard = ({ url, className }) => {
  if (!url) {
    return (
      <div
        className={`${className} rounded-[32px] bg-zinc-800 flex items-center justify-center text-white`}
      >
        No Preview
      </div>
    );
  }

  const isVideo = /\.(mp4|webm|ogg|mov|m4v)$/i.test(url);

  return (
    <div
      className={`${className} overflow-hidden rounded-[32px] bg-zinc-900 shadow-lg`}
    >
      {isVideo ? (
        <video
          src={url}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src={url}
          alt=""
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

const DesignIdentityTemplate = ({ formData }) => {
  const media = formData?.videos || [];

  return (
    <div className="bg-[#1D1523] rounded-3xl p-8">

      <h2 className="text-3xl font-bold text-white mb-8">
        Live Preview
      </h2>

      <div className="grid grid-cols-12 gap-6">

        {/* LEFT */}
        <div className="col-span-3 flex flex-col gap-6">
          <MediaCard
            url={media[0]?.url}
            className="h-[560px]"
          />

          <MediaCard
            url={media[1]?.url}
            className="h-[300px]"
          />
        </div>

        {/* CENTER */}
        <div className="col-span-6 flex flex-col gap-6">

          <MediaCard
            url={media[2]?.url}
            className="h-[235px]"
          />

          <MediaCard
            url={media[3]?.url}
            className="h-[235px]"
          />

          <MediaCard
            url={media[4]?.url}
            className="h-[325px]"
          />

        </div>

        {/* RIGHT */}
        <div className="col-span-3 flex flex-col gap-6">

          <MediaCard
            url={media[5]?.url}
            className="h-[235px]"
          />

          <MediaCard
            url={media[6]?.url}
            className="h-[235px]"
          />

          <MediaCard
            url={media[7]?.url}
            className="h-[325px]"
          />

        </div>

      </div>

    </div>
  );
};

export default DesignIdentityTemplate;
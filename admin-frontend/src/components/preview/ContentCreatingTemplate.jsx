import React from "react";

const Card = ({ url, large = false }) => {
  return (
    <div
      className={`overflow-hidden rounded-2xl md:rounded-[32px] bg-black shadow-lg transition-all duration-300 hover:scale-[1.02]
      ${
        large
          ? "aspect-[9/16] h-[320px] sm:h-[380px] lg:h-[500px]"
          : "aspect-[9/16] h-[260px] sm:h-[300px] lg:h-[360px]"
      }`}
    >
      {url ? (
        <video
          src={url}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-zinc-800 text-white">
          No Preview
        </div>
      )}
    </div>
  );
};

const ContentCreatingTemplate = ({ formData }) => {
  const videos = formData?.videos || [];

  const topVideos = videos.slice(0, 3);
  const bottomVideos = videos.slice(3);

  return (
    <div className="rounded-2xl md:rounded-3xl bg-[#211628] p-4 sm:p-6 lg:p-8">
      <h2 className="mb-6 lg:mb-8 text-2xl text-center sm:text-3xl font-bold text-white">
        Live Preview
      </h2>

      <div className="space-y-6 lg:space-y-8">
        {/* Top Row */}
       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 justify-items-center gap-5 lg:gap-8">
          {topVideos.map((video, index) => (
            <Card
              key={index}
              url={video.url}
              large
            />
          ))}
        </div>

        {/* Bottom Row */}
        {bottomVideos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-5 lg:gap-8">
            {bottomVideos.map((video, index) => (
              <Card
                key={index}
                url={video.url}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentCreatingTemplate;
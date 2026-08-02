import React from "react";

const Card = ({ url, large = false }) => {
  if (!url) {
    return (
      <div
        className={`bg-zinc-800 rounded-[32px] flex items-center justify-center text-white ${
          large ? "h-[500px]" : "h-[360px]"
        }`}
      >
        No Preview
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-[32px] bg-black shadow-lg transition-all duration-300 hover:scale-[1.02]
      ${large ? "h-[500px]" : "h-[360px]"}`}
    >
      <video
        src={url}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

const ContentCreatingTemplate = ({ formData }) => {
  const videos = formData?.videos || [];

  const topVideos = videos.slice(0, 3);
  const bottomVideos = videos.slice(3);

  return (
    <div className="bg-[#211628] rounded-3xl p-8">
      <h2 className="text-3xl font-bold text-white mb-8">
        Live Preview
      </h2>

      <div className="space-y-8">

        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
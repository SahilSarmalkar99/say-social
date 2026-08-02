import VideoCard from "./VideoCard";

export default function VideoList({
  videos,

  categories,

  subCategories,

  companies,

  updateVideo,

  removeVideo,
}) {
  return (
    <div className="space-y-5">
      {videos.map((video, index) => (
        <VideoCard
          key={index}
          video={video}
          index={index}
          categories={categories}
          subCategories={subCategories}
          companies={companies}
          updateVideo={updateVideo}
          removeVideo={removeVideo}
          canDelete={videos.length > 1}
        />
      ))}
    </div>
  );
}

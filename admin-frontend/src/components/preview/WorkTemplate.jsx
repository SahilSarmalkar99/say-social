export default function WorkTemplate({ formData }) {
  const videos = formData?.videos || [];

  const featured = videos.slice(0, 2);
  const remaining = videos.slice(2);

  return (
    <div className="bg-zinc-800  rounded-3xl border shadow-sm p-6">
      <h2 className="text-2xl text-white font-bold mb-6">Live Preview</h2>

      <div className="space-y-6">
        {/* Top Featured Videos */}
        <div className="grid grid-cols-2 gap-6">
          {featured.map((video, index) => (
            <Card key={index} url={video.url} large />
          ))}
        </div>

        {/* Remaining Videos */}
        {remaining.length > 0 && (
          <div className="grid grid-cols-4 gap-6">
            {remaining.map((video, index) => (
              <Card key={index} url={video.url} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ url, large = false }) {
  return (
    <div
      className={`
        overflow-hidden
        rounded-3xl
        bg-gray-200
        border
        shadow-md
        ${large ? "h-[320px]" : "h-[360px]"}
      `}
    >
      {url ? (
        <video
          src={url}
          autoPlay
          muted
          loop
          playsInline
          controls
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-gray-500">
          No Preview
        </div>
      )}
    </div>
  );
}

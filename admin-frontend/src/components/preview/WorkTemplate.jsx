import { useEffect, useMemo, useState } from "react";

export default function WorkTemplate({ formData }) {
  const workCategories = formData?.workCategories || [];

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (!selectedCategory && workCategories.length > 0) {
      setSelectedCategory(
        workCategories[0].category?._id || workCategories[0].category,
      );
    }
  }, [workCategories]);

  const selectedGroup = useMemo(() => {
    return (
      workCategories.find(
        (group) =>
          String(group.category?._id || group.category) ===
          String(selectedCategory),
      ) || {
        videos: [],
      }
    );
  }, [workCategories, selectedCategory]);

  const featured = selectedGroup.videos.slice(0, 2);
  const remaining = selectedGroup.videos.slice(2);

  return (
    <div className="bg-zinc-900 rounded-3xl border border-zinc-700 shadow-xl p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Live Preview
        </h2>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-auto sm:min-w-[250px] rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-white"
        >
          {workCategories.map((group) => (
            <option
              key={group.category?._id || group.category}
              value={group.category?._id || group.category}
            >
              {group.category?.name || "Category"}
            </option>
          ))}
        </select>
      </div>

      {selectedGroup.videos.length === 0 ? (
        <div className="h-80 rounded-3xl border-2 border-dashed border-zinc-700 flex items-center justify-center text-zinc-400 text-lg">
          No Videos Added
        </div>
      ) : (
        <div className="space-y-8">
          {/* Featured */}

          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((video, index) => (
              <Card key={index} url={video.url} large />
            ))}
          </div>

          {/* Remaining */}

          {remaining.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {remaining.map((video, index) => (
                <Card key={index} url={video.url} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Card({ url, large = false }) {
  return (
    <div
      className={`
      overflow-hidden
      rounded-3xl
      bg-zinc-800
      border
      border-zinc-700
      shadow-lg
      transition
      hover:scale-[1.02]
      ${large ? "h-[340px]" : "h-[280px]"}
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
        <div className="flex h-full items-center justify-center text-zinc-500">
          No Preview
        </div>
      )}
    </div>
  );
}

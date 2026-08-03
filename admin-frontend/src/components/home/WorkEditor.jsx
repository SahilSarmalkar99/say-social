import { useEffect, useMemo, useState } from "react";

export default function WorkEditor({
  categories,
  subCategories,
  formData,
  setFormData,
}) {
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (!selectedCategory && categories.length) {
      setSelectedCategory(categories[0]._id);
    }
  }, [categories]);

  const selectedIndex = formData.workCategories.findIndex(
    (item) =>
      String(item.category?._id || item.category) ===
      String(selectedCategory)
  );

  const selectedGroup = useMemo(() => {
    if (selectedIndex === -1) {
      return {
        category: selectedCategory,
        videos: [],
      };
    }

    return formData.workCategories[selectedIndex];
  }, [selectedIndex, formData.workCategories, selectedCategory]);

  const updateGroup = (videos) => {
    const temp = structuredClone(formData.workCategories);

    if (selectedIndex === -1) {
      temp.push({
        category: selectedCategory,
        videos,
      });
    } else {
      temp[selectedIndex].videos = videos;
    }

    setFormData({
      ...formData,
      workCategories: temp,
    });
  };

  const addVideo = () => {
    if (selectedGroup.videos.length >= 6) return;

    updateGroup([
      ...selectedGroup.videos,
      {
        url: "",
        subCategory: "",
      },
    ]);
  };

  const removeVideo = (index) => {
    updateGroup(selectedGroup.videos.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      {/* Category */}

      <div>
        <label className="block font-semibold mb-2">
          Select Category
        </label>

        <select
          className="w-full border rounded-xl p-3"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Header */}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {categories.find((c) => c._id === selectedCategory)?.name}
        </h2>

        <button
          type="button"
          onClick={addVideo}
          disabled={selectedGroup.videos.length >= 6}
          className={`px-5 py-2 rounded-xl text-white ${
            selectedGroup.videos.length >= 6
              ? "bg-gray-400"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          Add Video ({selectedGroup.videos.length}/6)
        </button>
      </div>

      {selectedGroup.videos.length === 0 && (
        <div className="border rounded-xl p-10 text-center text-gray-500">
          No videos added.
        </div>
      )}

      {selectedGroup.videos.map((video, videoIndex) => (
        <div
          key={videoIndex}
          className="border rounded-xl bg-white p-6 space-y-5"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">
              Video {videoIndex + 1}
            </h3>

            <button
              onClick={() => removeVideo(videoIndex)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>

          {/* URL */}

          <div>
            <label className="block mb-2 font-medium">
              Video URL
            </label>

            <input
              className="w-full border rounded-xl p-3"
              placeholder="https://..."
              value={video.url}
              onChange={(e) => {
                const temp = [...selectedGroup.videos];
                temp[videoIndex].url = e.target.value;
                updateGroup(temp);
              }}
            />
          </div>

          {/* Sub Category */}

          <div>
            <label className="block mb-2 font-medium">
              Sub Category
            </label>

            <select
              className="w-full border rounded-xl p-3"
              value={video.subCategory?._id || video.subCategory || ""}
              onChange={(e) => {
                const temp = [...selectedGroup.videos];

                temp[videoIndex].subCategory = e.target.value;

                updateGroup(temp);
              }}
            >
              <option value="">Select</option>

              {subCategories
                .filter(
                  (sub) =>
                    String(sub.category?._id || sub.category) ===
                    String(selectedCategory)
                )
                .map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
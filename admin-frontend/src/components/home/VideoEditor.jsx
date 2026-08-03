export default function VideoEditor({
  categories,
  subCategories,
  companies,
  formData,
  setFormData,
  maxVideos,
}) {
  const updateVideo = (index, field, value) => {
    const temp = [...formData.videos];

    temp[index][field] = value;

    // Reset dependent fields
    if (field === "category") {
      temp[index].subCategory = "";
      temp[index].company = "";
    }

    if (field === "subCategory") {
      temp[index].company = "";
    }

    setFormData({
      ...formData,
      videos: temp,
    });
  };

  const addVideo = () => {
    if (formData.videos.length >= maxVideos) return;

    setFormData({
      ...formData,
      videos: [
        ...formData.videos,
        {
          url: "",
          category: "",
          subCategory: "",
          company: "",
        },
      ],
    });
  };

  const removeVideo = (index) => {
    if (formData.videos.length === 1) return;

    setFormData({
      ...formData,
      videos: formData.videos.filter((_, i) => i !== index),
    });
  };

  return (
    <>
      <div className="space-y-8">
        {formData.videos.map((video, index) => (
          <div key={index} className="border rounded-2xl p-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg">
                Video {index + 1}
              </h2>

              {formData.videos.length > 1 && (
                <button
                  onClick={() => removeVideo(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>

            {/* URL */}

            <div className="mt-5">
              <label className="block mb-2">
                Video URL
              </label>

              <input
                className="w-full border rounded-xl p-3"
                value={video.url}
                placeholder="https://..."
                onChange={(e) =>
                  updateVideo(index, "url", e.target.value)
                }
              />
            </div>

            <div className="grid md:grid-cols-3 gap-5 mt-6">

              {/* Category */}

              <div>
                <label className="block mb-2">
                  Category
                </label>

                <select
                  className="w-full border rounded-xl p-3"
                  value={video.category}
                  onChange={(e) =>
                    updateVideo(index, "category", e.target.value)
                  }
                >
                  <option value="">
                    Select Category
                  </option>

                  {categories.map((cat) => (
                    <option
                      key={cat._id}
                      value={cat._id}
                    >
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* SubCategory */}

              <div>
                <label className="block mb-2">
                  Sub Category
                </label>

                <select
                  className="w-full border rounded-xl p-3"
                  value={video.subCategory}
                  onChange={(e) =>
                    updateVideo(
                      index,
                      "subCategory",
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Select Sub Category
                  </option>

                  {subCategories
                    .filter(
                      (sub) =>
                        !video.category ||
                        sub.category === video.category ||
                        sub.category?._id === video.category
                    )
                    .map((sub) => (
                      <option
                        key={sub._id}
                        value={sub._id}
                      >
                        {sub.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Company */}

              <div>
                <label className="block mb-2">
                  Company
                </label>

                <select
                  className="w-full border rounded-xl p-3"
                  value={video.company}
                  onChange={(e) =>
                    updateVideo(index, "company", e.target.value)
                  }
                >
                  <option value="">
                    Select Company
                  </option>

                  {companies
                    .filter(
                      (company) =>
                        !video.subCategory ||
                        company.subCategory === video.subCategory ||
                        company.subCategory?._id ===
                          video.subCategory
                    )
                    .map((company) => (
                      <option
                        key={company._id}
                        value={company._id}
                      >
                        {company.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        
      </div>
    </>
  );
}
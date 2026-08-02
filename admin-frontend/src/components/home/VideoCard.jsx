export default function VideoCard({
  video,

  index,

  categories,

  subCategories,

  companies,

  updateVideo,

  removeVideo,

  canDelete,
}) {
  return (
    <div className="border rounded-2xl p-6 bg-white shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Video {index + 1}</h3>

        {canDelete && (
          <button onClick={() => removeVideo(index)} className="text-red-500">
            Remove
          </button>
        )}
      </div>

      <div className="mt-5">
        <label className="text-sm font-medium">Video URL</label>

        <input
          className="w-full border rounded-xl p-3 mt-2"
          value={video.url}
          onChange={(e) => updateVideo(index, "url", e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-5">
        <select
          className="border rounded-xl p-3"
          value={video.category}
          onChange={(e) => updateVideo(index, "category", e.target.value)}
        >
          <option>Category</option>

          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          className="border rounded-xl p-3"
          value={video.subCategory}
          onChange={(e) => updateVideo(index, "subCategory", e.target.value)}
        >
          <option>Sub Category</option>

          {subCategories.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select>

        <select
          className="border rounded-xl p-3"
          value={video.company}
          onChange={(e) => updateVideo(index, "company", e.target.value)}
        >
          <option>Company</option>

          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

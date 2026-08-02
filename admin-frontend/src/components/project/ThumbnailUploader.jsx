import { ImageIcon } from "lucide-react";

export default function ThumbnailUploader({ thumbnail, onChange }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}

      <div className="flex items-center gap-3 border-b px-6 py-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
          <ImageIcon className="text-blue-600" size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold">Thumbnail</h2>

          <p className="text-sm text-gray-500">
            This image will appear on your portfolio homepage.
          </p>
        </div>
      </div>

      {/* Body */}

      <div className="grid gap-8 p-6 lg:grid-cols-2">
        {/* Input */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Cloudinary Image URL
          </label>

          <input
            type="text"
            placeholder="https://res.cloudinary.com/..."
            value={thumbnail}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-xl border p-3 outline-none transition focus:border-black"
          />

          <p className="mt-3 text-sm text-gray-500">
            Paste the uploaded Cloudinary image URL.
          </p>
        </div>

        {/* Preview */}

        <div>
          <label className="mb-2 block text-sm font-medium">Preview</label>

          <div className="overflow-hidden rounded-2xl border bg-gray-100">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt="Thumbnail Preview"
                className="aspect-video w-full object-cover"
              />
            ) : (
              <div className="flex aspect-video items-center justify-center">
                <div className="text-center">
                  <ImageIcon size={42} className="mx-auto text-gray-300" />

                  <p className="mt-3 text-gray-400">Thumbnail Preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

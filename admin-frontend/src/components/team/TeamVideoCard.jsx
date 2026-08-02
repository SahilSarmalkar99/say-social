import { Save, Trash2, Video } from "lucide-react";

export default function TeamVideoCard({
  video,
  setVideo,
  onSave,
  onDelete,
}) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-3 border-b p-6">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
          <Video className="text-blue-600" size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Team Video
          </h2>

          <p className="text-sm text-gray-500">
            Add or replace the introduction video.
          </p>
        </div>

      </div>

      {/* Body */}

      <div className="p-6 space-y-5">

        <div>

          <label className="mb-2 block text-sm font-medium">
            Cloudinary Video URL
          </label>

          <input
            type="text"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            placeholder="https://res.cloudinary.com/..."
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          />

        </div>

        {/* Preview */}

        {video && (
          <div>

            <label className="mb-2 block text-sm font-medium">
              Preview
            </label>

            <video
              controls
              src={video}
              className="w-full max-w-4xl rounded-xl border"
            />

          </div>
        )}

      </div>

      {/* Footer */}

      <div className="flex justify-end gap-4 border-t p-6">

        <button
          type="button"
          onClick={onDelete}
          className="flex items-center gap-2 rounded-lg bg-red-500 px-5 py-3 text-white transition hover:bg-red-600"
        >
          <Trash2 size={18} />
          Delete Video
        </button>

        <button
          type="button"
          onClick={onSave}
          className="flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-white transition hover:bg-gray-800"
        >
          <Save size={18} />
          Save Video
        </button>

      </div>

    </div>
  );
}
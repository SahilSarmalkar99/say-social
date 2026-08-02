import { useState } from "react";
import { ImagePlus, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

export default function ImageGalleryManager({ images, onChange }) {
  const [imageUrl, setImageUrl] = useState("");
  const [alt, setAlt] = useState("");

  // -----------------------
  // Add Image
  // -----------------------

  const addImage = () => {
    if (!imageUrl.trim()) {
      return;
    }

    onChange([
      ...images,
      {
        image: imageUrl,
        alt,
        order: images.length + 1,
      },
    ]);

    setImageUrl("");
    setAlt("");
  };

  // -----------------------
  // Delete
  // -----------------------

  const removeImage = (index) => {
    const updated = images
      .filter((_, i) => i !== index)
      .map((img, i) => ({
        ...img,
        order: i + 1,
      }));

    onChange(updated);
  };

  // -----------------------
  // Edit URL
  // -----------------------

  const updateImage = (index, field, value) => {
    const updated = [...images];

    updated[index][field] = value;

    onChange(updated);
  };

  // -----------------------
  // Move Up
  // -----------------------

  const moveUp = (index) => {
    if (index === 0) return;

    const updated = [...images];

    [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];

    updated.forEach((img, i) => {
      img.order = i + 1;
    });

    onChange(updated);
  };

  // -----------------------
  // Move Down
  // -----------------------

  const moveDown = (index) => {
    if (index === images.length - 1) return;

    const updated = [...images];

    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];

    updated.forEach((img, i) => {
      img.order = i + 1;
    });

    onChange(updated);
  };

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      {/* Header */}

      <div className="flex items-center gap-3 border-b px-6 py-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100">
          <ImagePlus size={22} className="text-pink-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold">Project Images</h2>

          <p className="text-sm text-gray-500">
            Images will appear one below another.
          </p>
        </div>
      </div>

      {/* Add New */}

      <div className="space-y-5 border-b p-6">
        <input
          type="text"
          value={imageUrl}
          placeholder="Cloudinary Image URL"
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full rounded-xl border p-3"
        />

        <input
          type="text"
          value={alt}
          placeholder="Alt Text (optional)"
          onChange={(e) => setAlt(e.target.value)}
          className="w-full rounded-xl border p-3"
        />

        <button
          type="button"
          onClick={addImage}
          className="flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-white"
        >
          <Plus size={18} />
          Add Image
        </button>
      </div>

      {/* Images */}

      <div className="space-y-6 p-6">
        {images.length === 0 && (
          <div className="rounded-xl border border-dashed py-16 text-center text-gray-400">
            No Images Added
          </div>
        )}

        {images.map((img, index) => (
          <div key={index} className="rounded-2xl border p-5">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Preview */}

              <div>
                <img
                  src={img.image}
                  className="w-full rounded-xl border object-cover"
                />
              </div>

              {/* Controls */}

              <div className="space-y-4">
                <input
                  value={img.image}
                  onChange={(e) => updateImage(index, "image", e.target.value)}
                  className="w-full rounded-xl border p-3"
                />

                <input
                  value={img.alt}
                  placeholder="Alt Text"
                  onChange={(e) => updateImage(index, "alt", e.target.value)}
                  className="w-full rounded-xl border p-3"
                />

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => moveUp(index)}
                    className="rounded-lg border px-4 py-2"
                  >
                    <ArrowUp size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => moveDown(index)}
                    className="rounded-lg border px-4 py-2"
                  >
                    <ArrowDown size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="rounded-lg bg-red-500 px-4 py-2 text-white"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <p className="text-sm text-gray-500">Order : {img.order}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

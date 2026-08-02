import { useEffect, useState } from "react";
import CategoryAPI from "../../api/category.api";

export default function CategoryModal({ open, onClose, category, refresh }) {
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
    } else {
      setName("");
    }
  }, [category]);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      setLoading(true);

      if (category) {
        await CategoryAPI.update(category._id, {
          name,
        });
      } else {
        await CategoryAPI.create({
          name,
        });
      }

      refresh();

      onClose();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl w-[450px] p-8">
        <h2 className="text-2xl font-bold mb-6">
          {category ? "Edit Category" : "New Category"}
        </h2>

        <label className="font-medium">Category Name</label>

        <input
          className="border rounded-xl w-full p-3 mt-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
        />

        <div className="flex justify-end gap-4 mt-8">
          <button onClick={onClose} className="px-6 py-3 rounded-xl border">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-black text-white"
          >
            {loading ? "Saving..." : category ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

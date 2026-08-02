import { useEffect, useState } from "react";

import CategoryAPI from "../../api/category.api";
import SubCategoryAPI from "../../api/subCategory.api";

export default function SubCategoryModal({ open, onClose, selected, refresh }) {
  const [name, setName] = useState("");

  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selected) {
      setName(selected.name);

      setCategory(selected.category?._id);
    } else {
      setName("");

      setCategory("");
    }
  }, [selected]);

  const fetchCategories = async () => {
    try {
      const res = await CategoryAPI.getAll();

      setCategories(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!open) return null;

  const handleSubmit = async () => {
    if (!name.trim()) {
      return alert("Enter Sub Category");
    }

    if (!category) {
      return alert("Select Category");
    }

    try {
      setLoading(true);

      if (selected) {
        await SubCategoryAPI.update(selected._id, {
          name,

          category,
        });
      } else {
        await SubCategoryAPI.create({
          name,

          category,
        });
      }

      refresh();

      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl w-[500px] p-8">
        <h2 className="text-2xl font-bold">
          {selected ? "Edit Sub Category" : "Create Sub Category"}
        </h2>

        <div className="mt-6">
          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-xl w-full p-3 mt-2"
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5">
          <label>Sub Category</label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-xl w-full p-3 mt-2"
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button onClick={onClose} className="border rounded-xl px-6 py-3">
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-black text-white rounded-xl px-6 py-3"
          >
            {loading ? "Saving..." : selected ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

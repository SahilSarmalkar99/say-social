import { useEffect, useState } from "react";

import CategoryAPI from "../../api/category.api";
import SubCategoryAPI from "../../api/subCategory.api";
import CompanyAPI from "../../api/company.api";

export default function CompanyModal({ open, onClose, selected, refresh }) {
  const [name, setName] = useState("");

  const [category, setCategory] = useState("");

  const [subCategory, setSubCategory] = useState("");

  const [categories, setCategories] = useState([]);

  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selected) {
      setName(selected.name);

      setCategory(selected.category?._id);

      setSubCategory(selected.subCategory?._id);
    } else {
      setName("");

      setCategory("");

      setSubCategory("");
    }
  }, [selected]);

  const loadData = async () => {
    const c = await CategoryAPI.getAll();

    const s = await SubCategoryAPI.getAll();

    setCategories(c.data.data);

    setSubCategories(s.data.data);
  };

  if (!open) return null;

  const handleSubmit = async () => {
    if (!name) {
      return alert("Enter company name");
    }

    if (selected) {
      await CompanyAPI.update(
        selected._id,

        {
          name,

          category,

          subCategory,
        },
      );
    } else {
      await CompanyAPI.create({
        name,

        category,

        subCategory,
      });
    }

    refresh();

    onClose();
  };

  const filteredSubCategories = subCategories.filter(
    (sub) => (sub.category?._id || sub.category) === category,
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-3xl w-[550px] p-8">
        <h2 className="text-2xl font-bold">
          {selected ? "Edit Company" : "New Company"}
        </h2>

        <div className="mt-6">
          <label>Category</label>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);

              setSubCategory("");
            }}
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

          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="border rounded-xl w-full p-3 mt-2"
          >
            <option value="">Select Sub Category</option>

            {filteredSubCategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5">
          <label>Company Name</label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-xl w-full p-3 mt-2"
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button onClick={onClose} className="border px-6 py-3 rounded-xl">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            {selected ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

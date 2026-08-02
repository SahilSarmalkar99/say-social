import { useEffect, useState } from "react";
import PortfolioAPI from "../api/portfolio.api";
import CategoryAPI from "../api/category.api";
import SubCategoryAPI from "../api/subCategory.api";
import { Trash2, Plus } from "lucide-react";

export default function PortfolioPage() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

  const [form, setForm] = useState({
    category: "",
    subCategory: "",
    previewVideo: "",
  });

  useEffect(() => {
    loadCategories();
    loadPortfolio();
  }, []);

  useEffect(() => {
    if (!form.category) return;
    loadSubCategories(form.category);
  }, [form.category]);

  async function loadCategories() {
    try {
      const res = await CategoryAPI.getAll();

      setCategories(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function loadSubCategories(categoryId) {
    try {
      const res = await SubCategoryAPI.getAll();

      // Filter if your API doesn't have a dedicated endpoint
      const filtered = res.data.data.filter((item) => {
        const catId =
          typeof item.category === "object"
            ? item.category?._id
            : item.category;

        return catId === categoryId;
      });

      setSubCategories(filtered);
    } catch (err) {
      console.log(err);
    }
  }

  async function loadPortfolio() {
    try {
      const res = await PortfolioAPI.getAll();
      setPortfolio(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.category || !form.subCategory || !form.previewVideo) {
      return alert("Fill all fields");
    }

    try {
      await PortfolioAPI.create(form);

      setForm({
        category: "",
        subCategory: "",
        previewVideo: "",
      });

      loadPortfolio();
    } catch (err) {
      console.log(err);
    }
  }

  async function remove(id) {
    if (!window.confirm("Delete Portfolio?")) return;

    await PortfolioAPI.delete(id);
    loadPortfolio();
  }

  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">Portfolio Manager</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 space-y-5"
      >
        <select
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
              subCategory: "",
            })
          }
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select Category</option>

          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={form.subCategory}
          onChange={(e) =>
            setForm({
              ...form,
              subCategory: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select Sub Category</option>

          {subCategories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Cloudinary Video URL"
          value={form.previewVideo}
          onChange={(e) =>
            setForm({
              ...form,
              previewVideo: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3"
        />

        <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2">
          <Plus size={18} />
          Add Portfolio
        </button>
      </form>

      <div className="mt-10 grid gap-6">
        {portfolio.map((item) => (
          <div
            key={item._id}
            className="border rounded-xl p-5 flex justify-between items-center"
          >
            <div className="flex gap-5 items-center">
              <video
                src={item.previewVideo}
                controls
                className="w-56 rounded-lg"
              />

              <div>
                <h3 className="font-semibold text-lg">{item.category?.name}</h3>

                <p className="text-gray-500">{item.subCategory?.name}</p>
              </div>
            </div>

            <button onClick={() => remove(item._id)} className="text-red-500">
              <Trash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

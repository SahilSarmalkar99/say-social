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
    <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-6 lg:p-8">
      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Portfolio Manager</h1>

          <p className="mt-2 text-gray-500">Manage portfolio preview videos.</p>
        </div>
      </div>

      {/* Form */}

      <div className="rounded-3xl border bg-white p-5 shadow-sm md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            {/* Category */}

            <div>
              <label className="mb-2 block text-sm font-medium">Category</label>

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                    subCategory: "",
                  })
                }
                className="w-full rounded-xl border p-3 outline-none focus:border-black"
              >
                <option value="">Select Category</option>

                {categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub Category */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Sub Category
              </label>

              <select
                value={form.subCategory}
                onChange={(e) =>
                  setForm({
                    ...form,
                    subCategory: e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3 outline-none focus:border-black"
              >
                <option value="">Select Sub Category</option>

                {subCategories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Video URL */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Preview Video URL
            </label>

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
              className="w-full rounded-xl border p-3 outline-none focus:border-black"
            />
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800 md:w-fit">
            <Plus size={18} />
            Add Portfolio
          </button>
        </form>
      </div>

      {/* Portfolio List */}

      <div>
        <h2 className="mb-6 text-2xl font-bold">Portfolio Items</h2>

        {portfolio.length === 0 ? (
          <div className="rounded-3xl border bg-white py-20 text-center text-gray-500">
            No Portfolio Items Found
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {portfolio.map((item) => (
              <div
                key={item._id}
                className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Video */}

                <div className="aspect-video bg-black">
                  <video
                    src={item.previewVideo}
                    controls
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Content */}

                <div className="space-y-4 p-5">
                  <div>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                      {item.category?.name}
                    </span>

                    <h3 className="mt-3 text-xl font-semibold">
                      {item.subCategory?.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => remove(item._id)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

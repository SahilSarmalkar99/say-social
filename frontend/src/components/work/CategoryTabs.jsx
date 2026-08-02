import { useEffect, useState } from "react";
import CategoryAPI from "../../api/categories.api";

export default function CategoryTabs({
  value,
  onChange,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const res = await CategoryAPI.getAll();

      setCategories([
        {
          _id: "all",
          name: "All",
        },
        ...res.data.data,
      ]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-5">
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => onChange(cat)}
          className={`
            rounded-full
            border
            px-7
            py-3
            transition-all
            duration-300

            ${
              value?._id === cat._id
                ? "bg-white/15 text-white border-white/20"
                : "border-white/10 text-white/60 hover:text-white"
            }
          `}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
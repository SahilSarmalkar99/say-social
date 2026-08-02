import { useEffect, useState } from "react";
import SubCategoryAPI from "../../api/subCategories.api";

export default function SubCategoryTabs({
  category,
  value,
  onChange,
}) {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    if (!category || category._id === "all") {
      setSubs([]);
      return;
    }

    loadSubCategories();
  }, [category]);

  async function loadSubCategories() {
    try {
      const res = await SubCategoryAPI.getAll();

      const filtered = res.data.data.filter((item) => {
        const id =
          typeof item.category === "object"
            ? item.category._id
            : item.category;

        return id === category._id;
      });

      setSubs([
        {
          _id: "all",
          name: "All",
        },
        ...filtered,
      ]);
    } catch (err) {
      console.log(err);
    }
  }

  if (!category || category._id === "all") return null;

  return (
    <div className="mt-16">
      <div className="flex justify-center">
        <div className="flex flex-wrap gap-10">
          {subs.map((sub) => (
            <button
              key={sub._id}
              onClick={() => onChange(sub)}
              className={`relative transition ${
                value?._id === sub._id
                  ? "text-white"
                  : "text-white/50"
              }`}
            >
              {sub.name}

              {value?._id === sub._id && (
                <span className="absolute left-0 -bottom-2 h-px w-full bg-white" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
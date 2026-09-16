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
    <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 w-full">
      <div className="w-full overflow-x-auto scrollbar-hide px-4 sm:px-6 md:px-8">
        <div
          className="
            flex
            w-max
            min-w-full
            justify-start
            sm:justify-center
            gap-6
            sm:gap-8
            md:gap-10
            lg:gap-12
            pb-3
          "
        >
          {subs.map((sub) => {
            const isActive = value?._id === sub._id;

            return (
              <button
                key={sub._id}
                onClick={() => onChange(sub)}
                className={`
                  relative
                  shrink-0
                  whitespace-nowrap
                  text-sm
                  sm:text-base
                  md:text-[15px]
                  lg:text-base
                  transition-all
                  duration-300
                  focus:outline-none
                  ${
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
                  }
                `}
              >
                {sub.name}

                {isActive && (
                  <span
                    className="
                      absolute
                      left-0
                      -bottom-2
                      h-px
                      w-full
                      bg-white
                    "
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
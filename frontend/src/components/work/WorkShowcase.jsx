import { useEffect, useState } from "react";

import PortfolioAPI from "../../api/portfolio.api";

import CategoryTabs from "./CategoryTabs";
import SubCategoryTabs from "./SubCategoryTabs";
import WorkGrid from "./WorkGrid";

export default function WorkShowcase() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const [category, setCategory] = useState({
    _id: "all",
    name: "All",
  });

  const [subCategory, setSubCategory] = useState({
    _id: "all",
    name: "All",
  });

  useEffect(() => {
    loadPortfolio();
  }, []);

  async function loadPortfolio() {
    try {
      setLoading(true);

      const res = await PortfolioAPI.getAll();

      setItems(res.data.data || []);
    } catch (err) {
      console.error("Failed to load portfolio:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredItems = items.filter((item) => {
    const categoryId =
      typeof item.category === "object"
        ? item.category?._id
        : item.category;

    const subCategoryId =
      typeof item.subCategory === "object"
        ? item.subCategory?._id
        : item.subCategory;

    const categoryMatch =
      category._id === "all" ||
      categoryId === category._id;

    const subCategoryMatch =
      subCategory._id === "all" ||
      subCategoryId === subCategory._id;

    return categoryMatch && subCategoryMatch;
  });

  return (
    <section className="w-full py-20 md:py-28 overflow-hidden">

      <CategoryTabs
        value={category}
        onChange={(cat) => {
          setCategory(cat);

          setSubCategory({
            _id: "all",
            name: "All",
          });
        }}
      />

      <SubCategoryTabs
        category={category}
        value={subCategory}
        onChange={setSubCategory}
      />

      <WorkGrid
        loading={loading}
        items={filteredItems}
      />

    </section>
  );
}
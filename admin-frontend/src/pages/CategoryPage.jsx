import { useEffect, useState } from "react";

import CategoryAPI from "../api/category.api";

import CategoryHeader from "../components/category/CategoryHeader";
import CategoryTable from "../components/category/CategoryTable";
import CategoryModal from "../components/category/CategoryModal";
import DeleteCategoryModal from "../components/category/DeleteCategoryModal";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await CategoryAPI.getAll();

      setCategories(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <CategoryHeader
        search={search}
        setSearch={setSearch}
        onCreate={() => {
          setSelectedCategory(null);
          setOpenModal(true);
        }}
      />

      <div className="mt-8">

        <CategoryTable
          categories={filtered}
          loading={loading}
          onEdit={(item) => {
            setSelectedCategory(item);
            setOpenModal(true);
          }}
          onDelete={(item) => {
            setSelectedCategory(item);
            setDeleteModal(true);
          }}
        />

      </div>

      <CategoryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        category={selectedCategory}
        refresh={fetchCategories}
      />

      <DeleteCategoryModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        category={selectedCategory}
        refresh={fetchCategories}
      />
    </>
  );
}
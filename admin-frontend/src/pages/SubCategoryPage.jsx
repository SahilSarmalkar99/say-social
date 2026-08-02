import { useEffect, useState } from "react";

import SubCategoryAPI from "../api/subCategory.api";

import SubCategoryHeader from "../components/subCategory/SubCategoryHeader";
import SubCategoryTable from "../components/subCategory/SubCategoryTable";
import SubCategoryModal from "../components/subCategory/SubCategoryModal";
import DeleteSubCategoryModal from "../components/subCategory/DeleteSubCategoryModal";

export default function SubCategoryPage() {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await SubCategoryAPI.getAll();

      setData(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  const filtered = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SubCategoryHeader
        search={search}
        setSearch={setSearch}
        onCreate={() => {
          setSelected(null);
          setOpen(true);
        }}
      />

      <div className="mt-8">

        <SubCategoryTable
          data={filtered}
          loading={loading}
          onEdit={(item) => {
            setSelected(item);
            setOpen(true);
          }}
          onDelete={(item) => {
            setSelected(item);
            setDeleteOpen(true);
          }}
        />

      </div>

      <SubCategoryModal
        open={open}
        onClose={() => setOpen(false)}
        selected={selected}
        refresh={fetchData}
      />

      <DeleteSubCategoryModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        selected={selected}
        refresh={fetchData}
      />
    </>
  );
}
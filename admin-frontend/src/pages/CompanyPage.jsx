import { useEffect, useState } from "react";

import CompanyAPI from "../api/company.api";

import CompanyHeader from "../components/company/CompanyHeader";
import CompanyTable from "../components/company/CompanyTable";
import CompanyModal from "../components/company/CompanyModal";
import DeleteCompanyModal from "../components/company/DeleteCompanyModal";

export default function CompanyPage() {
  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);

      const res = await CompanyAPI.getAll();

      setCompanies(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  const filtered = companies.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <CompanyHeader
        search={search}
        setSearch={setSearch}
        onCreate={() => {
          setSelected(null);
          setOpen(true);
        }}
      />

      <div className="mt-8">

        <CompanyTable
          companies={filtered}
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

      <CompanyModal
        open={open}
        onClose={() => setOpen(false)}
        selected={selected}
        refresh={fetchCompanies}
      />

      <DeleteCompanyModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        selected={selected}
        refresh={fetchCompanies}
      />
    </>
  );
}
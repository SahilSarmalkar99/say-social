import { Plus, Search } from "lucide-react";

export default function CompanyHeader({ search, setSearch, onCreate }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold">Companies</h1>

        <p className="text-gray-500 mt-2">Manage all companies</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-4 text-gray-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Company..."
            className="border rounded-xl pl-11 pr-5 py-3 w-80"
          />
        </div>

        <button
          onClick={onCreate}
          className="bg-black text-white px-6 py-3 rounded-xl flex gap-2 items-center"
        >
          <Plus size={18} />
          New Company
        </button>
      </div>
    </div>
  );
}

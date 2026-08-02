import { Search, Plus } from "lucide-react";

export default function SubCategoryHeader({ search, setSearch, onCreate }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold">Sub Categories</h1>

        <p className="text-gray-500 mt-2">Manage all sub categories</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-4 text-gray-400" />

          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 pr-5 py-3 border rounded-xl w-80"
          />
        </div>

        <button
          onClick={onCreate}
          className="bg-black text-white rounded-xl px-6 py-3 flex items-center gap-2"
        >
          <Plus size={18} />
          New Sub Category
        </button>
      </div>
    </div>
  );
}

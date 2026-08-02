import { Search, Plus } from "lucide-react";

export default function CategoryHeader({
  search,
  setSearch,
  onCreate,
}) {
  return (
    <div className="flex justify-between items-center">

      <div>

        <h1 className="text-4xl font-bold">

          Categories

        </h1>

        <p className="text-gray-500 mt-2">

          Manage all categories

        </p>

      </div>

      <button
        onClick={onCreate}
        className="bg-black text-white rounded-xl px-6 py-3 flex items-center gap-2"
      >
        <Plus size={18} />

        New Category

      </button>

      <div className="relative ml-6">

        <Search
          className="absolute left-4 top-4 text-gray-400"
          size={18}
        />

        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl pl-11 pr-5 py-3 w-80"
        />

      </div>

    </div>
  );
}
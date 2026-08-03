import { Search, Plus } from "lucide-react";

export default function CategoryHeader({
  search,
  setSearch,
  onCreate,
}) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Categories
        </h1>

        <p className="mt-2 text-gray-500">
          Manage all categories
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border py-3 pl-11 pr-5 outline-none focus:border-black"
          />
        </div>

        {/* Button */}
        <button
          onClick={onCreate}
          className="flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-white whitespace-nowrap hover:bg-gray-800 transition"
        >
          <Plus size={18} />
          New Category
        </button>
      </div>
    </div>
  );
}
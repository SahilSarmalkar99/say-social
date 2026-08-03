import { Plus, Search } from "lucide-react";

export default function CompanyHeader({
  search,
  setSearch,
  onCreate,
}) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Companies
        </h1>

        <p className="mt-2 text-gray-500">
          Manage all companies
        </p>
      </div>

      {/* Right */}
      <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Company..."
            className="w-full rounded-xl border py-3 pl-11 pr-5 outline-none transition focus:border-black"
          />
        </div>

        {/* Button */}
        <button
          onClick={onCreate}
          className="flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-white whitespace-nowrap transition hover:bg-gray-800"
        >
          <Plus size={18} />
          New Company
        </button>
      </div>
    </div>
  );
}
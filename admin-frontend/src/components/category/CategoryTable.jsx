import { Pencil, Trash2 } from "lucide-react";

export default function CategoryTable({
  categories,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="rounded-3xl border bg-white py-20 text-center text-gray-500">
        No Categories Found
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow">
      <div className="overflow-x-auto">
        <table className="min-w-[650px] w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 md:px-6 py-4 text-left font-semibold">
                Name
              </th>

              <th className="px-4 py-4 text-left font-semibold">
                Created
              </th>

              <th className="px-4 py-4 text-center font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr
                key={category._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 md:px-6 py-5 font-medium">
                  {category.name}
                </td>

                <td className="px-4 py-5 text-gray-500 whitespace-nowrap">
                  {new Date(category.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-5">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(category)}
                      className="rounded-lg p-2 transition hover:bg-gray-100"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(category)}
                      className="rounded-lg p-2 transition hover:bg-red-50"
                    >
                      <Trash2
                        size={18}
                        className="text-red-500"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
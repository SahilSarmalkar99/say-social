import { Pencil, Trash2 } from "lucide-react";

export default function CompanyTable({
  companies,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="rounded-3xl border bg-white py-20 text-center text-gray-500">
        No Companies Found
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow">
      <div className="overflow-x-auto">
        <table className="min-w-[750px] w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 md:px-6 py-4 text-left font-semibold">
                Category
              </th>

              <th className="px-4 py-4 text-left font-semibold">
                Sub Category
              </th>

              <th className="px-4 py-4 text-left font-semibold">
                Company
              </th>

              <th className="px-4 py-4 text-center font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {companies.map((company) => (
              <tr
                key={company._id}
                className="border-t transition hover:bg-gray-50"
              >
                <td className="px-4 md:px-6 py-5 whitespace-nowrap">
                  {company.category?.name || "-"}
                </td>

                <td className="px-4 py-5 whitespace-nowrap">
                  {company.subCategory?.name || "-"}
                </td>

                <td className="px-4 py-5 font-medium">
                  {company.name}
                </td>

                <td className="px-4 py-5">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(company)}
                      className="rounded-lg p-2 transition hover:bg-gray-100"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(company)}
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
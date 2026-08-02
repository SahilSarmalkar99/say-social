import { Pencil, Trash2 } from "lucide-react";

export default function CompanyTable({ companies, loading, onEdit, onDelete }) {
  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-5">Category</th>

            <th className="text-left">Sub Category</th>

            <th className="text-left">Company</th>

            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((company) => (
            <tr key={company._id} className="border-t">
              <td className="p-5">{company.category?.name}</td>

              <td>{company.subCategory?.name}</td>

              <td>{company.name}</td>

              <td>
                <div className="flex justify-center gap-4">
                  <button onClick={() => onEdit(company)}>
                    <Pencil size={18} />
                  </button>

                  <button onClick={() => onDelete(company)}>
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

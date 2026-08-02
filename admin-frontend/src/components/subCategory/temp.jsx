import { Pencil, Trash2 } from "lucide-react";

export default function SubCategoryTable({
  data,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading)
    return <div className="py-16 text-center">Loading...</div>;

  return (
    <div className="bg-white rounded-3xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left p-5">Category</th>

            <th className="text-left">Sub Category</th>

            <th className="text-center">Actions</th>

          </tr>

        </thead>

        <tbody>

          {data.map((item) => (

            <tr key={item._id} className="border-t">

              <td className="p-5">

                {item.category?.name}

              </td>

              <td>

                {item.name}

              </td>

              <td>

                <div className="flex justify-center gap-4">

                  <button onClick={() => onEdit(item)}>
                    <Pencil size={18} />
                  </button>

                  <button onClick={() => onDelete(item)}>
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
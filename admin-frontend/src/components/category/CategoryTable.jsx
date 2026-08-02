import { Pencil, Trash2 } from "lucide-react";

export default function CategoryTable({
  categories,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading)
    return (
      <div className="text-center py-16">

        Loading...

      </div>
    );

  if (categories.length === 0)
    return (
      <div className="text-center py-20 border rounded-3xl bg-white">

        No Categories Found

      </div>
    );

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left px-6 py-4">

              Name

            </th>

            <th className="text-left">

              Created

            </th>

            <th className="text-center">

              Actions

            </th>

          </tr>

        </thead>

        <tbody>

          {categories.map((category) => (
            <tr
              key={category._id}
              className="border-t"
            >

              <td className="px-6 py-5">

                {category.name}

              </td>

              <td>

                {new Date(category.createdAt).toLocaleDateString()}

              </td>

              <td>

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(category)}
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(category)}
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
  );
}
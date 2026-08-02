import { Save, Trash2, User } from "lucide-react";

export default function TeamMemberCard({
  member,
  onChange,
  onSave,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b px-6 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
            <User size={20} className="text-blue-600" />
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              {member.name || "New Member"}
            </h3>

            <p className="text-sm text-gray-500">
              {member.role || "Role"}
            </p>
          </div>

        </div>

      </div>

      {/* Body */}

      <div className="grid gap-8 p-6 lg:grid-cols-4">

        {/* Photo */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Photo URL
          </label>

          <input
            type="text"
            value={member.photo}
            placeholder="https://..."
            onChange={(e) =>
              onChange(member._id, "photo", e.target.value)
            }
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          />

          <div className="mt-5 flex justify-center">

            {member.photo ? (
              <img
                src={member.photo}
                alt={member.name}
                className="h-36 w-36 rounded-xl border object-cover"
              />
            ) : (
              <div className="flex h-36 w-36 items-center justify-center rounded-xl border bg-gray-100 text-gray-400">
                No Image
              </div>
            )}

          </div>

        </div>

        {/* Name */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Name
          </label>

          <input
            type="text"
            value={member.name}
            placeholder="Member Name"
            onChange={(e) =>
              onChange(member._id, "name", e.target.value)
            }
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          />

        </div>

        {/* Role */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Role
          </label>

          <input
            type="text"
            value={member.role}
            placeholder="Frontend Developer"
            onChange={(e) =>
              onChange(member._id, "role", e.target.value)
            }
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          />

        </div>

        {/* Actions */}

        <div className="flex flex-col justify-end gap-3">

          <button
            type="button"
            onClick={() => onSave(member)}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700"
          >
            <Save size={18} />
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => onDelete(member._id)}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-3 text-white transition hover:bg-red-600"
          >
            <Trash2 size={18} />
            Delete Member
          </button>

        </div>

      </div>

    </div>
  );
}
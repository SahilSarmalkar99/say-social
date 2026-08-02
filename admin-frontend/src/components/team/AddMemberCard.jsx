import { Plus, Trash2, UserPlus, Save } from "lucide-react";

export default function AddMemberCard({
  members,
  setMembers,
  onSaveAll,
}) {
  const addMember = () => {
    setMembers([
      ...members,
      {
        photo: "",
        name: "",
        role: "",
      },
    ]);
  };

  const removeMember = (index) => {
    const updated = [...members];
    updated.splice(index, 1);
    setMembers(updated);
  };

  const updateField = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
            <UserPlus className="text-green-600" size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Add Team Members
            </h2>

            <p className="text-sm text-gray-500">
              Add one or multiple members.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={addMember}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Form
        </button>

      </div>

      {/* Members */}

      <div className="space-y-8 p-6">

        {members.map((member, index) => (
          <div
            key={index}
            className="rounded-xl border p-5"
          >
            <div className="mb-5 flex items-center justify-between">

              <h3 className="font-semibold">
                Member {index + 1}
              </h3>

              {members.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMember(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              )}

            </div>

            <div className="grid gap-6 lg:grid-cols-4">

              {/* Photo */}

              <div>

                <input
                  type="text"
                  placeholder="Photo URL"
                  value={member.photo}
                  onChange={(e) =>
                    updateField(index, "photo", e.target.value)
                  }
                  className="w-full rounded-lg border p-3"
                />

                <div className="mt-4 flex justify-center">

                  {member.photo ? (
                    <img
                      src={member.photo}
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

              <input
                type="text"
                placeholder="Name"
                value={member.name}
                onChange={(e) =>
                  updateField(index, "name", e.target.value)
                }
                className="rounded-lg border p-3 h-fit"
              />

              {/* Role */}

              <input
                type="text"
                placeholder="Role"
                value={member.role}
                onChange={(e) =>
                  updateField(index, "role", e.target.value)
                }
                className="rounded-lg border p-3 h-fit"
              />

            </div>

          </div>
        ))}

      </div>

      {/* Footer */}

      <div className="border-t p-6 flex justify-end">

        <button
          type="button"
          onClick={onSaveAll}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          <Save size={18} />
          Save All Members
        </button>

      </div>

    </div>
  );
}
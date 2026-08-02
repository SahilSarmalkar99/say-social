import CompanyAPI from "../../api/company.api";

export default function DeleteCompanyModal({
  open,
  onClose,
  selected,
  refresh,
}) {
  if (!open || !selected) return null;

  const handleDelete = async () => {
    await CompanyAPI.remove(selected._id);

    refresh();

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-3xl w-[430px] p-8">
        <h2 className="text-2xl font-bold">Delete Company</h2>

        <p className="mt-5 text-gray-500">
          Delete
          <span className="font-semibold"> {selected.name}</span>?
        </p>

        <div className="flex justify-end gap-4 mt-8">
          <button onClick={onClose} className="border rounded-xl px-6 py-3">
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white rounded-xl px-6 py-3"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

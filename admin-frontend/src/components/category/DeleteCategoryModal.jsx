import CategoryAPI from "../../api/category.api";

export default function DeleteCategoryModal({
  open,
  onClose,
  category,
  refresh,
}) {
  if (!open || !category) return null;

  const handleDelete = async () => {
    try {
      await CategoryAPI.remove(category._id);

      refresh();

      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl p-8 w-[420px]">
        <h2 className="text-2xl font-bold">Delete Category</h2>

        <p className="text-gray-500 mt-4">
          Are you sure you want to delete
          <span className="font-semibold"> {category.name}</span>?
        </p>

        <div className="flex justify-end gap-4 mt-8">
          <button onClick={onClose} className="px-6 py-3 rounded-xl border">
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-6 py-3 rounded-xl bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

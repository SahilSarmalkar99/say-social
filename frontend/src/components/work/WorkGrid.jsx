import WorkCard from "./WorkCard";

export default function WorkGrid({
  items,
  loading,
}) {
  if (loading) {
    return (
      <div className="py-40 text-center text-white">
        Loading...
      </div>
    );
  }

  const safeItems = Array.isArray(items) ? items : [];

  if (safeItems.length === 0) {
    return (
      <div className="py-40 text-center text-white/60">
        No Projects Found
      </div>
    );
  }

  return (
    <div className="mt-16 space-y-8">
      {safeItems.map((item) => (
        <WorkCard
          key={item._id}
          item={item}
        />
      ))}
    </div>
  );
}
import {
  Pencil,
  Trash2,
  ExternalLink,
  GitBranch,
  Star,
} from "lucide-react";

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      {/* Thumbnail */}

      <div className="relative aspect-[16/10] overflow-hidden">

        <img
          src={project.thumbnail}
          alt={project.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Featured */}

        {project.featured && (
          <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-sm font-semibold text-black shadow-lg">
            <Star size={14} fill="currentColor" />
            Featured
          </div>
        )}

        {/* Category */}

        {project.category && (
          <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {project.category}
          </div>
        )}

      </div>

      {/* Content */}

      <div className="space-y-5 p-6">

        {/* Title */}

        <div>

          <h2 className="line-clamp-1 text-xl font-bold">
            {project.title}
          </h2>

          <p className="mt-2 line-clamp-3 text-sm text-gray-500">
            {project.description || "No description"}
          </p>

        </div>


      </div>

      {/* Footer */}

      <div className="flex border-t">

        <button
          onClick={onEdit}
          className="flex flex-1 items-center justify-center gap-2 border-r py-4 font-medium transition hover:bg-gray-100"
        >
          <Pencil size={18} />
          Edit
        </button>

        <button
          onClick={onDelete}
          className="flex flex-1 items-center justify-center gap-2 py-4 text-red-500 transition hover:bg-red-50"
        >
          <Trash2 size={18} />
          Delete
        </button>

      </div>

    </div>
  );
}
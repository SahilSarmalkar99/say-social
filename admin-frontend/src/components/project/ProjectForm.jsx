import { FileText } from "lucide-react";

export default function ProjectForm({
  project,
  onFieldChange,
  onTitleChange,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-3 border-b px-6 py-5">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
          <FileText
            className="text-indigo-600"
            size={22}
          />
        </div>

        <div>

          <h2 className="text-xl font-bold">
            Project Details
          </h2>

          <p className="text-sm text-gray-500">
            Basic information about your project.
          </p>

        </div>

      </div>

      {/* Body */}

      <div className="grid gap-6 p-6 lg:grid-cols-2">

        {/* Title */}

        <div className="lg:col-span-2">

          <label className="mb-2 block text-sm font-medium">
            Project Title
          </label>

          <input
            type="text"
            value={project.title}
            placeholder="Netflix Landing Page"
            onChange={(e) =>
              onTitleChange(e.target.value)
            }
            className="w-full rounded-xl border p-3 outline-none transition focus:border-black"
          />

        </div>

        {/* Slug */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Slug
          </label>

          <input
            type="text"
            value={project.slug}
            placeholder="netflix-landing-page"
            onChange={(e) =>
              onFieldChange(
                "slug",
                e.target.value
              )
            }
            className="w-full rounded-xl border p-3 outline-none transition focus:border-black"
          />

        </div>

        {/* Category */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

          <input
            type="text"
            value={project.category}
            placeholder="Web Design"
            onChange={(e) =>
              onFieldChange(
                "category",
                e.target.value
              )
            }
            className="w-full rounded-xl border p-3 outline-none transition focus:border-black"
          />

        </div>

        {/* Description */}

        <div className="lg:col-span-2">

          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <textarea
            rows={6}
            value={project.description}
            placeholder="Write a detailed description..."
            onChange={(e) =>
              onFieldChange(
                "description",
                e.target.value
              )
            }
            className="w-full rounded-xl border p-3 outline-none transition focus:border-black resize-none"
          />

        </div>



        {/* Featured */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Featured Project
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4">

            <input
              type="checkbox"
              checked={project.featured}
              onChange={(e) =>
                onFieldChange(
                  "featured",
                  e.target.checked
                )
              }
            />

            <span>
              Show this project in the Featured section
            </span>

          </label>

        </div>

        {/* Status */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Status
          </label>

          <select
            value={project.status}
            onChange={(e) =>
              onFieldChange(
                "status",
                e.target.value
              )
            }
            className="w-full rounded-xl border p-3 outline-none"
          >
            <option value="published">
              Published
            </option>

            <option value="draft">
              Draft
            </option>
          </select>

        </div>

      </div>

    </div>
  );
}
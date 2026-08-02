import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProjectAPI from "../../api/project.api";

import ProjectForm from "./ProjectForm";
import ThumbnailUploader from "./ThumbnailUploader";
import TechStackInput from "./TechStackInput";
import ImageGalleryManager from "./ImageGalleryManager";

export default function ProjectEditorPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  console.log("Current Route:", window.location.pathname);
  console.log("ID:", id);

  const isEdit = Boolean(id && id !== "new");

  const [loading, setLoading] = useState(isEdit);

  const [saving, setSaving] = useState(false);

  const [project, setProject] = useState({
    title: "",
    slug: "",
    description: "",
    thumbnail: "",
    category: "",
    techStack: [],
    liveLink: "",
    githubLink: "",
    featured: false,
    status: "published",
    images: [],
  });

  useEffect(() => {
    if (isEdit) {
      fetchProject();
    } else {
      setLoading(false);
    }
  }, [id]);

  async function fetchProject() {
    try {
      setLoading(true);

      const { data } = await ProjectAPI.getById(id);

      setProject({
        title: data.title || "",
        slug: data.slug || "",
        description: data.description || "",
        thumbnail: data.thumbnail || "",
        category: data.category || "",
        techStack: data.techStack || [],
        liveLink: data.liveLink || "",
        githubLink: data.githubLink || "",
        featured: data.featured || false,
        status: data.status || "published",
        images: data.images || [],
      });
    } catch (err) {
      console.log(err);
      alert("Unable to load project.");
    } finally {
      setLoading(false);
    }
  }

  function updateField(field, value) {
    setProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function generateSlug(title) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  function handleTitleChange(value) {
    setProject((prev) => ({
      ...prev,
      title: value,
      slug: generateSlug(value),
    }));
  }

  async function saveProject() {
    if (!project.title.trim()) return alert("Title is required.");

    if (!project.thumbnail.trim()) return alert("Thumbnail is required.");

    if (project.images.length === 0)
      return alert("Add at least one project image.");

    try {
      setSaving(true);

      console.log({
        id,
        isEdit,
      });

      if (isEdit) {
        await ProjectAPI.update(id, project);
      } else {
        await ProjectAPI.create(project);
      }

      alert(
        isEdit
          ? "Project Updated Successfully"
          : "Project Created Successfully",
      );

      navigate("/project");
    } catch (err) {
      console.log(err);
      alert("Failed to save project.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-lg font-semibold">Loading Project...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-8">
      {/* Header */}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {isEdit ? "Edit Project" : "Create Project"}
          </h1>

          <p className="text-gray-500">Manage your portfolio project.</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/project")}
            className="rounded-xl border px-6 py-3"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            onClick={saveProject}
            className="rounded-xl bg-black px-6 py-3 text-white"
          >
            {saving ? "Saving..." : "Save Project"}
          </button>
        </div>
      </div>

      {/* Thumbnail */}

      <ThumbnailUploader
        thumbnail={project.thumbnail}
        onChange={(value) => updateField("thumbnail", value)}
      />

      {/* Main Form */}

      <ProjectForm
        project={project}
        onFieldChange={updateField}
        onTitleChange={handleTitleChange}
      />

      {/* Images */}

      <ImageGalleryManager
        images={project.images}
        onChange={(images) => updateField("images", images)}
      />
    </div>
  );
}

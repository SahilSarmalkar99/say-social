import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Loader2, FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ProjectAPI from "../api/project.api";
import ProjectCard from "../components/project/ProjectCard";

export default function ProjectsPage() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      setLoading(true);

      const { data } = await ProjectAPI.getAll();

      console.log(data); // <-- Add this

      setProjects(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProject(id) {
    if (!window.confirm("Delete this project?")) return;

    try {
      await ProjectAPI.delete(id);

      fetchProjects();
    } catch (err) {
      console.log(err);
      alert("Delete failed.");
    }
  }

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [projects, search]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      {/* Header */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>

          <p className="mt-1 text-gray-500">Manage portfolio projects.</p>
        </div>

        <button
          onClick={() => navigate("/project/new")}
          className="flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800"
        >
          <Plus size={18} />
          Create Project
        </button>
      </div>

      {/* Search */}

      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Projects..."
          className="w-full rounded-xl border bg-white py-3 pl-12 pr-4 outline-none focus:border-black"
        />
      </div>

      {/* Loading */}

      {loading && (
        <div className="flex justify-center py-24">
          <Loader2 className="animate-spin" size={45} />
        </div>
      )}

      {/* Empty */}

      {!loading && filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border bg-white py-24">
          <FolderOpen size={60} className="text-gray-300" />

          <h2 className="mt-5 text-2xl font-semibold">No Projects</h2>

          <p className="mt-2 text-gray-500">Create your first project.</p>

          <button
            onClick={() => navigate("/project/new")}
            className="mt-8 rounded-xl bg-black px-6 py-3 text-white"
          >
            Create Project
          </button>
        </div>
      )}

      {/* Grid */}

      {!loading && filteredProjects.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={() => navigate(`/project/${project._id}`)}
              onDelete={() => deleteProject(project._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

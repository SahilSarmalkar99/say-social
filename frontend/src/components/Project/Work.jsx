import { useEffect, useState } from "react";
import ProjectAPI from "../../api/project.api";
import ProjectCard from "./ProjectCard";

export default function Work() {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const data = await ProjectAPI.getAll();

      setProjects(
        data.filter(
          (project) => project.status === "published"
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        Loading...
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20 px-4 md:px-8">
      <div className="max-w-[1700px] mx-auto space-y-12">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}
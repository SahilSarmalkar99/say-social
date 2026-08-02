import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import ProjectAPI from "../../api/project.api";

export default function ProjectDetails() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [slug]);

  async function fetchProject() {
    try {
      const data = await ProjectAPI.getBySlug(slug);

      setProject(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Project not found
      </div>
    );
  }

  return (
    <>
      <Navbar visible={true} />

      <main className="bg-black pt-24">

        <section className="max-w-7xl mx-auto px-6 py-16">

          <h1 className="text-6xl font-bold text-white">
            {project.title}
          </h1>

          <p className="text-gray-400 mt-6 max-w-3xl">
            {project.description}
          </p>

        </section>

        {project.images
          ?.sort((a, b) => a.order - b.order)
          .map((img) => (
            <img
              key={img._id}
              src={img.image}
              alt={img.alt || project.title}
              className="w-full block"
              loading="lazy"
            />
          ))}

      </main>
    </>
  );
}
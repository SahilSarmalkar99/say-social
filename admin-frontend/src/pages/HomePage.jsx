import { useState } from "react";
import HomeForm from "../components/home/HomeForm";
import HomePreview from "../components/preview/HomePreview";

export default function HomePage() {
  const [formData, setFormData] = useState({
    section: "",

    videos: [
      {
        url: "",
        category: "",
        subCategory: "",
        company: "",
      },
    ],
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Home Section</h1>

        <p className="text-gray-500 mt-2">Manage your landing page sections.</p>
      </div>

      <HomeForm formData={formData} setFormData={setFormData} />

      <div className="mt-10">
        <HomePreview formData={formData} />
      </div>
    </div>
  );
}

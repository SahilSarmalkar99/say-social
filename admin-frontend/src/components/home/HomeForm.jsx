import { useEffect, useState } from "react";

import CategoryAPI from "../../api/category.api";
import CompanyAPI from "../../api/company.api";
import SubCategoryAPI from "../../api/subCategory.api";
import { HOME_SECTIONS } from "../../constants/homeSections";
import HomeAPI from "../../api/home.api";

export default function HomeForm({ formData, setFormData }) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (!formData.section) return;

    fetchSectionData(formData.section);
  }, [formData.section]);

  const fetchSectionData = async (section) => {
    try {
      const res = await HomeAPI.getBySection(section);

      setFormData({
        _id: res.data.data._id,
        section: res.data.data.section,
        videos: res.data.data.videos,
      });
    } catch (err) {
      if (err.response?.status === 404) {
        setFormData({
          _id: null,
          section,
          videos: [
            {
              url: "",
              category: "",
              subCategory: "",
              company: "",
            },
          ],
        });
      }
    }
  };

  const handleSave = async () => {
    try {
      if (!formData.section) {
        alert("Please select a section.");
        return;
      }

      if (formData.videos.length === 0) {
        alert("Please add at least one video.");
        return;
      }

      const payload = {
        section: formData.section,
        videos: formData.videos,
      };

      let res;

      if (formData._id) {
        res = await HomeAPI.update(formData._id, payload);
      } else {
        res = await HomeAPI.create(payload);
      }

      alert(res.data.message);

      alert(res.data.message || "Section saved successfully");
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Failed to save section.");
    }
  };

  const handleDelete = async () => {
    if (!formData._id) return;

    await HomeAPI.remove(formData._id);

    alert("Deleted");

    setFormData({
      _id: null,
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
  };

  const selectedSection = HOME_SECTIONS.find(
    (item) => item.value === formData.section,
  );

  const maxVideos = selectedSection?.maxVideos || 1;

  const fetchData = async () => {
    try {
      const c = await CategoryAPI.getAll();
      const s = await SubCategoryAPI.getAll();
      const co = await CompanyAPI.getAll();

      setCategories(c.data.data || []);
      setSubCategories(s.data.data || []);
      setCompanies(co.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const updateSection = (value) => {
    setFormData((prev) => ({
      ...prev,
      section: value,
    }));
  };

  const updateVideo = (index, field, value) => {
    const temp = [...formData.videos];

    temp[index][field] = value;

    setFormData({
      ...formData,
      videos: temp,
    });
  };

  const addVideo = () => {
    if (formData.videos.length >= maxVideos) return;

    setFormData({
      ...formData,
      videos: [
        ...formData.videos,
        {
          url: "",
          category: "",
          subCategory: "",
          company: "",
        },
      ],
    });
  };

  const removeVideo = (index) => {
    if (formData.videos.length === 1) return;

    setFormData({
      ...formData,
      videos: formData.videos.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <div>
        <label className="block font-semibold mb-2">Section</label>

        <select
          className="w-full border rounded-xl p-3"
          value={formData.section}
          onChange={(e) => updateSection(e.target.value)}
        >
          <option value="">Select Section</option>

          {HOME_SECTIONS.map((section) => (
            <option key={section.value} value={section.value}>
              {section.label}
            </option>
          ))}
        </select>
      </div>

      {/* Videos */}

      <div className="mt-10 space-y-8">
        {formData.videos.map((video, index) => (
          <div key={index} className="border rounded-2xl p-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg">Video {index + 1}</h2>

              {formData.videos.length > 1 && (
                <button
                  onClick={() => removeVideo(index)}
                  className="text-red-500 font-medium hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="mt-5">
              <label className="block mb-2 text-sm font-medium">
                Video URL
              </label>

              <input
                className="w-full border rounded-xl p-3"
                placeholder="https://..."
                value={video.url}
                onChange={(e) => updateVideo(index, "url", e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-5 mt-6">
              {/* Category */}

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Category
                </label>

                <select
                  className="w-full border rounded-xl p-3"
                  value={video.category}
                  onChange={(e) =>
                    updateVideo(index, "category", e.target.value)
                  }
                >
                  <option value="">Select Category</option>

                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub Category */}

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Sub Category
                </label>

                <select
                  className="w-full border rounded-xl p-3"
                  value={video.subCategory}
                  onChange={(e) =>
                    updateVideo(index, "subCategory", e.target.value)
                  }
                >
                  <option value="">Select Sub Category</option>

                  {subCategories
                    .filter(
                      (sub) =>
                        !video.category ||
                        sub.category === video.category ||
                        sub.category?._id === video.category,
                    )
                    .map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Company */}

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Company
                </label>

                <select
                  className="w-full border rounded-xl p-3"
                  value={video.company}
                  onChange={(e) =>
                    updateVideo(index, "company", e.target.value)
                  }
                >
                  <option value="">Select Company</option>

                  {companies
                    .filter(
                      (company) =>
                        !video.subCategory ||
                        company.subCategory === video.subCategory ||
                        company.subCategory?._id === video.subCategory,
                    )
                    .map((company) => (
                      <option key={company._id} value={company._id}>
                        {company.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}

      <div className="mt-8 flex justify-center">
        <button
          disabled={formData.videos.length >= maxVideos}
          onClick={addVideo}
          className={`px-6 py-3 rounded-xl text-white transition

        ${
          formData.videos.length >= maxVideos
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }

        `}
        >
          Add Video ({formData.videos.length}/{maxVideos})
        </button>
      </div>

      {/* Action Buttons */}

      <div className="flex justify-end gap-4 mt-10">
        <button
          onClick={handleDelete}
          className="px-8 py-3 rounded-xl bg-red-500 text-white"
        >
          Delete
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="px-8 py-3 rounded-xl bg-black text-white hover:bg-gray-800"
        >
          Save Section
        </button>
      </div>
    </div>
  );
}

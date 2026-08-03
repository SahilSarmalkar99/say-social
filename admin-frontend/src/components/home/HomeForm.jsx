import { useEffect, useState } from "react";

import CategoryAPI from "../../api/category.api";
import CompanyAPI from "../../api/company.api";
import SubCategoryAPI from "../../api/subCategory.api";
import { HOME_SECTIONS } from "../../constants/homeSections";
import HomeAPI from "../../api/home.api";
import WorkEditor from "./WorkEditor";
import VideoEditor from "./VideoEditor";

export default function HomeForm({ formData, setFormData }) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (!formData.section) return;
    if (categories.length === 0) return;

    console.log("Fetching:", formData.section);

    fetchSectionData(formData.section);
  }, [formData.section, categories]);

  const fetchSectionData = async (section) => {
    try {
      const res = await HomeAPI.getBySection(section);

      const data = res.data.data;

      const existing = data.workCategories || [];

      const merged = categories.map((cat) => {
        const item = existing.find(
          (x) => String(x.category?._id || x.category) === String(cat._id),
        );

        return (
          item ?? {
            category: cat._id,
            videos: [],
          }
        );
      });

      setFormData({
        _id: data._id,
        section: data.section,
        videos: data.videos || [],
        workCategories: merged,
      });
    } catch (err) {
      if (err.response?.status === 404) {
        setFormData({
          _id: null,
          section,
          videos: [
  {
    url: "",
    category: null,
    subCategory: null,
    company: null,
  },
],
          workCategories: categories.map((cat) => ({
            category: cat._id,
            videos: [],
          })),
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

      if (formData.section !== "work" && formData.videos.length === 0) {
        alert("Please add at least one video.");
        return;
      }

      if (
        formData.section === "work" &&
        formData.workCategories.every((c) => c.videos.length === 0)
      ) {
        alert("Please add at least one work video.");
        return;
      }

      const payload = {
        section: formData.section,
      };

      if (formData.section === "work") {
        // console.log("Saving Work Categories:");
        // console.log(JSON.stringify(formData.workCategories, null, 2));
        payload.workCategories = formData.workCategories;
      } else {
       payload.videos = formData.videos.map((video) => ({
  ...video,
  category: video.category || null,
  subCategory: video.subCategory || null,
  company: video.company || null,
}));
      }

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
    category: null,
    subCategory: null,
    company: null,
  },
],
      workCategories: [],
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
  category: null,
  subCategory: null,
  company: null,
}
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
        {formData.section === "work" ? (
          <WorkEditor
            categories={categories}
            subCategories={subCategories}
            companies={companies}
            formData={formData}
            setFormData={setFormData}
          />
        ) : (
          <>
            <VideoEditor
              categories={categories}
              subCategories={subCategories}
              companies={companies}
              formData={formData}
              setFormData={setFormData}
            />
          </>
        )}
      </div>

      {/* Add Button */}

      {formData.section !== "work" && (
        <div className="mt-8 flex justify-center">
          <button
            disabled={formData.videos.length >= maxVideos}
            onClick={addVideo}
            className={`px-6 py-3 rounded-xl text-white transition
      ${
        formData.videos.length >= maxVideos
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700"
      }`}
          >
            Add Video ({formData.videos.length}/{maxVideos})
          </button>
        </div>
      )}

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

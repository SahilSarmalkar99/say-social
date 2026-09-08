import React, { useEffect, useState } from "react";
import {
  createLogo,
  getAllLogos,
  updateLogo,
  deleteLogo,
} from "../api/adminContentApi";

export default function AdminLogos() {
  const [logos, setLogos] = useState([]);
  const [form, setForm] = useState({ name: "", cloudUri: "", alt: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadLogos = async () => {
    try {
      setLoading(true);
      const res = await getAllLogos();
      setLogos(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load logos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.cloudUri.trim()) return setError("Cloud URI is required");

    try {
      setSaving(true);
      setError("");

      if (editingId) {
        await updateLogo(editingId, form);
      } else {
        await createLogo(form);
      }

      setForm({ name: "", cloudUri: "", alt: "" });
      setEditingId(null);
      await loadLogos();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save logo");
    } finally {
      setSaving(false);
    }
  };

  const editLogo = (logo) => {
    setEditingId(logo._id);
    setForm({
      name: logo.name || "",
      cloudUri: logo.cloudUri || "",
      alt: logo.alt || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeLogo = async (id) => {
    if (!window.confirm("Delete this logo?")) return;

    try {
      await deleteLogo(id);
      await loadLogos();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete logo");
    }
  };

  const toggleActive = async (logo) => {
    try {
      await updateLogo(logo._id, { isActive: !logo.isActive });
      await loadLogos();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update logo");
    }
  };

  return (
    <div className="min-h-screen bg-[#08080d] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-violet-400 mb-2">ADMIN PANEL</p>
          <h1 className="text-3xl md:text-5xl font-light">Trust Logos</h1>
          <p className="text-white/50 mt-2">
            Add cloud-hosted logos that will appear in your public trust carousel.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-red-200">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-7 mb-8"
        >
          <h2 className="text-xl font-medium mb-5">
            {editingId ? "Edit Logo" : "Add New Logo"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Company name (optional)"
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-violet-400"
            />

            <input
              required
              type="url"
              value={form.cloudUri}
              onChange={(e) => setForm({ ...form, cloudUri: e.target.value })}
              placeholder="Cloud image URI *"
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-violet-400"
            />

            <input
              value={form.alt}
              onChange={(e) => setForm({ ...form, alt: e.target.value })}
              placeholder="Alt text (optional)"
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-violet-400 md:col-span-2"
            />
          </div>

          {form.cloudUri && (
            <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs text-white/40 mb-3">PREVIEW</p>
              <img
                src={form.cloudUri}
                alt="Preview"
                className="h-20 max-w-[240px] object-contain"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
          )}

          <div className="flex gap-3 mt-5">
            <button
              disabled={saving}
              className="rounded-xl bg-white text-black px-6 py-3 font-medium disabled:opacity-50"
            >
              {saving ? "Saving..." : editingId ? "Update Logo" : "Add Logo"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ name: "", cloudUri: "", alt: "" });
                }}
                className="rounded-xl border border-white/10 px-6 py-3"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">All Logos</h2>
          <span className="text-sm text-white/40">{logos.length} total</span>
        </div>

        {loading ? (
          <p className="text-white/50">Loading logos...</p>
        ) : logos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-white/40">
            No logos added yet.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {logos.map((logo) => (
              <div
                key={logo._id}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="h-28 rounded-xl bg-black/20 flex items-center justify-center mb-4">
                  <img
                    src={logo.cloudUri}
                    alt={logo.alt || logo.name}
                    className="max-h-20 max-w-[85%] object-contain"
                  />
                </div>

                <h3 className="font-medium truncate">
                  {logo.name || "Unnamed logo"}
                </h3>
                <p className="text-xs text-white/40 truncate mt-1">
                  {logo.cloudUri}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => toggleActive(logo)}
                    className={`text-xs px-3 py-1.5 rounded-full border ${
                      logo.isActive
                        ? "border-green-400/30 text-green-300"
                        : "border-white/10 text-white/40"
                    }`}
                  >
                    {logo.isActive ? "Active" : "Hidden"}
                  </button>

                  <div className="flex gap-2">
                    <button onClick={() => editLogo(logo)} className="text-sm text-violet-300">
                      Edit
                    </button>
                    <button onClick={() => removeLogo(logo._id)} className="text-sm text-red-300">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
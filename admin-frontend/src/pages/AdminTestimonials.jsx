import React, { useEffect, useState } from "react";
import {
  createTestimonial,
  getAllTestimonials,
  updateTestimonial,
  deleteTestimonial,
} from "../api/adminContentApi";

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    rating: 5,
    review: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const res = await getAllTestimonials();
      setItems(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.review.trim()) {
      setError("Name and review are required");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...form,
        rating: Number(form.rating),
      };

      if (editingId) {
        await updateTestimonial(editingId, payload);
      } else {
        await createTestimonial(payload);
      }

      resetForm();
      await loadTestimonials();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: "", location: "", rating: 5, review: "" });
  };

  const editItem = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name || "",
      location: item.location || "",
      rating: item.rating || 5,
      review: item.review || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeItem = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;

    try {
      await deleteTestimonial(id);
      await loadTestimonials();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete testimonial");
    }
  };

  const toggleActive = async (item) => {
    try {
      await updateTestimonial(item._id, { isActive: !item.isActive });
      await loadTestimonials();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update testimonial");
    }
  };

  return (
    <div className="min-h-screen bg-[#08080d] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-violet-400 mb-2">ADMIN PANEL</p>
          <h1 className="text-3xl md:text-5xl font-light">Testimonials</h1>
          <p className="text-white/50 mt-2">
            Add customer reviews and control which testimonials appear publicly.
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
            {editingId ? "Edit Testimonial" : "Add New Testimonial"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Customer name *"
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-violet-400"
            />

            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Location (optional)"
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-violet-400"
            />

            <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
              <label className="block text-xs text-white/40 mb-2">Rating</label>
              <select
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
                className="w-full bg-transparent outline-none"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n} className="bg-[#111118]">
                    {n} / 5
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 flex items-center">
              <span className="text-yellow-300 text-xl tracking-wide">
                {"★".repeat(Number(form.rating))}
                <span className="text-white/15">
                  {"★".repeat(5 - Number(form.rating))}
                </span>
              </span>
            </div>

            <textarea
              required
              rows={5}
              value={form.review}
              onChange={(e) => setForm({ ...form, review: e.target.value })}
              placeholder="Customer review *"
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-violet-400 md:col-span-2 resize-y"
            />
          </div>

          <div className="flex gap-3 mt-5">
            <button
              disabled={saving}
              className="rounded-xl bg-white text-black px-6 py-3 font-medium disabled:opacity-50"
            >
              {saving ? "Saving..." : editingId ? "Update Testimonial" : "Add Testimonial"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-white/10 px-6 py-3"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">All Testimonials</h2>
          <span className="text-sm text-white/40">{items.length} total</span>
        </div>

        {loading ? (
          <p className="text-white/50">Loading testimonials...</p>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-white/40">
            No testimonials added yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    {item.location && (
                      <p className="text-xs text-white/40 mt-1">{item.location}</p>
                    )}
                  </div>
                  <span className="text-yellow-300 whitespace-nowrap">
                    {"★".repeat(item.rating)}
                    <span className="text-white/15">{"★".repeat(5 - item.rating)}</span>
                  </span>
                </div>

                <p className="text-white/65 leading-6 mt-5">“{item.review}”</p>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
                  <button
                    onClick={() => toggleActive(item)}
                    className={`text-xs px-3 py-1.5 rounded-full border ${
                      item.isActive
                        ? "border-green-400/30 text-green-300"
                        : "border-white/10 text-white/40"
                    }`}
                  >
                    {item.isActive ? "Active" : "Hidden"}
                  </button>

                  <div className="flex gap-3">
                    <button onClick={() => editItem(item)} className="text-sm text-violet-300">
                      Edit
                    </button>
                    <button onClick={() => removeItem(item._id)} className="text-sm text-red-300">
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
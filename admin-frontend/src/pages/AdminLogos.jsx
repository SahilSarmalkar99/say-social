import React, { useEffect, useMemo, useState } from "react";

import {
  createLogo,
  getAllLogos,
  updateLogo,
  deleteLogo,
} from "../api/adminContentApi";

export default function AdminLogos() {
  const [logos, setLogos] = useState([]);

  const [form, setForm] = useState({
    name: "",
    cloudUri: "",
    alt: "",
    carousel: "top",
  });

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================================================
     LOAD LOGOS
  ========================================================= */

  const loadLogos = async () => {
    try {
      setLoading(true);
      setError("");

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

  /* =========================================================
     SPLIT LOGOS
  ========================================================= */

  const topLogos = useMemo(() => {
    return logos.filter((logo) => logo.carousel === "top");
  }, [logos]);

  const bottomLogos = useMemo(() => {
    return logos.filter((logo) => logo.carousel === "bottom");
  }, [logos]);

  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.cloudUri.trim()) {
      setError("Cloud URI is required");
      return;
    }

    /* ---------------------------------------------
       Frontend 20-logo protection
    --------------------------------------------- */

    if (!editingId) {
      const currentCount =
        form.carousel === "top" ? topLogos.length : bottomLogos.length;

      if (currentCount >= 20) {
        setError(`The ${form.carousel} carousel already has 20 logos.`);
        return;
      }
    }

    try {
      setSaving(true);

      if (editingId) {
        await updateLogo(editingId, form);

        setSuccess("Logo updated successfully.");
      } else {
        await createLogo(form);

        setSuccess("Logo added successfully.");
      }

      /* ---------------------------------------------
         Reset
      --------------------------------------------- */

      setForm({
        name: "",
        cloudUri: "",
        alt: "",
        carousel: "top",
      });

      setEditingId(null);

      await loadLogos();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save logo");
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     EDIT
  ========================================================= */

  const editLogo = (logo) => {
    setEditingId(logo._id);

    setForm({
      name: logo.name || "",
      cloudUri: logo.cloudUri || "",
      alt: logo.alt || "",
      carousel: logo.carousel || "top",
    });

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     CANCEL EDIT
  ========================================================= */

  const cancelEdit = () => {
    setEditingId(null);

    setForm({
      name: "",
      cloudUri: "",
      alt: "",
      carousel: "top",
    });

    setError("");
    setSuccess("");
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const removeLogo = async (id) => {
    if (!window.confirm("Delete this logo?")) {
      return;
    }

    try {
      setError("");

      await deleteLogo(id);

      setSuccess("Logo deleted successfully.");

      await loadLogos();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete logo");
    }
  };

  /* =========================================================
     TOGGLE ACTIVE
  ========================================================= */

  const toggleActive = async (logo) => {
    try {
      setError("");

      await updateLogo(logo._id, {
        isActive: !logo.isActive,
      });

      await loadLogos();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update logo");
    }
  };

  /* =========================================================
     LOGO CARD
  ========================================================= */

  const LogoCard = ({ logo }) => {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:bg-white/[0.06] transition">
        {/* IMAGE */}

        <div className="h-28 rounded-xl bg-black/30 border border-white/5 flex items-center justify-center mb-4 overflow-hidden">
          <img
            src={logo.cloudUri}
            alt={logo.alt || logo.name}
            className="max-h-20 max-w-[85%] object-contain"
          />
        </div>

        {/* NAME */}

        <h3 className="font-medium truncate">{logo.name || "Unnamed logo"}</h3>

        {/* URI */}

        <p className="text-xs text-white/40 truncate mt-1">{logo.cloudUri}</p>

        {/* STATUS + ACTIONS */}

        <div className="flex items-center justify-between mt-4 gap-3">
          <button
            onClick={() => toggleActive(logo)}
            className={`text-xs px-3 py-1.5 rounded-full border transition ${
              logo.isActive
                ? "border-green-400/30 text-green-300 bg-green-400/5"
                : "border-white/10 text-white/40"
            }`}
          >
            {logo.isActive ? "Active" : "Hidden"}
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => editLogo(logo)}
              className="text-sm text-violet-300 hover:text-violet-200"
            >
              Edit
            </button>

            <button
              onClick={() => removeLogo(logo._id)}
              className="text-sm text-red-300 hover:text-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#08080d] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">
          <p className="text-sm text-violet-400 mb-2">ADMIN PANEL</p>

          <h1 className="text-3xl md:text-5xl font-light">Trust Logos</h1>

          <p className="text-white/50 mt-2">
            Manage the logos displayed in your public trust carousels.
          </p>
        </div>

        {/* =================================================
            CAROUSEL COUNTERS
        ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* TOP */}

          <div className="rounded-2xl border border-violet-400/20 bg-violet-400/[0.06] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/40">TOP CAROUSEL</p>

                <p className="text-3xl font-medium mt-1">
                  {topLogos.length}
                  <span className="text-white/30"> / 20</span>
                </p>
              </div>

              <div className="text-violet-300 text-2xl">↑</div>
            </div>

            <div className="h-1.5 bg-white/5 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-violet-400 transition-all"
                style={{
                  width: `${Math.min((topLogos.length / 20) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* BOTTOM */}

          <div className="rounded-2xl border border-violet-400/20 bg-violet-400/[0.06] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/40">BOTTOM CAROUSEL</p>

                <p className="text-3xl font-medium mt-1">
                  {bottomLogos.length}
                  <span className="text-white/30"> / 20</span>
                </p>
              </div>

              <div className="text-violet-300 text-2xl">↓</div>
            </div>

            <div className="h-1.5 bg-white/5 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-violet-400 transition-all"
                style={{
                  width: `${Math.min((bottomLogos.length / 20) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-5 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-red-200">
            {error}
          </div>
        )}

        {/* =================================================
            SUCCESS
        ================================================= */}

        {success && (
          <div className="mb-5 rounded-xl border border-green-400/20 bg-green-400/10 p-4 text-green-200">
            {success}
          </div>
        )}

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-7 mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <h2 className="text-xl font-medium">
              {editingId ? "Edit Logo" : "Add New Logo"}
            </h2>

            {editingId && (
              <span className="text-xs text-violet-300">Editing logo</span>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* NAME */}

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Company name (optional)"
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-violet-400"
            />

            {/* URI */}

            <input
              required
              type="url"
              name="cloudUri"
              value={form.cloudUri}
              onChange={handleChange}
              placeholder="Cloud image URI *"
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-violet-400"
            />

            {/* ALT */}

            <input
              name="alt"
              value={form.alt}
              onChange={handleChange}
              placeholder="Alt text (optional)"
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-violet-400"
            />

            {/* CAROUSEL */}

            <select
              name="carousel"
              value={form.carousel}
              onChange={handleChange}
              className="rounded-xl bg-[#111118] border border-white/10 px-4 py-3 outline-none focus:border-violet-400"
            >
              <option value="top">Top Carousel ({topLogos.length}/20)</option>

              <option value="bottom">
                Bottom Carousel ({bottomLogos.length}/20)
              </option>
            </select>
          </div>

          {/* PREVIEW */}

          {form.cloudUri && (
            <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs text-white/40 mb-3">PREVIEW</p>

              <img
                src={form.cloudUri}
                alt="Preview"
                className="h-20 max-w-[240px] object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          {/* BUTTONS */}

          <div className="flex flex-wrap gap-3 mt-5">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-white text-black px-6 py-3 font-medium disabled:opacity-50 hover:bg-white/90 transition"
            >
              {saving ? "Saving..." : editingId ? "Update Logo" : "Add Logo"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-xl border border-white/10 px-6 py-3 hover:bg-white/5 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* =================================================
            ALL LOGOS
        ================================================= */}

        {loading ? (
          <p className="text-white/50">Loading logos...</p>
        ) : (
          <>
            {/* =================================================
                TOP CAROUSEL
            ================================================= */}

            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-medium">Top Carousel</h2>

                <p className="text-sm text-white/40 mt-1">
                  {topLogos.length} / 20 logos
                </p>
              </div>
            </div>

            {topLogos.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-white/40 mb-10">
                No logos in the top carousel.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                {topLogos.map((logo) => (
                  <LogoCard key={logo._id} logo={logo} />
                ))}
              </div>
            )}

            {/* =================================================
                BOTTOM CAROUSEL
            ================================================= */}

            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-medium">Bottom Carousel</h2>

                <p className="text-sm text-white/40 mt-1">
                  {bottomLogos.length} / 20 logos
                </p>
              </div>
            </div>

            {bottomLogos.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-white/40">
                No logos in the bottom carousel.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {bottomLogos.map((logo) => (
                  <LogoCard key={logo._id} logo={logo} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

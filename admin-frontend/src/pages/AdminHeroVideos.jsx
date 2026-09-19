import React, { useEffect, useState } from "react";
import { getSiteSettings, updateSiteSettings } from "../api/siteSettingsApi";

const emptySettings = {
  heroVideos: {
    work: "",
    team: "",
    contact: "",
  },
  logoUrl: "",
};

const videoFields = [
  { key: "work", label: "Work", placeholder: "https://res.cloudinary.com/.../work.mp4" },
  { key: "team", label: "Team", placeholder: "https://res.cloudinary.com/.../team.mp4" },
  { key: "contact", label: "Contact", placeholder: "https://res.cloudinary.com/.../contact.mp4" },
];

export default function AdminHeroVideos() {
  const [form, setForm] = useState(emptySettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getSiteSettings();
      const data = res.data?.data || emptySettings;

      setForm({
        heroVideos: {
          work: data.heroVideos?.work || "",
          team: data.heroVideos?.team || "",
          contact: data.heroVideos?.contact || "",
        },
        logoUrl: data.logoUrl || "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load hero videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const setHeroVideo = (key, value) => {
    setForm((current) => ({
      ...current,
      heroVideos: {
        ...current.heroVideos,
        [key]: value,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const res = await updateSiteSettings(form);
      setForm(res.data?.data || form);
      setMessage("Hero videos saved successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save hero videos");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080d] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="mb-2 text-sm text-violet-400">ADMIN PANEL</p>
          <h1 className="text-3xl font-light md:text-5xl">Hero Videos</h1>
          <p className="mt-2 max-w-2xl text-white/50">
            Manage the cloud-hosted hero videos for Work, Team, and Contact.
          </p>
        </div>

        {message && (
          <div className="mb-5 rounded-xl border border-green-400/20 bg-green-400/10 p-4 text-green-200">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-white/50">
            Loading settings...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-7">
              <div className="mb-6">
                <h2 className="text-xl font-medium">Hero Video</h2>
                <p className="mt-1 text-sm text-white/40">
                  Configure one cloud video for each hero destination.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {videoFields.map((field) => (
                  <label key={field.key} className="block">
                    <span className="mb-2 block text-sm font-medium text-white/80">
                      {field.label}
                    </span>
                    <input
                      type="url"
                      value={form.heroVideos[field.key]}
                      onChange={(event) => setHeroVideo(field.key, event.target.value)}
                      placeholder={field.placeholder}
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition placeholder:text-white/20 focus:border-violet-400"
                    />
                    <span className="mt-2 block text-xs text-white/30">
                      Cloud-hosted video URL
                    </span>
                  </label>
                ))}
              </div>
            </section>



            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-white px-7 py-3 font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

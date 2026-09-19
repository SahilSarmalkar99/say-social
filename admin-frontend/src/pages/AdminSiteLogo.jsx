import React, { useEffect, useState } from "react";
import { getSiteSettings, updateSiteSettings } from "../api/siteSettingsApi";

export default function AdminSiteLogo() {
  const [logoUrl, setLogoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getSiteSettings()
      .then((res) => setLogoUrl(res.data?.data?.logoUrl || ""))
      .catch((err) => setError(err.response?.data?.message || "Failed to load logo"))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const current = await getSiteSettings();
      await updateSiteSettings({
        heroVideos: current.data?.data?.heroVideos || { work: "", team: "", contact: "" },
        logoUrl: logoUrl.trim(),
      });
      setMessage("Logo saved successfully. The same URL is available for both navbar and footer.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save logo");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080d] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="mb-2 text-sm text-violet-400">ADMIN PANEL</p>
          <h1 className="text-3xl font-light md:text-5xl">Navbar &amp; Footer Logo</h1>
          <p className="mt-2 max-w-2xl text-white/50">Use one cloud-hosted logo URL for both the navbar and footer.</p>
        </div>

        {message && <div className="mb-5 rounded-xl border border-green-400/20 bg-green-400/10 p-4 text-green-200">{message}</div>}
        {error && <div className="mb-5 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-red-200">{error}</div>}

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-white/50">Loading logo...</div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-7">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/80">Logo cloud URL</span>
              <input
                type="url"
                value={logoUrl}
                onChange={(event) => setLogoUrl(event.target.value)}
                placeholder="https://res.cloudinary.com/.../logo.svg"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition placeholder:text-white/20 focus:border-violet-400"
              />
            </label>

            {logoUrl && (
              <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-5">
                <p className="mb-3 text-xs text-white/40">PREVIEW</p>
                <img src={logoUrl} alt="Navbar and footer logo preview" className="max-h-16 max-w-[280px] object-contain" />
              </div>
            )}

            <button type="submit" disabled={saving} className="mt-6 rounded-xl bg-white px-7 py-3 font-medium text-black disabled:cursor-not-allowed disabled:opacity-50">
              {saving ? "Saving..." : "Save Logo"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

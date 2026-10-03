import React, { useEffect, useState } from "react";
import {
  addCarousel,
  deleteCarousel,
  getCarousel,
  getMainVideo,
  reorderCarousel,
  saveMainVideo,
  statusCarousel,
  updateCarousel,
} from "../api/videoApi";

function VideoPreview({ src, poster }) {
  return src ? (
    <video
      className="block w-full aspect-video object-cover rounded-xl bg-slate-950"
      src={src}
      poster={poster || undefined}
      controls
      muted
      playsInline
    />
  ) : (
    <div className="grid aspect-video w-full place-items-center rounded-xl border border-dashed border-slate-700 text-sm text-slate-500">
      No video configured
    </div>
  );
}

const emptyForm = {
  title: "",
  description: "",
  videoUrl: "",
  thumbnailUrl: "",
  isActive: true,
};

export default function AdminVideos() {
  const [main, setMain] = useState(null);

  // =====================================================
  // MAIN LANDING VIDEO
  // =====================================================

  const [mainForm, setMainForm] = useState({
    desktopVideoUrl: "",
    mobileVideoUrl: "",
    thumbnailUrl: "",
  });

  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);

  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =====================================================
  // LOAD DATA
  // =====================================================

  const load = async () => {
    try {
      setError("");

      const [m, c] = await Promise.all([getMainVideo(), getCarousel()]);

      setMain(m.video);

      setMainForm({
        desktopVideoUrl: m.video?.desktopVideoUrl || "",
        mobileVideoUrl: m.video?.mobileVideoUrl || "",
        thumbnailUrl: m.video?.thumbnailUrl || "",
      });

      setItems(c.videos);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // =====================================================
  // MAIN LANDING VIDEO
  // =====================================================

  const submitMain = async (e) => {
    e.preventDefault();

    setBusy(true);
    setMessage("");
    setError("");

    try {
      /*
       * At least one video must exist.
       *
       * This allows:
       * - only desktop
       * - only mobile
       * - both desktop + mobile
       *
       * Existing values are preserved if their field
       * is left empty.
       */

      const desktopVideoUrl = mainForm.desktopVideoUrl.trim();

      const mobileVideoUrl = mainForm.mobileVideoUrl.trim();

      const existingDesktop = main?.desktopVideoUrl || "";

      const existingMobile = main?.mobileVideoUrl || "";

      const finalDesktop = desktopVideoUrl || existingDesktop;

      const finalMobile = mobileVideoUrl || existingMobile;

      if (!finalDesktop && !finalMobile) {
        setError("Please provide at least a desktop or mobile video URL.");
        setBusy(false);
        return;
      }

      const payload = {
        desktopVideoUrl: finalDesktop,
        mobileVideoUrl: finalMobile,
        thumbnailUrl: mainForm.thumbnailUrl.trim(),
      };

      const result = await saveMainVideo(payload);

      setMain(result.video);

      setMainForm({
        desktopVideoUrl: result.video?.desktopVideoUrl || "",
        mobileVideoUrl: result.video?.mobileVideoUrl || "",
        thumbnailUrl: result.video?.thumbnailUrl || "",
      });

      setMessage("Main landing video updated successfully.");

      alert("Main landing video updated successfully.");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  // =====================================================
  // CAROUSEL
  // =====================================================

  const submit = async (e) => {
    e.preventDefault();

    setBusy(true);
    setMessage("");
    setError("");

    try {
      if (editing) {
        await updateCarousel(editing._id, form);

        setMessage("Carousel video updated successfully.");
      } else {
        await addCarousel(form);

        setMessage("Carousel video added successfully.");
      }

      setForm(emptyForm);
      setEditing(null);

      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const edit = (v) => {
    setEditing(v);

    setForm({
      title: v.title || "",
      description: v.description || "",
      videoUrl: v.videoUrl || "",
      thumbnailUrl: v.thumbnailUrl || "",
      isActive: Boolean(v.isActive),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearForm = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this carousel video?")) {
      return;
    }

    try {
      await deleteCarousel(id);

      setMessage("Video deleted.");

      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  const toggle = async (v) => {
    try {
      await statusCarousel(v._id, !v.isActive);

      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  const move = async (index, dir) => {
    const next = [...items];

    const to = index + dir;

    if (to < 0 || to >= next.length) {
      return;
    }

    [next[index], next[to]] = [next[to], next[index]];

    setItems(next);

    try {
      await reorderCarousel(
        next.map((x) => ({
          id: x._id,
        })),
      );
    } catch (e) {
      setError(e.message);

      await load();
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[10%] top-0 h-[400px] w-[500px] rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative border-b border-slate-800/80 px-4 py-8 sm:px-6 lg:px-[6vw] lg:py-12">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-indigo-400 sm:text-xs">
            ADMIN CONSOLE
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[42px]">
            Video Management
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Manage the landing page hero and featured video carousel using video
            URLs.
          </p>
        </div>
      </header>

      <main className="relative mx-auto max-w-[1400px] px-3 pb-10 sm:px-6 lg:px-8">
        {/* =====================================================
            NOTICE
        ===================================================== */}

        {(message || error) && (
          <div
            className={`mt-5 flex items-start justify-between gap-4 rounded-xl border px-4 py-3 text-sm ${
              error
                ? "border-red-900/70 bg-red-950/40 text-red-200"
                : "border-indigo-900/70 text-indigo-200"
            }`}
          >
            <span className="break-words">{error || message}</span>

            <button
              type="button"
              onClick={() => {
                setMessage("");
                setError("");
              }}
              className="shrink-0 text-xl leading-none opacity-70 transition hover:opacity-100"
            >
              ×
            </button>
          </div>
        )}

        {/* =====================================================
            MAIN LANDING VIDEO
        ===================================================== */}

        <section className="mt-6 rounded-2xl border border-slate-800 p-4 shadow-2xl shadow-black/20 sm:p-6 lg:mt-7">
          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white sm:text-xl">
              Main landing video
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-400">
              Configure desktop and mobile videos independently. You can update
              either one without changing the other.
            </p>
          </div>

          {/* =====================================================
              PREVIEWS
          ===================================================== */}

          <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Desktop Preview */}
            <div className="rounded-2xl border border-slate-800 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">
                  Desktop Preview
                </h3>

                {main?.desktopVideoUrl ? (
                  <span className="rounded-full bg-emerald-950/70 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                    Configured
                  </span>
                ) : (
                  <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
                    Not configured
                  </span>
                )}
              </div>

              <VideoPreview
                src={main?.desktopVideoUrl}
                poster={main?.thumbnailUrl}
              />
            </div>

            {/* Mobile Preview */}
            <div className="rounded-2xl border border-slate-800 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">
                  Mobile Preview
                </h3>

                {main?.mobileVideoUrl ? (
                  <span className="rounded-full bg-emerald-950/70 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                    Configured
                  </span>
                ) : (
                  <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
                    Not configured
                  </span>
                )}
              </div>

              <VideoPreview
                src={main?.mobileVideoUrl}
                poster={main?.thumbnailUrl}
              />
            </div>
          </div>

          {/* =====================================================
              MAIN VIDEO FORM
          ===================================================== */}

          <form
            onSubmit={submitMain}
            className="rounded-2xl border border-slate-800 p-4 sm:p-5"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Desktop Video URL */}
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
                <span className="flex items-center justify-between">
                  <span>Desktop Video URL</span>

                  <span className="text-xs font-normal text-slate-500">
                    Optional
                  </span>
                </span>

                <input
                  type="url"
                  placeholder="https://example.com/desktop-video.mp4"
                  value={mainForm.desktopVideoUrl}
                  onChange={(e) =>
                    setMainForm({
                      ...mainForm,
                      desktopVideoUrl: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

                <span className="text-xs text-slate-500">
                  Leave unchanged to keep the existing desktop video.
                </span>
              </label>

              {/* Mobile Video URL */}
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
                <span className="flex items-center justify-between">
                  <span>Mobile Video URL</span>

                  <span className="text-xs font-normal text-slate-500">
                    Optional
                  </span>
                </span>

                <input
                  type="url"
                  placeholder="https://example.com/mobile-video.mp4"
                  value={mainForm.mobileVideoUrl}
                  onChange={(e) =>
                    setMainForm({
                      ...mainForm,
                      mobileVideoUrl: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

                <span className="text-xs text-slate-500">
                  Leave unchanged to keep the existing mobile video.
                </span>
              </label>
            </div>

            {/* Thumbnail */}
            <label className="mt-5 flex flex-col gap-2 text-sm font-medium text-slate-300">
              <span className="flex items-center gap-2">
                <span>Thumbnail URL</span>

                <span className="text-xs font-normal text-slate-500">
                  Optional
                </span>
              </span>

              <input
                type="url"
                placeholder="https://example.com/main-thumb.jpg"
                value={mainForm.thumbnailUrl}
                onChange={(e) =>
                  setMainForm({
                    ...mainForm,
                    thumbnailUrl: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </label>

            {/* Save */}
            <button
              type="submit"
              disabled={busy}
              className="mt-5 w-full rounded-xl bg-indigo-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? "Saving…" : "Save Main Video"}
            </button>
          </form>
        </section>

        {/* =====================================================
            CAROUSEL
        ===================================================== */}

        <section className="mt-6 rounded-2xl border border-slate-800 p-4 shadow-2xl shadow-black/20 sm:p-6 lg:mt-7">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white sm:text-xl">
              Landing page carousel
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-400">
              Add multiple videos using URLs, then activate, edit, delete and
              reorder them.
            </p>
          </div>

          {/* Add/Edit Form */}
          <form
            onSubmit={submit}
            className="mb-6 rounded-2xl border border-slate-800 p-4 sm:p-5"
          >
            <div className="mb-5 flex flex-col gap-1">
              <h3 className="text-base font-bold text-white">
                {editing ? "Edit carousel video" : "Add carousel video"}
              </h3>

              <p className="text-xs text-slate-500">
                Configure the video information shown on the landing page.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Title */}
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
                Title
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </label>

              {/* Video URL */}
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
                Video URL
                <input
                  required
                  type="url"
                  placeholder="https://example.com/video.mp4"
                  value={form.videoUrl}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      videoUrl: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </label>

              {/* Description */}
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-300 md:col-span-2">
                Description
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  className="min-h-[110px] w-full resize-y rounded-xl border border-slate-700 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </label>

              {/* Thumbnail */}
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-300 md:col-span-2">
                <div>
                  Thumbnail URL{" "}
                  <span className="text-xs font-normal text-slate-500">
                    Optional
                  </span>
                </div>

                <input
                  type="url"
                  placeholder="https://example.com/thumb.jpg"
                  value={form.thumbnailUrl}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      thumbnailUrl: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </label>
            </div>

            {/* Form actions */}
            <div className="mt-5 flex flex-col gap-4 border-t border-slate-800 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isActive: e.target.checked,
                    })
                  }
                  className="h-4 w-4 cursor-pointer accent-indigo-500"
                />

                <span>Show on landing page</span>
              </label>

              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                {editing && (
                  <button
                    type="button"
                    onClick={clearForm}
                    className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700 sm:w-auto"
                  >
                    Cancel Edit
                  </button>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {busy ? "Saving…" : editing ? "Save Changes" : "Add Video"}
                </button>
              </div>
            </div>
          </form>

          {/* Video Cards */}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {items.map((v, i) => (
              <article
                className="overflow-hidden rounded-2xl border border-slate-800 transition hover:border-slate-700 hover:shadow-xl hover:shadow-black/20"
                key={v._id}
              >
                {/* Video */}
                <VideoPreview src={v.videoUrl} poster={v.thumbnailUrl} />

                <div className="p-4 sm:p-5">
                  {/* Title + status */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="min-w-0 break-words text-base font-bold text-white">
                      {v.title}
                    </h3>

                    <span
                      className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        v.isActive
                          ? "bg-emerald-950/70 text-emerald-400"
                          : "text-slate-400"
                      }`}
                    >
                      {v.isActive ? "Active" : "Hidden"}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 min-h-[40px] text-sm leading-5 text-slate-400">
                    {v.description || "No description"}
                  </p>

                  {/* URL */}
                  <div
                    title={v.videoUrl}
                    className="my-3 overflow-hidden text-ellipsis whitespace-nowrap rounded-lg px-3 py-2 text-[11px] text-slate-600"
                  >
                    {v.videoUrl}
                  </div>

                  {/* Controls */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => move(i, -1)}
                      disabled={i === 0}
                      className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                      title="Move up"
                    >
                      ↑
                    </button>

                    <button
                      type="button"
                      onClick={() => move(i, 1)}
                      disabled={i === items.length - 1}
                      className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                      title="Move down"
                    >
                      ↓
                    </button>

                    <button
                      type="button"
                      onClick={() => toggle(v)}
                      className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-700"
                    >
                      {v.isActive ? "Hide" : "Show"}
                    </button>

                    <button
                      type="button"
                      onClick={() => edit(v)}
                      className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-700"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => remove(v._id)}
                      className="rounded-lg bg-red-950/30 px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-950/60"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {!items.length && (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-700 bg-slate-950/30 px-5 py-14 text-center text-sm text-slate-500">
                No carousel videos yet.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { ChevronDown, ArrowUpRight, X, Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import { getJobs, submitApplication } from "../api/careersApi";
import "../careers.css";

export default function Careers() {
  const [jobs, setJobs] = useState([]),
    [selected, setSelected] = useState(null),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    getJobs()
      .then((r) => setJobs(r.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <Navbar />
      <section className="w-full py-28 pt-30 bg-[#08080d] text-white min-h-screen">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[280px_1fr]">
            <div>
              <h2 className="text-5xl font-bold leading-tight md:text-6xl">
                Our Open
                <br />
                Roles
              </h2>
              <div className="mt-16">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
                  Ready to join?
                </p>
                <p className="mt-4 text-lg text-orange-400">
                  Submit your application below.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              {loading ? (
                <p className="text-white/40">Loading open roles...</p>
              ) : jobs.length === 0 ? (
                <div className="border-t border-white/15 pt-8 text-white/50">
                  There are no open positions right now.
                </div>
              ) : (
                jobs.map((job) => (
                  <div
                    key={job._id}
                    className="border-t border-white/15 pt-8 last:border-b last:border-white/15 last:pb-8"
                  >
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                          Open Roles
                        </p>
                        <h3 className="mt-3 text-3xl font-semibold hover:text-orange-400 transition">
                          {job.title}
                        </h3>
                        <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/60">
                          <span>{job.type}</span>
                          <span>•</span>
                          {job.salary && (
                            <>
                              <span>{job.salary}</span>
                              <span>•</span>
                            </>
                          )}
                          <span>{job.location}</span>
                        </div>
                        {job.description && (
                          <p className="mt-4 max-w-2xl text-white/45 leading-6">
                            {job.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-5">
                        <button
                          onClick={() =>
                            setSelected(selected?._id === job._id ? null : job)
                          }
                          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 hover:border-orange-400 hover:text-orange-400"
                        >
                          <ChevronDown size={20} />
                        </button>
                        <button
                          onClick={() => setSelected(job)}
                          className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-7 py-3 font-medium hover:scale-105 transition"
                        >
                          Submit Application
                          <ArrowUpRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
      {selected && (
        <ApplicationModal job={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

function ApplicationModal({ job, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" }),
    [resume, setResume] = useState(null),
    [links, setLinks] = useState([""]),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState("");
  const set = (k, v) => setForm({ ...form, [k]: v });
  const submit = async (e) => {
    e.preventDefault();
    if (!resume) return setMessage("Please attach your resume.");
    const fd = new FormData();
    fd.append("jobRoleId", job._id);
    fd.append("name", form.name);
    fd.append("phone", form.phone);
    if (form.email) fd.append("email", form.email);
    fd.append("resume", resume);
    fd.append("workLinks", links.filter(Boolean).join("\n"));
    try {
      setBusy(true);
      setMessage("");
      const r = await submitApplication(fd);
      setMessage(r.data.message);
      if (r.data.success) {
        setForm({ name: "", phone: "", email: "" });
        setResume(null);
        setLinks([""]);
        document.getElementById("resume-input").value = "";
      }
    } catch (e) {
      setMessage(e.response?.data?.message || "Could not submit application.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-4 md:p-8 mt-25 md:mt-20">
      <div className="min-h-full flex items-center justify-center">
        <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0d0d14] p-6 md:p-9 text-white">
          <div className="flex justify-between gap-5 mb-7">
            <div>
              <p className="text-xs uppercase tracking-[.3em] text-cyan-400">
                Application
              </p>
              <h2 className="text-3xl font-semibold mt-2">{job.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center"
            >
              <X size={19} />
            </button>
          </div>
          {message && (
            <div className="mb-5 rounded-xl border border-orange-400/20 bg-orange-400/10 p-4 text-orange-100">
              {message}
            </div>
          )}
          <form onSubmit={submit} className="space-y-5">
            <input
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Name *"
              className="career-input"
            />
            <input
              required
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="Phone number *"
              type="tel"
              className="career-input"
            />
            <input
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="Email address (optional)"
              type="email"
              className="career-input"
            />
            <div>
              <label className="block text-sm text-white/60 mb-2">
                Resume * (PDF, DOC, DOCX — max 10MB)
              </label>
              <input
                id="resume-input"
                required
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files?.[0] || null)}
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/60 file:mr-4 file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:text-black"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-white/60">
                  Work links (optional)
                </label>
                <button
                  type="button"
                  onClick={() => setLinks([...links, ""])}
                  className="text-sm text-orange-400 flex items-center gap-1"
                >
                  <Plus size={16} />
                  Add link
                </button>
              </div>
              {links.map((link, i) => (
                <div key={i} className="flex gap-2 mb-3">
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => {
                      const x = [...links];
                      x[i] = e.target.value;
                      setLinks(x);
                    }}
                    placeholder="https://linkedin.com/in/yourname"
                    className="career-input flex-1"
                  />
                  {links.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setLinks(links.filter((_, n) => n !== i))}
                      className="px-3 rounded-xl border border-white/10 text-white/40"
                    >
                      <X size={17} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              disabled={busy}
              className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 py-4 font-medium disabled:opacity-50"
            >
              {busy ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

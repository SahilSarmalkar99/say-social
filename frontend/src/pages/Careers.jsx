import React, { useEffect, useState } from "react";
import { ChevronDown, ArrowUpRight, X, Plus, Mail, Phone, UploadCloud, CheckCircle2 } from "lucide-react";
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
      <section className="relative w-full overflow-hidden  text-white min-h-screen py-24 pt-32 sm:py-28 sm:pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-orange-500/[0.07] blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-400/[0.05] blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[300px_1fr] lg:gap-20">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.7)]" />
                We're hiring
              </div>
              <h2 className="text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl">
                Our Open
                <br />
                <span className="text-white/45">Roles</span>
              </h2>
              <div className="mt-12 max-w-xs border-l border-white/10 pl-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
                  Ready to join?
                </p>
                <p className="mt-3 text-base leading-7 text-white/50">
                  Find a role that fits your skills and send us your application.
                </p>
              </div>
            </div>
            <div className="space-y-5">
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
                    className="group rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.04]"
                  >
                    <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="inline-flex w-fit items-center rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                          Open Role
                        </div>
                        <h3 className="mt-4 text-2xl font-semibold tracking-tight transition group-hover:text-orange-300 sm:text-3xl">
                          {job.title}
                        </h3>
                        <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/55">
                          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">{job.type}</span>
                          {job.salary && (
                            <>
                              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">{job.salary}</span>
                            </>
                          )}
                          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">{job.location}</span>
                        </div>
                        {job.description && (
                          <p className="mt-4 max-w-2xl text-white/45 leading-6">
                            {job.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-5 lg:border-0 lg:pt-0">
                        <button
                          onClick={() =>
                            setSelected(selected?._id === job._id ? null : job)
                          }
                          aria-label={`View ${job.title} details`}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/55 transition hover:border-orange-400/40 hover:bg-orange-400/5 hover:text-orange-300"
                        >
                          <ChevronDown size={20} />
                        </button>
                        <button
                          onClick={() => setSelected(job)}
                          className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-3 text-sm font-semibold shadow-lg shadow-orange-500/10 transition hover:scale-[1.02] hover:shadow-orange-500/20 sm:px-6"
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
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [resume, setResume] = useState(null);
  const [links, setLinks] = useState([""]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const set = (k, v) => {
    setForm((prev) => ({ ...prev, [k]: v }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    const phone = form.phone.replace(/\D/g, "");

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (
      !form.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())
    ) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!resume) {
      setMessage("Please attach your resume.");
      return;
    }

    if (resume.size > 10 * 1024 * 1024) {
      setMessage("Resume must be smaller than 10MB.");
      return;
    }

    const fd = new FormData();

    fd.append("jobRoleId", job._id);
    fd.append("name", form.name.trim());
    fd.append("phone", form.phone.trim());
    fd.append("email", form.email.trim());
    fd.append("resume", resume);
    fd.append(
      "workLinks",
      links
        .map((link) => link.trim())
        .filter(Boolean)
        .join("\n")
    );

    try {
      setBusy(true);
      setMessage("");

      const r = await submitApplication(fd);

      setMessage(r.data.message);

      if (r.data.success) {
        setForm({
          name: "",
          phone: "",
          email: "",
        });

        setResume(null);
        setLinks([""]);

        const input = document.getElementById("resume-input");

        if (input) {
          input.value = "";
        }
      }
    } catch (e) {
      setMessage(
        e.response?.data?.message ||
          "Could not submit application."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        h-[100dvh] w-full
        overflow-y-scroll
        overscroll-contain
        bg-black/80 backdrop-blur-md
        px-3 py-3 sm:px-6 sm:py-6
        [scrollbar-width:none]
        [-ms-overflow-style:none]
        [&::-webkit-scrollbar]:hidden
      "
      style={{ WebkitOverflowScrolling: "touch" }}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
        {/* Modal */}
        <div
          className="
            mx-auto
            w-full
            max-w-2xl
            rounded-2xl
            sm:rounded-3xl
            border
            border-white/10
            bg-[#0d0d14]
            text-white
            shadow-[0_25px_100px_rgba(0,0,0,0.65)]
          "
        >
          {/* Header */}
          <div
            className="
              flex
              items-start
              justify-between
              gap-4
              border-b
              border-white/10
              px-5
              py-5
              sm:px-7
              sm:py-6
            "
          >
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-400">
                Application
              </p>

              <h2 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">
                {job.title}
              </h2>

              <p className="mt-2 text-sm text-white/40">
                Fill in your details and submit your application.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={busy}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/[0.04]
                text-white/60
                transition
                hover:bg-white/10
                hover:text-white
                disabled:opacity-40
              "
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="px-5 py-5 sm:px-7 sm:py-7">
            {message && (
              <div
                className="
                  mb-5
                  rounded-xl
                  border
                  border-orange-400/20
                  bg-orange-400/10
                  px-4
                  py-3
                  text-sm
                  text-orange-100
                "
              >
                {message}
              </div>
            )}

            <form
              onSubmit={submit}
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/70">
                  Full name{" "}
                  <span className="text-orange-400">*</span>
                </label>

                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    set("name", e.target.value)
                  }
                  placeholder="Enter your full name"
                  className="career-input w-full"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/70">
                  Phone number{" "}
                  <span className="text-orange-400">*</span>
                </label>

                <input
                  required
                  type="tel"
                  inputMode="numeric"
                  value={form.phone}
                  onChange={(e) =>
                    set(
                      "phone",
                      e.target.value.replace(
                        /[^\d+\s()-]/g,
                        ""
                      )
                    )
                  }
                  placeholder="+91 98765 43210"
                  className="career-input w-full"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/70">
                  Email address{" "}
                  <span className="text-orange-400">*</span>
                </label>

                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    set("email", e.target.value)
                  }
                  placeholder="you@example.com"
                  className="career-input w-full"
                />
              </div>

              {/* Resume */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/70">
                  Resume{" "}
                  <span className="text-orange-400">*</span>
                </label>

                <label
                  htmlFor="resume-input"
                  className="
                    flex
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-dashed
                    border-white/15
                    bg-white/[0.025]
                    px-5
                    py-7
                    text-center
                    transition
                    hover:border-orange-400/40
                    hover:bg-orange-400/[0.03]
                  "
                >
                  <UploadCloud
                    size={28}
                    className="mb-3 text-white/35"
                  />

                  <span className="text-sm font-medium text-white/75">
                    {resume
                      ? resume.name
                      : "Click to upload your resume"}
                  </span>

                  <span className="mt-1 text-xs text-white/35">
                    PDF, DOC or DOCX · Maximum 10MB
                  </span>

                  <input
                    id="resume-input"
                    required
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) =>
                      setResume(
                        e.target.files?.[0] || null
                      )
                    }
                    className="hidden"
                  />
                </label>
              </div>

              {/* Links */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-white/70">
                      Work links
                    </label>

                    <p className="mt-1 text-xs text-white/35">
                      Portfolio, GitHub, LinkedIn, etc.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setLinks([...links, ""])
                    }
                    className="
                      flex
                      items-center
                      gap-1.5
                      rounded-lg
                      px-3
                      py-2
                      text-xs
                      font-medium
                      text-orange-400
                      hover:bg-orange-400/10
                    "
                  >
                    <Plus size={15} />
                    Add link
                  </button>
                </div>

                <div className="space-y-3">
                  {links.map((link, i) => (
                    <div
                      key={i}
                      className="flex gap-2"
                    >
                      <input
                        type="url"
                        value={link}
                        onChange={(e) => {
                          const x = [...links];
                          x[i] = e.target.value;
                          setLinks(x);
                        }}
                        placeholder="https://linkedin.com/in/yourname"
                        className="career-input min-w-0 flex-1"
                      />

                      {links.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setLinks(
                              links.filter(
                                (_, n) => n !== i
                              )
                            )
                          }
                          className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-white/10
                            text-white/40
                            hover:border-red-400/30
                            hover:bg-red-400/10
                            hover:text-red-400
                          "
                        >
                          <X size={17} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={busy}
                className="
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-orange-500
                  to-orange-400
                  py-4
                  font-medium
                  shadow-lg
                  shadow-orange-500/10
                  transition
                  hover:brightness-105
                  disabled:pointer-events-none
                  disabled:opacity-50
                "
              >
                {busy
                  ? "Submitting..."
                  : "Submit Application"}
              </button>
            </form>
          </div>
        </div>

        {/* Extra bottom breathing room */}
        <div className="h-4 sm:h-6" />
    </div>
  );
}

function Field({ label, icon, error, hint, children }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-white/45">
        <span className="text-white/35">{icon}</span>
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-2 text-xs text-red-300">{error}</p>
      ) : hint ? (
        <p className="mt-2 text-[11px] leading-5 text-white/30">{hint}</p>
      ) : null}
    </div>
  );
}

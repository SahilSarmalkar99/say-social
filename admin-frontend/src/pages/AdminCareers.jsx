import React, { useEffect, useState } from "react";
import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  getCareerSetting,
  saveCareerSetting,
} from "../api/careersApi";

export default function AdminCareers() {
  const empty = {
    title: "",
    type: "Full Time",
    salary: "",
    location: "",
    description: "",
  };
  const [jobs, setJobs] = useState([]),
    [email, setEmail] = useState(""),
    [form, setForm] = useState(empty),
    [editing, setEditing] = useState(null),
    [msg, setMsg] = useState("");
  const load = async () => {
    try {
      const [j, s] = await Promise.all([getAllJobs(), getCareerSetting()]);
      setJobs(j.data.data || []);
      setEmail(s.data.data?.applicationEmail || "");
    } catch (e) {
      setMsg(e.response?.data?.message || "Failed to load");
    }
  };
  useEffect(() => {
    load();
  }, []);
  const saveJob = async (e) => {
    e.preventDefault();
    try {
      editing ? await updateJob(editing, form) : await createJob(form);
      setEditing(null);
      setForm(empty);
      setMsg("Job role saved");
      load();
    } catch (e) {
      setMsg(e.response?.data?.message || "Failed to save");
    }
  };
  const edit = (j) => {
    setEditing(j._id);
    setForm({
      title: j.title,
      type: j.type,
      salary: j.salary || "",
      location: j.location,
      description: j.description || "",
    });
  };
  const toggle = async (j) => {
    await updateJob(j._id, { isActive: !j.isActive });
    load();
  };
  const remove = async (id) => {
    if (window.confirm("Delete this role?")) {
      await deleteJob(id);
      load();
    }
  };
  const saveEmail = async (e) => {
    e.preventDefault();
    try {
      await saveCareerSetting({ applicationEmail: email });
      setMsg("Application email saved");
    } catch (e) {
      setMsg(e.response?.data?.message || "Failed to save email");
    }
  };
  return (
    <div className="min-h-screen bg-[#08080d] text-white p-5 md:p-10">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-cyan-400 tracking-[.3em]">ADMIN PANEL</p>
        <h1 className="text-4xl md:text-6xl font-light mt-2">Careers</h1>
        <p className="text-white/50 mt-2 mb-8">
          Manage roles and where applications are delivered.
        </p>
        {msg && (
          <div className="mb-5 rounded-xl border border-white/10 bg-white/5 p-4">
            {msg}
          </div>
        )}
        <form
          onSubmit={saveEmail}
          className="rounded-2xl border border-white/10 bg-white/[.04] p-6 mb-8"
        >
          <h2 className="text-xl mb-4">Application Email</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Where should applications go?"
              className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-orange-400"
            />
            <button className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 px-7 py-3">
              Save Email
            </button>
          </div>
        </form>
        <form
          onSubmit={saveJob}
          className="rounded-2xl border border-white/10 bg-white/[.04] p-6 mb-8"
        >
          <h2 className="text-xl mb-5">
            {editing ? "Edit Job Role" : "Add Job Role"}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              ["title", "Job title *"],
              ["type", "Employment type *"],
              ["salary", "Salary / compensation"],
              ["location", "Location *"],
            ].map(([k, p]) => (
              <input
                key={k}
                required={["title", "type", "location"].includes(k)}
                value={form[k]}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                placeholder={p}
                className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-orange-400"
              />
            ))}
            <textarea
              rows="4"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Job description (optional)"
              className="md:col-span-2 rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-orange-400"
            />
          </div>
          <div className="flex gap-3 mt-5">
            <button className="rounded-xl bg-white text-black px-6 py-3">
              {editing ? "Update Role" : "Add Role"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setForm(empty);
                }}
                className="rounded-xl border border-white/10 px-6"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
        <h2 className="text-xl mb-4">All Roles</h2>
        <div className="space-y-4">
          {jobs.map((j) => (
            <div
              key={j._id}
              className="rounded-2xl border border-white/10 bg-white/[.04] p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h3 className="text-xl">{j.title}</h3>
                <p className="text-sm text-white/45 mt-2">
                  {j.type} · {j.salary || "Salary not specified"} · {j.location}
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => toggle(j)}
                  className={`text-xs px-3 py-2 rounded-full border ${j.isActive ? "text-green-300 border-green-400/30" : "text-white/40 border-white/10"}`}
                >
                  {j.isActive ? "Active" : "Hidden"}
                </button>
                <button onClick={() => edit(j)} className="text-violet-300">
                  Edit
                </button>
                <button onClick={() => remove(j._id)} className="text-red-300">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

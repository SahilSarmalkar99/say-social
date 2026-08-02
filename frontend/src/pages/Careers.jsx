import { ChevronDown, ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";

const jobs = [
  {
    title: "Senior Inventory Specialist",
    type: "Full Time",
    salary: "$100 - $500K",
    location: "Boston, United States",
  },
  {
    title: "Senior Software Developer",
    type: "Full Time",
    salary: "$100 - $500K",
    location: "Boston, United States",
  },
  {
    title: "Junior UI/UX Fullstack Designer",
    type: "Full Time",
    salary: "$100 - $500K",
    location: "Boston, United States",
  },
];

export default function OpenRoles() {
  return (
    <>
      <Navbar />
      <section className="w-full py-28 pt-30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[280px_1fr]">
            {/* Left Side */}
            <div>
              <h2 className="text-5xl font-bold leading-tight text-white md:text-6xl">
                Our Open
                <br />
                Roles
              </h2>

              <div className="mt-16">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
                  Or Contact Us
                </p>

                <a
                  href="mailto:hello@avalontx.com"
                  className="mt-4 inline-block border-b border-orange-400 pb-1 text-lg text-orange-400 transition hover:text-orange-300"
                >
                  hello@avalontx.com
                </a>
              </div>
            </div>

            {/* Right Side */}
            <div className="space-y-8">
              {jobs.map((job, index) => (
                <div
                  key={index}
                  className="border-t border-white/15 pt-8 last:border-b last:border-white/15 last:pb-8"
                >
                  <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    {/* Job Info */}
                    <div className="flex-1">
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                        Open Roles
                      </p>

                      <h3 className="mt-3 text-3xl font-semibold text-white transition duration-300 hover:text-orange-400">
                        {job.title}
                      </h3>

                      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/60">
                        <span>{job.type}</span>

                        <span className="h-1 w-1 rounded-full bg-white/30"></span>

                        <span>{job.salary}</span>

                        <span className="h-1 w-1 rounded-full bg-white/30"></span>

                        <span>{job.location}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-5">
                      <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-orange-400 hover:text-orange-400">
                        <ChevronDown size={20} />
                      </button>

                      <button className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-7 py-3 font-medium text-white transition hover:scale-105">
                        Submit Application
                        <ArrowUpRight
                          size={18}
                          className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

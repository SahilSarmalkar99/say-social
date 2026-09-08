import { Menu, Bell } from "lucide-react";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const titles = {
  "/": "Dashboard",
  "/video": "Main Video",
  "/categories": "Categories",
  "/sub-categories": "Sub Categories",
  "/companies": "Companies",
  "/team": "Team",
  "/project": "Projects",
  "/work": "Portfolio",
  "/trustedBy": "Trusted By",
  "/testimonials": "Testimonials",
  "/job-roles": "Job Roles",
};

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const title = pathname.startsWith("/project/") ? "Project Editor" : (titles[pathname] || "Admin Dashboard");

  return (
    <div className="min-h-screen bg-transparent">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="min-h-screen lg:ml-72">
        <header className="sticky top-0 z-20 h-[72px] border-b border-white/10 bg-black/55 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex h-full items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/70 shadow-sm hover:bg-white/10 lg:hidden"
                aria-label="Open navigation"
              >
                <Menu size={21} />
              </button>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/40">SaySocial CMS</p>
                <h2 className="text-lg font-semibold tracking-tight text-white">{title}</h2>
              </div>
            </div>

            <div className="hidden items-center gap-3 sm:flex">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/55">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                System online
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/60 shadow-sm">
                <Bell size={18} />
              </div>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-72px)] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

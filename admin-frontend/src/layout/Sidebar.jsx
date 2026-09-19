import {
  LayoutDashboard, FolderTree, Building2, Layers3, Users, FolderKanban,
  Video, ShieldCheck, MessageSquareQuote, X, User2Icon, Sparkles, Settings
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menus = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Main Video", icon: Video, path: "/video" },
  { title: "Categories", icon: FolderTree, path: "/categories" },
  { title: "Sub Categories", icon: Layers3, path: "/sub-categories" },
  { title: "Companies", icon: Building2, path: "/companies" },
  { title: "Team", icon: Users, path: "/team" },
  { title: "Projects", icon: FolderKanban, path: "/project" },
  // { title: "Work", icon: Video, path: "/work" },
  { title: "Trusted By", icon: ShieldCheck, path: "/trustedBy" },
  { title: "Testimonials", icon: MessageSquareQuote, path: "/testimonials" },
  { title: "Job Roles", icon: User2Icon, path: "/job-roles" },
  { title: "Hero Video", icon: Video, path: "/hero-video" },
  { title: "Navbar & Footer Logo", icon: Settings, path: "/logo" },
];

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      <div onClick={() => setOpen(false)} className={`fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm lg:hidden transition-opacity ${open ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}`} />

      <aside className={`fixed left-0 top-0 z-40 flex h-screen w-72 flex-col border-r border-white/10 bg-black/85 text-white shadow-2xl shadow-black/40 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex h-[88px] min-h-[88px] items-center justify-between border-b border-white/8 px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-slate-900 shadow-lg">
              <Sparkles size={20} />
            </div>
            <div>
              <h1 className="text-[15px] font-bold tracking-[2px] uppercase">SaySocial</h1>
              <p className="mt-0.5 text-[11px] font-medium text-white/40">Content Management</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="rounded-xl p-2 text-slate-400 hover:bg-white/8 hover:text-white lg:hidden" aria-label="Close navigation">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-slate-500">Workspace</p>
          <div className="space-y-1">
            {menus.map((menu) => {
              const Icon = menu.icon;
              return (
                <NavLink
                  key={menu.path}
                  to={menu.path}
                  end={menu.path === "/" || menu.path === "/project"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-[13px] font-medium transition-all ${isActive ? "bg-white text-[#16061f] shadow-lg shadow-black/30" : "text-white/50 hover:bg-white/7 hover:text-white"}`}
                >
                  <Icon size={18} strokeWidth={1.9} className="shrink-0" />
                  <span className="truncate">{menu.title}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-white/8 p-4">
          <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3.5">
            <p className="text-[10px] font-bold uppercase tracking-[.14em] text-slate-500">Admin Panel</p>
            <p className="mt-1 text-sm font-semibold text-slate-200">SaySocial CMS</p>
            <p className="mt-1 text-[11px] text-slate-500">Manage your website content</p>
          </div>
        </div>
      </aside>
    </>
  );
}

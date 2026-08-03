import {
  LayoutDashboard,
  FolderTree,
  Building2,
  Layers3,
  GroupIcon,
  ProjectorIcon,
  Video,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Categories",
    icon: FolderTree,
    path: "/categories",
  },
  {
    title: "Sub Categories",
    icon: Layers3,
    path: "/sub-categories",
  },
  {
    title: "Companies",
    icon: Building2,
    path: "/companies",
  },
  {
    title: "Team",
    icon: GroupIcon,
    path: "/team",
  },
  {
    title: "Project",
    icon: ProjectorIcon,
    path: "/project",
  },
  {
    title: "Work",
    icon: Video,
    path: "/work",
  },
];

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-30 lg:hidden transition-opacity
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      <aside
  className={`fixed top-0 left-0 h-screen w-72 bg-white border-r z-40
  transform transition-transform duration-300
  ${open ? "translate-x-0" : "-translate-x-full"}
  lg:translate-x-0`}
>
        <div className="h-20 flex items-center justify-between px-8 border-b">
          <h1 className="text-2xl font-bold">SaySocial CMS</h1>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden"
          >
            <X />
          </button>
        </div>

        <nav className="p-5">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-4 rounded-xl mb-3 transition
                  ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={22} />
                {menu.title}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
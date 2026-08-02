import {
  LayoutDashboard,
  Home,
  FolderTree,
  Building2,
  Layers3,
  GroupIcon,
  ProjectorIcon,
  Workflow,
  Video
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
    title: "Portfolio",
    icon: Video,
    path: "/portfolio",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white border-r flex flex-col">
      <div className="h-20 flex items-center px-8 border-b">
        <h1 className="text-2xl font-bold">Nexa CMS</h1>
      </div>

      <nav className="flex-1 p-5">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-xl mb-3 transition-all
                  ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-gray-100 text-gray-700"
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
  );
}

import { Menu } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar open={open} setOpen={setOpen} />

      {/* Content */}
      <div className="lg:ml-72 min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-20 h-16 bg-white border-b flex items-center px-5 lg:px-8">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden mr-4"
          >
            <Menu size={28} />
          </button>

          <h2 className="text-xl font-semibold">
            Admin Dashboard
          </h2>
        </header>

        {/* Page */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
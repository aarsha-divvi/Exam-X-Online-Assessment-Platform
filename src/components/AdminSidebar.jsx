import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  LogOut,
  GraduationCap,
} from "lucide-react";

function AdminSidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Manage Users",
      path: "/admin/users",
      icon: <Users size={20} />,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: <BarChart3 size={20} />,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-slate-900 text-white">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-slate-700 px-6">
        <div className="rounded-lg bg-blue-600 p-2">
          <GraduationCap size={25} />
        </div>

        <div>
          <h1 className="text-xl font-bold">ExamX</h1>
          <p className="text-xs text-slate-400">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Main Menu
        </p>

        <div className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 w-full border-t border-slate-700 p-4">
        <button
          onClick={() => alert("Logout functionality will be connected later.")}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 transition hover:bg-red-600 hover:text-white"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  BarChart3,
  LogOut,
  GraduationCap,
} from "lucide-react";

function AdminSidebar() {
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-slate-900 text-white">

      {/* LOGO */}

      <div className="flex h-20 shrink-0 items-center gap-3 border-b border-slate-700 px-6">

        <div className="rounded-lg bg-blue-600 p-2">
          <GraduationCap size={25} />
        </div>

        <div>
          <h1 className="text-xl font-bold">
            ExamX
          </h1>

          <p className="text-xs text-slate-400">
            Admin Panel
          </p>
        </div>

      </div>

      {/* NAVIGATION */}

      <nav className="flex-1 overflow-y-auto px-4 py-6">

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
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >

              {item.icon}

              <span>
                {item.name}
              </span>

            </NavLink>

          ))}

        </div>

      </nav>

      {/* ADMIN INFO */}

      <div className="border-t border-slate-700 px-4 py-4">

        <div className="mb-3 rounded-lg bg-slate-800 p-3">

          <p className="text-xs text-slate-400">
            Logged in as
          </p>

          <p className="mt-1 truncate text-sm font-medium text-white">
            Admin
          </p>

        </div>

        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 transition hover:bg-red-600 hover:text-white"
        >

          <LogOut size={20} />

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;
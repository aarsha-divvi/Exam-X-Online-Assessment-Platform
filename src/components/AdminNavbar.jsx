import { Bell, UserCircle } from "lucide-react";

function AdminNavbar() {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const adminName = user?.name || "Admin";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:px-8">

      {/* LEFT */}

      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Admin Panel
        </h2>

        <p className="hidden text-xs text-slate-500 sm:block">
          ExamX Online Assessment Platform
        </p>
      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-4">

        {/* NOTIFICATION */}

        <button
          className="relative rounded-lg p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          title="Notifications"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* DIVIDER */}

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* ADMIN PROFILE */}

        <div className="flex items-center gap-3">

          <div className="hidden text-right sm:block">

            <p className="text-sm font-semibold text-slate-800">
              {adminName}
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>

          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <UserCircle size={25} />
          </div>

        </div>

      </div>

    </header>
  );
}

export default AdminNavbar;
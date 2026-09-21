import { Bell, Search, UserCircle } from "lucide-react";

function AdminNavbar() {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:px-8">
      {/* Left */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Admin Panel
        </h2>

        <p className="hidden text-sm text-slate-500 sm:block">
          Manage your ExamX platform
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden items-center rounded-lg bg-slate-100 px-3 py-2 md:flex">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="ml-2 w-32 bg-transparent text-sm outline-none lg:w-48"
          />
        </div>

        {/* Notification */}
        <button className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100">
          <Bell size={21} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Admin */}
        <div className="flex items-center gap-2">
          <UserCircle size={35} className="text-blue-600" />

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              Admin
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;
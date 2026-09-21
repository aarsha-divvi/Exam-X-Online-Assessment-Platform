import {
  Users,
  GraduationCap,
  FileText,
  Activity,
  CheckCircle,
  UserPlus,
} from "lucide-react";

import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import StatCard from "../../components/StatCard";

function AdminDashboard() {
  const activities = [
    {
      title: "New student registered",
      user: "Rahul Kumar",
      time: "10 minutes ago",
      icon: <UserPlus size={18} />,
    },
    {
      title: "New exam published",
      user: "Dr. Priya Sharma",
      time: "30 minutes ago",
      icon: <FileText size={18} />,
    },
    {
      title: "Faculty account created",
      user: "Anjali Reddy",
      time: "1 hour ago",
      icon: <GraduationCap size={18} />,
    },
    {
      title: "Exam result published",
      user: "Data Structures Exam",
      time: "2 hours ago",
      icon: <CheckCircle size={18} />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="ml-64">
        <AdminNavbar />

        <main className="p-4 md:p-8">
          {/* Page Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Welcome back, Admin. Here's what's happening in ExamX.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Students"
              value="520"
              description="+12 this month"
              icon={<Users size={25} />}
            />

            <StatCard
              title="Total Faculty"
              value="35"
              description="+3 this month"
              icon={<GraduationCap size={25} />}
            />

            <StatCard
              title="Total Exams"
              value="42"
              description="8 scheduled"
              icon={<FileText size={25} />}
            />

            <StatCard
              title="Active Exams"
              value="8"
              description="Currently running"
              icon={<Activity size={25} />}
            />
          </div>

          {/* Main Content */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Recent Activity */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
              <div className="border-b border-slate-200 p-5">
                <h2 className="text-lg font-semibold text-slate-800">
                  Recent Activity
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest activities on the platform
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-5 hover:bg-slate-50"
                  >
                    <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                      {activity.icon}
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">
                        {activity.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {activity.user}
                      </p>
                    </div>

                    <p className="text-xs text-slate-400">
                      {activity.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Summary */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-800">
                Platform Summary
              </h2>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm text-slate-600">
                      Student Accounts
                    </span>

                    <span className="text-sm font-semibold">
                      520
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-2 w-[80%] rounded-full bg-blue-600"></div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm text-slate-600">
                      Faculty Accounts
                    </span>

                    <span className="text-sm font-semibold">
                      35
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-2 w-[45%] rounded-full bg-green-500"></div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm text-slate-600">
                      Published Exams
                    </span>

                    <span className="text-sm font-semibold">
                      42
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-2 w-[65%] rounded-full bg-purple-500"></div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm text-slate-600">
                      Active Exams
                    </span>

                    <span className="text-sm font-semibold">
                      8
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-2 w-[30%] rounded-full bg-orange-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
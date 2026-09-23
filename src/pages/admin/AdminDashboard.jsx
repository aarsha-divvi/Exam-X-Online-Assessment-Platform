import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Users,
  GraduationCap,
  FileText,
  Activity,
  UserPlus,
} from "lucide-react";

import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import StatCard from "../../components/StatCard";

function AdminDashboard() {
  const navigate = useNavigate();

  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/admin/reports",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to load dashboard data");
        return;
      }

      setReports(data);
    } catch (error) {
      alert("Cannot connect to backend");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  if (!reports) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Unable to load dashboard data.
        </p>
      </div>
    );
  }

  const { stats, users, exams } = reports;

  const totalUsers = stats.totalUsers || 0;

  const studentPercentage =
    totalUsers > 0
      ? Math.round((stats.totalStudents / totalUsers) * 100)
      : 0;

  const facultyPercentage =
    totalUsers > 0
      ? Math.round((stats.totalFaculty / totalUsers) * 100)
      : 0;

  const publishedExams =
    exams.statusData.find(
      (item) => item.status === "Published"
    )?.count || 0;

  const examPercentage =
    stats.totalExams > 0
      ? Math.round(
          (publishedExams / stats.totalExams) * 100
        )
      : 0;

  const activeExamPercentage =
    stats.totalExams > 0
      ? Math.round(
          (stats.activeExams / stats.totalExams) * 100
        )
      : 0;

  const activities = users.recentUsers
    .slice(0, 4)
    .map((user) => ({
      title: "New user registered",
      user: `${user.name} (${user.role})`,
      time: user.createdAt
        ? new Date(user.createdAt).toLocaleString()
        : "Recently",
      icon: <UserPlus size={18} />,
    }));

  return (
    <div className="min-h-screen bg-slate-100">

      <AdminSidebar />

      <div className="ml-64">

        <AdminNavbar />

        <main className="p-4 md:p-8">

          {/* PAGE HEADING */}

          <div className="mb-8">

            <h1 className="text-2xl font-bold text-slate-800">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Welcome back, Admin. Here's what's happening in ExamX.
            </p>

          </div>

          {/* STATISTICS */}

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="Total Students"
              value={stats.totalStudents}
              description={`${stats.totalUsers} total users`}
              icon={<Users size={25} />}
            />

            <StatCard
              title="Total Faculty"
              value={stats.totalFaculty}
              description={`${stats.totalAdmins} admin account`}
              icon={<GraduationCap size={25} />}
            />

            <StatCard
              title="Total Exams"
              value={stats.totalExams}
              description={`${stats.completedExams} completed`}
              icon={<FileText size={25} />}
            />

            <StatCard
              title="Active Exams"
              value={stats.activeExams}
              description="Scheduled or published"
              icon={<Activity size={25} />}
            />

          </div>

          {/* MAIN CONTENT */}

          <div className="mt-8 grid gap-6 lg:grid-cols-3">

            {/* RECENT ACTIVITY */}

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2">

              <div className="border-b border-slate-200 p-5">

                <h2 className="text-lg font-semibold text-slate-800">
                  Recent Activity
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest registered users on the platform
                </p>

              </div>

              <div className="divide-y divide-slate-100">

                {activities.length === 0 ? (

                  <div className="p-6 text-sm text-slate-500">
                    No recent activity available.
                  </div>

                ) : (

                  activities.map((activity, index) => (

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

                  ))

                )}

              </div>

            </div>

            {/* PLATFORM SUMMARY */}

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-lg font-semibold text-slate-800">
                Platform Summary
              </h2>

              <div className="mt-6 space-y-5">

                {/* STUDENTS */}

                <div>

                  <div className="mb-2 flex justify-between">

                    <span className="text-sm text-slate-600">
                      Student Accounts
                    </span>

                    <span className="text-sm font-semibold">
                      {stats.totalStudents}
                    </span>

                  </div>

                  <div className="h-2 rounded-full bg-slate-200">

                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{
                        width: `${studentPercentage}%`,
                      }}
                    />

                  </div>

                </div>

                {/* FACULTY */}

                <div>

                  <div className="mb-2 flex justify-between">

                    <span className="text-sm text-slate-600">
                      Faculty Accounts
                    </span>

                    <span className="text-sm font-semibold">
                      {stats.totalFaculty}
                    </span>

                  </div>

                  <div className="h-2 rounded-full bg-slate-200">

                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{
                        width: `${facultyPercentage}%`,
                      }}
                    />

                  </div>

                </div>

                {/* PUBLISHED EXAMS */}

                <div>

                  <div className="mb-2 flex justify-between">

                    <span className="text-sm text-slate-600">
                      Published Exams
                    </span>

                    <span className="text-sm font-semibold">
                      {publishedExams}
                    </span>

                  </div>

                  <div className="h-2 rounded-full bg-slate-200">

                    <div
                      className="h-2 rounded-full bg-purple-500"
                      style={{
                        width: `${examPercentage}%`,
                      }}
                    />

                  </div>

                </div>

                {/* ACTIVE EXAMS */}

                <div>

                  <div className="mb-2 flex justify-between">

                    <span className="text-sm text-slate-600">
                      Active Exams
                    </span>

                    <span className="text-sm font-semibold">
                      {stats.activeExams}
                    </span>

                  </div>

                  <div className="h-2 rounded-full bg-slate-200">

                    <div
                      className="h-2 rounded-full bg-orange-500"
                      style={{
                        width: `${activeExamPercentage}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ADMIN MONITORING */}

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="text-lg font-semibold text-slate-800">
                  Admin Monitoring
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Monitor users, exams, participation and performance.
                </p>

              </div>

              <button
                onClick={() => navigate("/admin/reports")}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                View Full Reports
              </button>

            </div>

          </div>

          {/* MONITORING SUMMARY */}

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* STUDENTS APPEARED */}

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-sm text-slate-500">
                Students Appeared
              </p>

              <h3 className="mt-2 text-3xl font-bold text-slate-800">
                {stats.studentsAppeared}
              </h3>

            </div>

            {/* AVERAGE SCORE */}

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-sm text-slate-500">
                Average Score
              </p>

              <h3 className="mt-2 text-3xl font-bold text-slate-800">
                {stats.averageScore}%
              </h3>

            </div>

            {/* PASSED */}

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-sm text-slate-500">
                Passed
              </p>

              <h3 className="mt-2 text-3xl font-bold text-green-600">
                {stats.passed}
              </h3>

            </div>

            {/* FAILED */}

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-sm text-slate-500">
                Failed
              </p>

              <h3 className="mt-2 text-3xl font-bold text-red-500">
                {stats.failed}
              </h3>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default AdminDashboard;
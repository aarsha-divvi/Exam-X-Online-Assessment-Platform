import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";

function Reports() {
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
        alert(data.message || "Failed to load reports");
        return;
      }

      setReports(data);
    } catch (error) {
      console.error(error);
      alert("Cannot connect to backend");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Loading Reports...
        </h1>
      </div>
    );
  }

  if (!reports) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Reports
        </h1>

        <p className="mt-2 text-slate-500">
          Unable to load report data.
        </p>
      </div>
    );
  }

  const { stats, users, exams, results, participation } = reports;

  return (
    <div className="min-h-screen bg-slate-100">

      <AdminSidebar />

      <div className="ml-0 md:ml-64">

        <AdminNavbar />

        <main className="p-4 sm:p-6 lg:p-8">

          {/* PAGE HEADING */}

          <div className="mb-8">

            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Reports & Analytics
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor platform users, exams, results and participation.
            </p>

          </div>

          {/* MAIN STATISTICS */}

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-sm text-slate-500">
                Total Users
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {stats.totalUsers}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                All registered accounts
              </p>

            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-sm text-slate-500">
                Total Exams
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {stats.totalExams}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Created exams
              </p>

            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-sm text-slate-500">
                Average Score
              </p>

              <h2 className="mt-2 text-3xl font-bold text-blue-600">
                {stats.averageScore}%
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Across completed exams
              </p>

            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-sm text-slate-500">
                Pass Rate
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {stats.passRate}%
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Completed submissions
              </p>

            </div>

          </div>

          {/* USER + EXAM CHARTS */}

          <div className="mt-8 grid gap-6 xl:grid-cols-2">

            {/* USER DISTRIBUTION */}

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <h2 className="text-lg font-semibold text-slate-800">
                User Distribution
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Number of users by role
              </p>

              <div className="mt-6 h-64 sm:h-80">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart data={users.roleData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="role" />

                    <YAxis allowDecimals={false} />

                    <Tooltip />

                    <Bar
                      dataKey="count"
                      fill="#2563eb"
                      radius={[6, 6, 0, 0]}
                    />

                  </BarChart>
                </ResponsiveContainer>

              </div>

            </div>

            {/* EXAM STATUS */}

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <h2 className="text-lg font-semibold text-slate-800">
                Exam Status
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current status of all exams
              </p>

              <div className="mt-6 h-64 sm:h-80">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart data={exams.statusData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="status" />

                    <YAxis allowDecimals={false} />

                    <Tooltip />

                    <Bar
                      dataKey="count"
                      fill="#7c3aed"
                      radius={[6, 6, 0, 0]}
                    />

                  </BarChart>
                </ResponsiveContainer>

              </div>

            </div>

          </div>

          {/* RESULT + PARTICIPATION */}

          <div className="mt-6 grid gap-6 xl:grid-cols-2">

            {/* RESULT DISTRIBUTION */}

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <h2 className="text-lg font-semibold text-slate-800">
                Result Distribution
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Passed and failed submissions
              </p>

              <div className="mt-4 h-64 sm:h-80">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>

                    <Pie
                      data={results.resultData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius="70%"
                      label
                    >
                      {results.resultData.map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              index === 0
                                ? "#22c55e"
                                : "#ef4444"
                            }
                          />
                        )
                      )}
                    </Pie>

                    <Tooltip />

                    <Legend />

                  </PieChart>
                </ResponsiveContainer>

              </div>

            </div>

            {/* PARTICIPATION */}

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <h2 className="text-lg font-semibold text-slate-800">
                Exam Participation
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Students participating in each exam
              </p>

              <div className="mt-6 h-64 sm:h-80">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={participation}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 10,
                    }}
                  >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="exam"
                      interval={0}
                      angle={-20}
                      textAnchor="end"
                      height={70}
                    />

                    <YAxis allowDecimals={false} />

                    <Tooltip />

                    <Bar
                      dataKey="participants"
                      fill="#f97316"
                      radius={[6, 6, 0, 0]}
                    />

                  </BarChart>
                </ResponsiveContainer>

              </div>

            </div>

          </div>

          {/* USER STATISTICS */}

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <h2 className="text-lg font-semibold text-slate-800">
              User Statistics
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Breakdown of registered users
            </p>

            <div className="mt-6 space-y-5">

              {/* STUDENTS */}

              <div>

                <div className="mb-2 flex justify-between">

                  <span className="text-sm text-slate-600">
                    Students
                  </span>

                  <span className="text-sm font-semibold text-slate-800">
                    {stats.totalStudents}
                  </span>

                </div>

                <div className="h-2 rounded-full bg-slate-200">

                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{
                      width: `${
                        stats.totalUsers > 0
                          ? (stats.totalStudents /
                              stats.totalUsers) *
                            100
                          : 0
                      }%`,
                    }}
                  />

                </div>

              </div>

              {/* FACULTY */}

              <div>

                <div className="mb-2 flex justify-between">

                  <span className="text-sm text-slate-600">
                    Faculty
                  </span>

                  <span className="text-sm font-semibold text-slate-800">
                    {stats.totalFaculty}
                  </span>

                </div>

                <div className="h-2 rounded-full bg-slate-200">

                  <div
                    className="h-2 rounded-full bg-purple-600"
                    style={{
                      width: `${
                        stats.totalUsers > 0
                          ? (stats.totalFaculty /
                              stats.totalUsers) *
                            100
                          : 0
                      }%`,
                    }}
                  />

                </div>

              </div>

              {/* ADMINS */}

              <div>

                <div className="mb-2 flex justify-between">

                  <span className="text-sm text-slate-600">
                    Admins
                  </span>

                  <span className="text-sm font-semibold text-slate-800">
                    {stats.totalAdmins}
                  </span>

                </div>

                <div className="h-2 rounded-full bg-slate-200">

                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{
                      width: `${
                        stats.totalUsers > 0
                          ? (stats.totalAdmins /
                              stats.totalUsers) *
                            100
                          : 0
                      }%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* RESULT STATISTICS */}

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-sm text-slate-500">
                Students Appeared
              </p>

              <h3 className="mt-2 text-3xl font-bold text-slate-800">
                {stats.studentsAppeared}
              </h3>

            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-sm text-slate-500">
                Passed
              </p>

              <h3 className="mt-2 text-3xl font-bold text-green-600">
                {stats.passed}
              </h3>

            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-sm text-slate-500">
                Failed
              </p>

              <h3 className="mt-2 text-3xl font-bold text-red-500">
                {stats.failed}
              </h3>

            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-sm text-slate-500">
                Completed Exams
              </p>

              <h3 className="mt-2 text-3xl font-bold text-blue-600">
                {stats.completedExams}
              </h3>

            </div>

          </div>

          {/* EXAM MONITORING */}

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <h2 className="text-lg font-semibold text-slate-800">
              Exam Monitoring
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Overview of all exams and their performance.
            </p>

            <div className="mt-6 overflow-x-auto">

              <table className="w-full min-w-[700px]">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                      Exam
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                      Status
                    </th>

                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-500">
                      Participants
                    </th>

                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-500">
                      Average
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {exams.examData.length > 0 ? (

                    exams.examData.map((exam) => (

                      <tr
                        key={exam.id}
                        className="hover:bg-slate-50"
                      >

                        <td className="px-4 py-4 text-sm font-medium text-slate-800">
                          {exam.title}
                        </td>

                        <td className="px-4 py-4">

                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                            {exam.status}
                          </span>

                        </td>

                        <td className="px-4 py-4 text-center text-sm text-slate-600">
                          {exam.participants}
                        </td>

                        <td className="px-4 py-4 text-center text-sm font-semibold text-slate-800">
                          {exam.average}%
                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="4"
                        className="px-4 py-8 text-center text-sm text-slate-500"
                      >
                        No exam data available.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* PARTICIPATION DETAILS */}

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <h2 className="text-lg font-semibold text-slate-800">
              Participation Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Number of students who participated in each exam.
            </p>

            <div className="mt-6 overflow-x-auto">

              <table className="w-full min-w-[500px]">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                      Exam
                    </th>

                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-500">
                      Participants
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {participation.length > 0 ? (

                    participation.map((item, index) => (

                      <tr
                        key={index}
                        className="hover:bg-slate-50"
                      >

                        <td className="px-4 py-4 text-sm font-medium text-slate-800">
                          {item.exam}
                        </td>

                        <td className="px-4 py-4 text-center text-sm text-slate-600">
                          {item.participants}
                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="2"
                        className="px-4 py-8 text-center text-sm text-slate-500"
                      >
                        No participation data available.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* RECENT USERS */}

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <h2 className="text-lg font-semibold text-slate-800">
              Recent Users
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Recently registered users.
            </p>

            <div className="mt-6 overflow-x-auto">

              <table className="w-full min-w-[650px]">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                      Name
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                      Email
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                      Role
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                      Registered
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {users.recentUsers.length > 0 ? (

                    users.recentUsers.map((user) => (

                      <tr
                        key={user.id}
                        className="hover:bg-slate-50"
                      >

                        <td className="px-4 py-4 text-sm font-semibold text-slate-800">
                          {user.name}
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-600">
                          {user.email}
                        </td>

                        <td className="px-4 py-4">

                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                            {user.role}
                          </span>

                        </td>

                        <td className="px-4 py-4 text-sm text-slate-500">
                          {user.createdAt
                            ? new Date(
                                user.createdAt
                              ).toLocaleString()
                            : "Recently"}
                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="4"
                        className="px-4 py-8 text-center text-sm text-slate-500"
                      >
                        No recent users available.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Reports;
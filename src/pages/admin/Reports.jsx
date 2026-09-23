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
      alert("Cannot connect to backend");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-2xl font-bold">
          Loading Reports...
        </h1>
      </div>
    );
  }

  if (!reports) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-2xl font-bold">
          Reports
        </h1>

        <p className="mt-2 text-gray-500">
          Unable to load report data.
        </p>
      </div>
    );
  }

  const {
    stats,
    users,
    exams,
    results,
    participation,
  } = reports;

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-8">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Advanced Admin Reports
        </h1>

        <p className="mt-1 text-gray-500">
          Analyze users, exams, participation and performance
        </p>

      </div>

      {/* MAIN STATISTICS */}

      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl bg-white p-6 shadow-sm">

          <p className="text-gray-500">
            Total Users
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {stats.totalUsers}
          </h2>

          <p className="mt-2 text-sm text-blue-600">
            {stats.totalStudents} students
          </p>

        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">

          <p className="text-gray-500">
            Total Exams
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {stats.totalExams}
          </h2>

          <p className="mt-2 text-sm text-green-600">
            {stats.activeExams} active
          </p>

        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">

          <p className="text-gray-500">
            Average Score
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {stats.averageScore}%
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Across completed exams
          </p>

        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">

          <p className="text-gray-500">
            Pass Rate
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {stats.passRate}%
          </h2>

          <p className="mt-2 text-sm text-green-600">
            {stats.passed} passed
          </p>

        </div>

      </div>

      {/* CHARTS */}

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* USER DISTRIBUTION */}

        <div className="rounded-xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-gray-800">
            User Distribution
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Users grouped by role
          </p>

          {users.roleData.length === 0 ? (

            <div className="flex h-72 items-center justify-center text-gray-500">
              No user data available.
            </div>

          ) : (

            <div className="mt-4 h-72">

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
                    name="Users"
                    fill="#2563eb"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          )}

        </div>

        {/* EXAM STATUS */}

        <div className="rounded-xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-gray-800">
            Exam Status
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Current status of all exams
          </p>

          {exams.statusData.length === 0 ? (

            <div className="flex h-72 items-center justify-center text-gray-500">
              No exam data available.
            </div>

          ) : (

            <div className="mt-4 h-72">

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
                    name="Exams"
                    fill="#7c3aed"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          )}

        </div>

        {/* RESULT CHART */}

        <div className="rounded-xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-gray-800">
            Result Distribution
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Passed and failed results
          </p>

          {results.resultData.length === 0 ||
          results.passed + results.failed === 0 ? (

            <div className="flex h-72 items-center justify-center text-gray-500">
              No result data available.
            </div>

          ) : (

            <div className="mt-4 h-72">

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
                    outerRadius={90}
                    label
                  >

                    {results.resultData.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.name === "Passed"
                              ? "#16a34a"
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

          )}

        </div>

        {/* PARTICIPATION CHART */}

        <div className="rounded-xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-gray-800">
            Exam Participation
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Students completing each exam
          </p>

          {participation.length === 0 ? (

            <div className="flex h-72 items-center justify-center text-gray-500">
              No participation data available.
            </div>

          ) : (

            <div className="mt-4 h-72">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart data={participation}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="exam"
                    tick={{ fontSize: 12 }}
                  />

                  <YAxis allowDecimals={false} />

                  <Tooltip />

                  <Bar
                    dataKey="participants"
                    name="Participants"
                    fill="#ea580c"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          )}

        </div>

      </div>

      {/* USER STATISTICS */}

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

        <div className="rounded-xl bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-xl font-bold text-gray-800">
            User Statistics
          </h2>

          <div className="space-y-5">

            {users.roleData.map((item) => {

              const percentage =
                stats.totalUsers > 0
                  ? Math.round(
                      (item.count /
                        stats.totalUsers) *
                        100
                    )
                  : 0;

              return (
                <div key={item.role}>

                  <div className="mb-2 flex justify-between">

                    <span className="font-medium">
                      {item.role}
                    </span>

                    <span className="text-gray-500">
                      {item.count}
                    </span>

                  </div>

                  <div className="h-3 w-full rounded-full bg-gray-200">

                    <div
                      className="h-3 rounded-full bg-blue-600"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* RESULT STATISTICS */}

        <div className="rounded-xl bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-xl font-bold text-gray-800">
            Result Statistics
          </h2>

          <div className="grid grid-cols-2 gap-5">

            <div className="rounded-xl border p-5">

              <p className="text-gray-500">
                Passed
              </p>

              <h3 className="mt-2 text-3xl font-bold text-green-600">
                {results.passed}
              </h3>

            </div>

            <div className="rounded-xl border p-5">

              <p className="text-gray-500">
                Failed
              </p>

              <h3 className="mt-2 text-3xl font-bold text-red-500">
                {results.failed}
              </h3>

            </div>

          </div>

          <div className="mt-6">

            <div className="mb-2 flex justify-between text-sm">

              <span>
                Pass Rate
              </span>

              <span>
                {stats.passRate}%
              </span>

            </div>

            <div className="h-4 w-full rounded-full bg-gray-200">

              <div
                className="h-4 rounded-full bg-green-500"
                style={{
                  width: `${stats.passRate}%`,
                }}
              />

            </div>

          </div>

        </div>

      </div>

      {/* EXAM MONITORING */}

      <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold text-gray-800">
              Exam Monitoring
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Current exam status across the platform
            </p>

          </div>

          <div className="text-sm text-gray-500">
            {stats.totalExams} total exams
          </div>

        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

          {exams.statusData.map((item) => (

            <div
              key={item.status}
              className="rounded-xl border p-5"
            >

              <p className="text-gray-500">
                {item.status}
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                {item.count}
              </h3>

            </div>

          ))}

        </div>

      </div>

      {/* EXAM PERFORMANCE */}

      <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">

        <h2 className="mb-2 text-xl font-bold text-gray-800">
          Exam Performance
        </h2>

        <p className="mb-6 text-sm text-gray-500">
          Participation and average performance for each exam
        </p>

        {exams.examData.length === 0 ? (

          <div className="py-10 text-center text-gray-500">
            No exam data available yet.
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b">

                  <th className="p-3">
                    Exam
                  </th>

                  <th className="p-3">
                    Status
                  </th>

                  <th className="p-3">
                    Participants
                  </th>

                  <th className="p-3">
                    Average Score
                  </th>

                </tr>

              </thead>

              <tbody>

                {exams.examData.map((exam) => (

                  <tr
                    key={String(exam.id)}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3 font-medium">
                      {exam.title}
                    </td>

                    <td className="p-3">

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                        {exam.status}
                      </span>

                    </td>

                    <td className="p-3">
                      {exam.participants}
                    </td>

                    <td className="p-3 font-medium">
                      {exam.average}%
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* PARTICIPATION DETAILS */}

      <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">

        <h2 className="mb-2 text-xl font-bold text-gray-800">
          Participation Details
        </h2>

        <p className="mb-6 text-sm text-gray-500">
          Number of students who completed each exam
        </p>

        {participation.length === 0 ? (

          <div className="py-10 text-center text-gray-500">
            No participation data available yet.
          </div>

        ) : (

          <div className="space-y-5">

            {participation.map((item) => (

              <div key={item.exam}>

                <div className="mb-2 flex justify-between">

                  <span className="font-medium">
                    {item.exam}
                  </span>

                  <span className="text-gray-500">
                    {item.participants} participants
                  </span>

                </div>

                <div className="h-3 w-full rounded-full bg-gray-200">

                  <div
                    className="h-3 rounded-full bg-blue-600"
                    style={{
                      width: `${Math.min(
                        item.participants * 10,
                        100
                      )}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* RECENT USERS */}

      <div className="rounded-xl bg-white p-6 shadow-sm">

        <h2 className="mb-2 text-xl font-bold text-gray-800">
          Recent Users
        </h2>

        <p className="mb-6 text-sm text-gray-500">
          Recently registered users
        </p>

        {users.recentUsers.length === 0 ? (

          <p className="text-gray-500">
            No users available.
          </p>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b">

                  <th className="p-3">
                    Name
                  </th>

                  <th className="p-3">
                    Email
                  </th>

                  <th className="p-3">
                    Role
                  </th>

                </tr>

              </thead>

              <tbody>

                {users.recentUsers.map((user) => (

                  <tr
                    key={String(user.id)}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3 font-medium">
                      {user.name}
                    </td>

                    <td className="p-3 text-gray-600">
                      {user.email}
                    </td>

                    <td className="p-3">

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                        {user.role}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Reports;
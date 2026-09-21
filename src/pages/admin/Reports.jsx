import {
  BarChart3,
  Users,
  CheckCircle,
  FileText,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import StatCard from "../../components/StatCard";

function Reports() {
  const examData = [
    {
      exam: "Data Structures",
      average: 78,
    },
    {
      exam: "DBMS",
      average: 72,
    },
    {
      exam: "Operating Systems",
      average: 81,
    },
    {
      exam: "Computer Networks",
      average: 75,
    },
    {
      exam: "Java",
      average: 84,
    },
  ];

  const resultData = [
    {
      name: "Passed",
      value: 82,
    },
    {
      name: "Failed",
      value: 18,
    },
  ];

  const departmentData = [
    {
      department: "CSE",
      students: 180,
    },
    {
      department: "AI&DS",
      students: 120,
    },
    {
      department: "ECE",
      students: 100,
    },
    {
      department: "EEE",
      students: 70,
    },
    {
      department: "MECH",
      students: 50,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="ml-64">
        <AdminNavbar />

        <main className="p-4 md:p-8">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">
              Reports & Analytics
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor exam performance and platform statistics.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Exams"
              value="42"
              description="Published exams"
              icon={<FileText size={25} />}
            />

            <StatCard
              title="Students Appeared"
              value="450"
              description="Across all exams"
              icon={<Users size={25} />}
            />

            <StatCard
              title="Average Score"
              value="76%"
              description="Overall average"
              icon={<BarChart3 size={25} />}
            />

            <StatCard
              title="Pass Rate"
              value="82%"
              description="Overall pass percentage"
              icon={<CheckCircle size={25} />}
            />
          </div>

          {/* Charts */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Exam Performance */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-slate-800">
                  Exam Performance
                </h2>

                <p className="text-sm text-slate-500">
                  Average score by exam
                </p>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={examData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="exam"
                      tick={{ fontSize: 11 }}
                    />

                    <YAxis domain={[0, 100]} />

                    <Tooltip />

                    <Bar
                      dataKey="average"
                      fill="#2563eb"
                      radius={[5, 5, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pass / Fail */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-slate-800">
                  Pass / Fail Analysis
                </h2>

                <p className="text-sm text-slate-500">
                  Overall student results
                </p>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={resultData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {resultData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index]}
                        />
                      ))}
                    </Pie>

                    <Tooltip />

                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Department Statistics */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-800">
                Department Statistics
              </h2>

              <p className="text-sm text-slate-500">
                Number of students by department
              </p>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="department" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="students"
                    fill="#7c3aed"
                    radius={[5, 5, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Reports;
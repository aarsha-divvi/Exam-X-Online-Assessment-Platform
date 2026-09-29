import StudentSidebar from "../../components/StudentSidebar";
import StudentNavbar from "../../components/StudentNavbar";
import ExamCard from "../../components/ExamCard";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";

function StudentDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");

    navigate("/", { replace: true });
  };

  const exams = [
    {
      id: 1,
      title: "Data Structures Assessment",
      subject: "Data Structures",
      questions: 30,
      duration: 45,
      difficulty: "Medium",
      startTime: "Today, 2:00 PM",
    },
    {
      id: 2,
      title: "Database Management Test",
      subject: "DBMS",
      questions: 25,
      duration: 30,
      difficulty: "Easy",
      startTime: "Tomorrow, 10:00 AM",
    },
    {
      id: 3,
      title: "Artificial Intelligence Quiz",
      subject: "AI",
      questions: 40,
      duration: 60,
      difficulty: "Hard",
      startTime: "25 Sep, 11:00 AM",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <StudentSidebar onLogout={handleLogout} />

      <div className="md:ml-64">
        <StudentNavbar />

        <main className="p-4 md:p-8">
          {/* Page heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Student Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
              Welcome back! Here's your learning and assessment overview.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <BookOpen className="text-blue-600" size={28} />

              <p className="mt-4 text-sm text-slate-500">
                Total Exams
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-800">
                12
              </h2>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <CheckCircle className="text-green-600" size={28} />

              <p className="mt-4 text-sm text-slate-500">
                Completed
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-800">
                8
              </h2>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <Clock className="text-orange-500" size={28} />

              <p className="mt-4 text-sm text-slate-500">
                Upcoming
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-800">
                4
              </h2>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <TrendingUp className="text-purple-600" size={28} />

              <p className="mt-4 text-sm text-slate-500">
                Average Score
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-800">
                82%
              </h2>
            </div>
          </div>

          {/* Upcoming exams */}
          <section className="mt-10">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Upcoming Exams
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Exams available for you
                </p>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {exams.map((exam) => (
                <ExamCard key={exam.id} {...exam} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;
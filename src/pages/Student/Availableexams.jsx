import { useState } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import StudentNavbar from "../../components/StudentNavbar";
import ExamCard from "../../components/ExamCard";

function AvailableExams() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");

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
    {
      id: 4,
      title: "Java Programming Test",
      subject: "Java",
      questions: 35,
      duration: 50,
      difficulty: "Medium",
      startTime: "26 Sep, 9:30 AM",
    },
    {
      id: 5,
      title: "Computer Networks Exam",
      subject: "Computer Networks",
      questions: 30,
      duration: 45,
      difficulty: "Hard",
      startTime: "27 Sep, 11:00 AM",
    },
    {
      id: 6,
      title: "Operating Systems Quiz",
      subject: "Operating Systems",
      questions: 20,
      duration: 25,
      difficulty: "Easy",
      startTime: "28 Sep, 2:00 PM",
    },
  ];

  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(search.toLowerCase()) ||
      exam.subject.toLowerCase().includes(search.toLowerCase());

    const matchesDifficulty =
      difficulty === "All" || exam.difficulty === difficulty;

    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <StudentSidebar />

      <div className="md:ml-64">
        <StudentNavbar />

        <main className="p-4 md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Available Exams
            </h1>

            <p className="mt-2 text-slate-500">
              Browse and attend exams assigned to you.
            </p>
          </div>

          <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm md:flex-row">
            <input
              type="text"
              placeholder="Search by exam or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="rounded-lg border border-slate-300 px-4 py-3 outline-none"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {filteredExams.length > 0 ? (
            <div className="grid gap-5 lg:grid-cols-3">
              {filteredExams.map((exam) => (
                <ExamCard key={exam.id} {...exam} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
              <h2 className="text-xl font-semibold text-slate-800">
                No exams found
              </h2>

              <p className="mt-2 text-slate-500">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AvailableExams;
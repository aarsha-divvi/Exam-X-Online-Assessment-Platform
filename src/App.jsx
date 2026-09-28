<<<<<<< HEAD
<<<<<<< HEAD
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import StudentLogin from "./pages/student/StudentLogin";
import StudentRegister from "./pages/student/StudentRegister";
import StudentDashboard from "./pages/student/StudentDashboard";
import AvailableExams from "./pages/student/AvailableExams";
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FacultyDashboard from "./pages/FacultyDashboard";
import QuestionBank from "./pages/QuestionBank";
import CreateExam from "./pages/CreateExam";
import ScheduleExam from "./pages/ScheduleExam";
import FacultyResults from "./pages/FacultyResults";
import FacultyResultDetails from "./pages/FacultyResultDetails";
import ExamManagement from "./pages/ExamManagement";
import ExamDetails from "./pages/ExamDetails";
import AIQuestionGenerator from "./pages/AIQuestionGenerator";
>>>>>>> origin/member3-faculty

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route
          path="/"
          element={<Navigate to="/student/login" replace />}
        />

        <Route
          path="/student/login"
          element={<StudentLogin />}
        />

        <Route
          path="/student/register"
          element={<StudentRegister />}
        />

        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="/student/exams"
          element={<AvailableExams />}
        />

        <Route
          path="*"
          element={<Navigate to="/student/login" replace />}
        />
=======

        {/* Faculty Dashboard */}
        <Route
          path="/"
          element={<FacultyDashboard />}
        />

        <Route
          path="/faculty"
          element={<FacultyDashboard />}
        />

        {/* Faculty Question Bank */}
        <Route
          path="/question-bank"
          element={<QuestionBank />}
        />

        {/* AI Question Generator */}
        <Route
          path="/ai-question-generator"
          element={<AIQuestionGenerator />}
        />

        {/* Create Exam */}
        <Route
          path="/create-exam"
          element={<CreateExam />}
        />

        {/* Schedule Exam */}
        <Route
          path="/schedule-exam"
          element={<ScheduleExam />}
        />

        {/* Faculty Results */}
        <Route
          path="/faculty-results"
          element={<FacultyResults />}
        />

        {/* Faculty Result Details */}
        <Route
          path="/faculty-results/student/:studentId/exam/:examId"
          element={<FacultyResultDetails />}
        />

        {/* Exam Management */}
        <Route
          path="/exam-management"
          element={<ExamManagement />}
        />

        {/* Exam Details */}
        <Route
          path="/exam-details/:id"
          element={<ExamDetails />}
        />

>>>>>>> origin/member3-faculty
      </Routes>
    </BrowserRouter>
  );
}

=======
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import Reports from "./pages/admin/Reports";

function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token || !user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <ManageUsers />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <AdminProtectedRoute>
              <Reports />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

>>>>>>> origin/Hansika
export default App;
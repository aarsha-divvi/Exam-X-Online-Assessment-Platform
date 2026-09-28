import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// ==================== STUDENT ====================
import StudentLogin from "./pages/Student/Studentlogin";
import StudentRegister from "./pages/Student/Studentregister";
import StudentDashboard from "./pages/Student/Studentdashboard";
import AvailableExams from "./pages/Student/Availableexams";

// ==================== FACULTY ====================
import FacultyDashboard from "./pages/FacultyDashboard";
import QuestionBank from "./pages/QuestionBank";
import CreateExam from "./pages/CreateExam";
import ScheduleExam from "./pages/ScheduleExam";
import FacultyResults from "./pages/FacultyResults";
import FacultyResultDetails from "./pages/FacultyResultDetails";
import ExamManagement from "./pages/ExamManagement";
import ExamDetails from "./pages/ExamDetails";
import AIQuestionGenerator from "./pages/AIQuestionGenerator";

// ==================== ADMIN ====================
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import Reports from "./pages/admin/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==================== DEFAULT ==================== */}
        <Route
          path="/"
          element={<Navigate to="/student/login" replace />}
        />

        {/* ==================== STUDENT ==================== */}
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

        {/* ==================== FACULTY ==================== */}
        <Route
          path="/faculty"
          element={<FacultyDashboard />}
        />

        <Route
          path="/question-bank"
          element={<QuestionBank />}
        />

        <Route
          path="/ai-question-generator"
          element={<AIQuestionGenerator />}
        />

        <Route
          path="/create-exam"
          element={<CreateExam />}
        />

        <Route
          path="/schedule-exam"
          element={<ScheduleExam />}
        />

        <Route
          path="/faculty-results"
          element={<FacultyResults />}
        />

        <Route
          path="/faculty-results/student/:studentId/exam/:examId"
          element={<FacultyResultDetails />}
        />

        <Route
          path="/exam-management"
          element={<ExamManagement />}
        />

        <Route
          path="/exam-details/:id"
          element={<ExamDetails />}
        />

        {/* ==================== ADMIN ==================== */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/users"
          element={<ManageUsers />}
        />

        <Route
          path="/admin/reports"
          element={<Reports />}
        />

        {/* ==================== UNKNOWN URL ==================== */}
        <Route
          path="*"
          element={<Navigate to="/student/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
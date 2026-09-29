import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
// Landing

// Authentication
import RoleLogin from "./pages/RoleLogin";
import ProtectedRoute from "./components/ProtectedRoute";

// Student
import StudentLogin from "./pages/Student/Studentlogin";
import StudentRegister from "./pages/Student/Studentregister";
import StudentDashboard from "./pages/Student/Studentdashboard";
import AvailableExams from "./pages/Student/Availableexams";

// Faculty
import FacultyDashboard from "./pages/FacultyDashboard";
import QuestionBank from "./pages/QuestionBank";
import CreateExam from "./pages/CreateExam";
import ScheduleExam from "./pages/ScheduleExam";
import FacultyResults from "./pages/FacultyResults";
import FacultyResultDetails from "./pages/FacultyResultDetails";
import ExamManagement from "./pages/ExamManagement";
import ExamDetails from "./pages/ExamDetails";
import AIQuestionGenerator from "./pages/AIQuestionGenerator";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import Reports from "./pages/admin/Reports";

function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <h1>Exam-X Online Assessment Platform</h1>
      <p>Select your role</p>

      <button onClick={() => navigate("/student/login")}>
        Student Login
      </button>

      <button onClick={() => navigate("/faculty/login")}>
        Faculty Login
      </button>

      <button onClick={() => navigate("/admin/login")}>
        Admin Login
      </button>
    </div>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing */}
        <Route path="/" element={<RoleSelection />} />

        {/* Student's existing login */}
        <Route path="/student/login" element={<StudentLogin />} />

        <Route
          path="/student/register"
          element={<StudentRegister />}
        />

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/exams"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <AvailableExams />
            </ProtectedRoute>
          }
        />

        {/* Faculty Login */}
        <Route
          path="/faculty/login"
          element={
            <RoleLogin />
          }
        />

        {/* Faculty */}
        <Route
          path="/faculty"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/question-bank"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <QuestionBank />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-question-generator"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <AIQuestionGenerator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-exam"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CreateExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/schedule-exam"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <ScheduleExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty-results"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <FacultyResults />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty-results/student/:studentId/exam/:examId"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <FacultyResultDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exam-management"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <ExamManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exam-details/:id"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <ExamDetails />
            </ProtectedRoute>
          }
        />

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={
            <RoleLogin />
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
// Landing
import ForgotPassword from "./pages/Student/ForgotPassword";
import "./App.css";
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

  const roles = [
    {
      title: "Student",
      description:
        "Take exams, solve coding questions, and track your results.",
      icon: "🎓",
      path: "/student/login",
      button: "Continue as Student",
    },
    {
      title: "Faculty",
      description:
        "Create exams, manage questions, schedule assessments, and view results.",
      icon: "👨‍🏫",
      path: "/faculty/login",
      button: "Continue as Faculty",
    },
    {
      title: "Admin",
      description:
        "Manage users, monitor exams, and oversee the entire Exam-X platform.",
      icon: "🛡️",
      path: "/admin/login",
      button: "Continue as Admin",
    },
  ];

  return (
    <div className="role-selection-page">
      <div className="role-selection-overlay">
        <div className="role-selection-header">
          <div className="examx-logo">
            <span className="examx-logo-icon">X</span>
            <span className="examx-logo-text">Exam-X</span>
          </div>

          <h1>Online Assessment Platform</h1>

          <p>
            A secure and smart platform for online examinations,
            evaluation, and academic management.
          </p>
        </div>

        <div className="role-selection-cards">
          {roles.map((role) => (
            <div className="role-card" key={role.title}>
              <div className="role-icon">{role.icon}</div>

              <h2>{role.title}</h2>

              <p>{role.description}</p>

              <button
                onClick={() => navigate(role.path)}
                className="role-card-button"
              >
                {role.button}
                <span>→</span>
              </button>
            </div>
          ))}
        </div>

        <div className="role-selection-footer">
          <span>Exam-X Online Assessment Platform</span>
          <span>•</span>
          <span>Secure • Fast • Reliable</span>
        </div>
      </div>
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
  path="/student/forgot-password"
  element={<ForgotPassword />}
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
        <Route path="/faculty/login" element={<RoleLogin />} />

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
        <Route path="/admin/login" element={<RoleLogin />} />
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
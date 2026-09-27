import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import StudentLogin from "./pages/student/StudentLogin";
import StudentRegister from "./pages/student/StudentRegister";
import StudentDashboard from "./pages/student/StudentDashboard";
import AvailableExams from "./pages/student/AvailableExams";

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
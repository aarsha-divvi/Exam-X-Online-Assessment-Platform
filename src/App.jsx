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

function App() {
  return (
    <BrowserRouter>
      <Routes>

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;
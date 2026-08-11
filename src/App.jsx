import { BrowserRouter, Routes, Route } from "react-router-dom";

import FacultyDashboard from "./pages/FacultyDashboard";
import QuestionBank from "./pages/QuestionBank";
import CreateExam from "./pages/CreateExam";
import ScheduleExam from "./pages/ScheduleExam";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Faculty Dashboard */}
        <Route path="/" element={<FacultyDashboard />} />

        <Route path="/faculty" element={<FacultyDashboard />} />

        {/* Faculty Question Bank */}
        <Route path="/question-bank" element={<QuestionBank />} />

        {/* Create Exam */}
        <Route path="/create-exam" element={<CreateExam />} />

        {/* Schedule Exam */}
        <Route path="/schedule-exam" element={<ScheduleExam />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
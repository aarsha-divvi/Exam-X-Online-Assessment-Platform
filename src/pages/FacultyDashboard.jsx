import { Link } from "react-router-dom";
import "./FacultyDashboard.css";

function FacultyDashboard() {
  return (
    <div className="faculty-dashboard">

      <header className="faculty-header">
        <div>
          <h1>Faculty Dashboard</h1>
          <p>Welcome back, Faculty 👋</p>
        </div>

        <button className="logout-btn">Logout</button>
      </header>

      <main className="faculty-content">

        <div className="stats-grid">

          <div className="stat-card">
            <h3>Total Exams</h3>
            <p>12</p>
          </div>

          <div className="stat-card">
            <h3>Total Questions</h3>
            <p>85</p>
          </div>

          <div className="stat-card">
            <h3>Upcoming Exams</h3>
            <p>4</p>
          </div>

          <div className="stat-card">
            <h3>Completed Exams</h3>
            <p>8</p>
          </div>

        </div>

        <section className="dashboard-section">

          <h2>Quick Actions</h2>

          <div className="action-grid">

            <Link to="/question-bank" className="action-card">
              <span>📚</span>
              <h3>Question Bank</h3>
              <p>Create and manage questions</p>
            </Link>

            <Link to="/create-exam" className="action-card">
              <span>📝</span>
              <h3>Create Exam</h3>
              <p>Create a new examination</p>
            </Link>

            <Link to="/schedule-exam" className="action-card">
              <span>📅</span>
              <h3>Schedule Exam</h3>
              <p>Schedule an upcoming exam</p>
            </Link>

            <div className="action-card">
              <span>🤖</span>
              <h3>AI Questions</h3>
              <p>Generate questions using Gemini AI</p>
            </div>

          </div>

        </section>

        <section className="dashboard-section">

          <h2>Upcoming Exams</h2>

          <div className="exam-table">

            <div className="table-header">
              <span>Exam</span>
              <span>Date</span>
              <span>Time</span>
              <span>Status</span>
            </div>

            <div className="table-row">
              <span>Java Programming</span>
              <span>15 Aug 2026</span>
              <span>10:00 AM</span>
              <span className="status">Scheduled</span>
            </div>

            <div className="table-row">
              <span>DBMS</span>
              <span>18 Aug 2026</span>
              <span>2:00 PM</span>
              <span className="status">Scheduled</span>
            </div>

            <div className="table-row">
              <span>Python Programming</span>
              <span>22 Aug 2026</span>
              <span>11:00 AM</span>
              <span className="status">Scheduled</span>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default FacultyDashboard;
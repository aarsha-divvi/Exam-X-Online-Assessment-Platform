import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./FacultyDashboard.css";

const EXAM_API_URL = "http://localhost:5000/api/exams";
const QUESTION_API_URL = "http://localhost:5000/api/questions";

function FacultyDashboard() {
  const [exams, setExams] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [examResponse, questionResponse] =
        await Promise.all([
          axios.get(EXAM_API_URL),
          axios.get(QUESTION_API_URL),
        ]);

      setExams(examResponse.data);
      setTotalQuestions(questionResponse.data.length);
    } catch (error) {
      console.error(
        "Failed to load dashboard data:",
        error
      );

      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingExams = exams
    .filter((exam) => {
      if (!exam.scheduledDate) {
        return false;
      }

      const examDate = new Date(
        `${exam.scheduledDate}T00:00:00`
      );

      return (
        examDate >= today &&
        (exam.scheduleStatus === "Scheduled" ||
          exam.scheduleStatus === "Published")
      );
    })
    .sort((a, b) => {
      return (
        new Date(
          `${a.scheduledDate}T00:00:00`
        ) -
        new Date(
          `${b.scheduledDate}T00:00:00`
        )
      );
    });

  const completedExams = exams.filter((exam) => {
    if (!exam.scheduledDate) {
      return false;
    }

    const examDate = new Date(
      `${exam.scheduledDate}T00:00:00`
    );

    return examDate < today;
  });

  const publishedExams = exams.filter(
    (exam) => exam.scheduleStatus === "Published"
  );

  return (
    <div className="faculty-dashboard">

      {/* Sidebar */}

      <aside className="faculty-sidebar">

        <div className="sidebar-brand">

          <div className="brand-icon">
            🎓
          </div>

          <div>
            <h2>ExamX</h2>
            <span>Faculty Panel</span>
          </div>

        </div>


        <div className="sidebar-menu">

          <p className="menu-title">
            MAIN MENU
          </p>


          <Link
            to="/faculty"
            className="sidebar-link active"
          >
            <span className="sidebar-icon">▦</span>
            <span>Dashboard</span>
          </Link>


          <Link
            to="/question-bank"
            className="sidebar-link"
          >
            <span className="sidebar-icon">♧</span>
            <span>Question Bank</span>
          </Link>


          <Link
            to="/ai-question-generator"
            className="sidebar-link"
          >
            <span className="sidebar-icon">✦</span>
            <span>AI Questions</span>
          </Link>


          <Link
            to="/create-exam"
            className="sidebar-link"
          >
            <span className="sidebar-icon">▤</span>
            <span>Create Exam</span>
          </Link>


          <Link
            to="/schedule-exam"
            className="sidebar-link"
          >
            <span className="sidebar-icon">◷</span>
            <span>Schedule Exam</span>
          </Link>


          <Link
            to="/exam-management"
            className="sidebar-link"
          >
            <span className="sidebar-icon">⚙</span>
            <span>Exam Management</span>
          </Link>


          <Link
            to="/faculty-results"
            className="sidebar-link"
          >
            <span className="sidebar-icon">▥</span>
            <span>Results</span>
          </Link>

        </div>


        <div className="sidebar-bottom">

          <button
            className="sidebar-logout"
            type="button"
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* Main Area */}

      <div className="faculty-main">

        {/* Top Header */}

        <header className="faculty-topbar">

          <div className="topbar-title">

            <h1>Faculty Dashboard</h1>

            <p>
              Manage your exams and assessments
            </p>

          </div>


          <div className="topbar-right">

            <div className="search-box">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search..."
              />

            </div>


            <button
              className="notification-btn"
              type="button"
            >
              ♧
              <span className="notification-dot"></span>
            </button>


            <div className="faculty-profile">

              <div className="profile-icon">
                F
              </div>

              <div className="profile-details">

                <strong>Faculty</strong>

                <span>Faculty Member</span>

              </div>

            </div>

          </div>

        </header>


        {/* Dashboard Content */}

        <main className="faculty-content">

          {/* Welcome */}

          <div className="welcome-section">

            <div>

              <h2>Dashboard</h2>

              <p>
                Welcome back, Faculty. Here's what's
                happening in ExamX.
              </p>

            </div>

          </div>


          {/* Error */}

          {error && (
            <div className="dashboard-error">
              {error}
            </div>
          )}


          {/* Statistics */}

          <section className="stats-grid">

            <div className="stat-card">

              <div className="stat-content">

                <span className="stat-label">
                  Total Exams
                </span>

                <strong className="stat-value">
                  {loading ? "..." : exams.length}
                </strong>

                <span className="stat-subtext">
                  All created exams
                </span>

              </div>

              <div className="stat-icon blue">
                ▤
              </div>

            </div>


            <div className="stat-card">

              <div className="stat-content">

                <span className="stat-label">
                  Total Questions
                </span>

                <strong className="stat-value">
                  {loading ? "..." : totalQuestions}
                </strong>

                <span className="stat-subtext">
                  Questions in Question Bank
                </span>

              </div>

              <div className="stat-icon purple">
                ?
              </div>

            </div>


            <div className="stat-card">

              <div className="stat-content">

                <span className="stat-label">
                  Upcoming Exams
                </span>

                <strong className="stat-value">
                  {loading
                    ? "..."
                    : upcomingExams.length}
                </strong>

                <span className="stat-subtext">
                  Scheduled exams
                </span>

              </div>

              <div className="stat-icon green">
                ◷
              </div>

            </div>


            <div className="stat-card">

              <div className="stat-content">

                <span className="stat-label">
                  Published Exams
                </span>

                <strong className="stat-value">
                  {loading
                    ? "..."
                    : publishedExams.length}
                </strong>

                <span className="stat-subtext">
                  Available to students
                </span>

              </div>

              <div className="stat-icon orange">
                ✓
              </div>

            </div>

          </section>


          {/* Main Dashboard Grid */}

          <section className="dashboard-main-grid">

            {/* Upcoming Exams */}

            <div className="dashboard-card recent-card">

              <div className="card-header">

                <div>

                  <h2>Upcoming Exams</h2>

                  <p>
                    Scheduled examinations
                  </p>

                </div>

                <Link
                  to="/exam-management"
                  className="view-all-link"
                >
                  View All
                </Link>

              </div>


              <div className="exam-list">

                {loading ? (

                  <div className="empty-state">
                    Loading exams...
                  </div>

                ) : upcomingExams.length === 0 ? (

                  <div className="empty-state">
                    <span>📅</span>
                    <p>No upcoming exams</p>
                  </div>

                ) : (

                  upcomingExams
                    .slice(0, 5)
                    .map((exam) => (

                      <div
                        className="exam-list-item"
                        key={exam._id}
                      >

                        <div className="exam-item-icon">
                          ▤
                        </div>


                        <div className="exam-item-details">

                          <strong>
                            {exam.title}
                          </strong>

                          <span>
                            {exam.scheduledDate}
                            {exam.startTime &&
                            exam.endTime
                              ? ` • ${exam.startTime} - ${exam.endTime}`
                              : ""}
                          </span>

                        </div>


                        <div
                          className={`exam-status ${
                            exam.scheduleStatus ===
                            "Published"
                              ? "published"
                              : "scheduled"
                          }`}
                        >
                          {exam.scheduleStatus}
                        </div>

                      </div>

                    ))

                )}

              </div>

            </div>


            {/* Exam Summary */}

            <div className="dashboard-card summary-card">

              <div className="card-header">

                <div>

                  <h2>Exam Summary</h2>

                  <p>
                    Current exam overview
                  </p>

                </div>

              </div>


              <div className="summary-item">

                <div className="summary-label">

                  <span>All Exams</span>

                  <strong>
                    {loading ? "..." : exams.length}
                  </strong>

                </div>

                <div className="summary-bar">

                  <div
                    className="summary-fill blue-fill"
                    style={{
                      width:
                        exams.length > 0
                          ? "100%"
                          : "0%",
                    }}
                  ></div>

                </div>

              </div>


              <div className="summary-item">

                <div className="summary-label">

                  <span>Scheduled</span>

                  <strong>
                    {loading
                      ? "..."
                      : exams.filter(
                          (exam) =>
                            exam.scheduleStatus ===
                            "Scheduled"
                        ).length}
                  </strong>

                </div>

                <div className="summary-bar">

                  <div
                    className="summary-fill green-fill"
                    style={{
                      width:
                        exams.length > 0
                          ? `${
                              (exams.filter(
                                (exam) =>
                                  exam.scheduleStatus ===
                                  "Scheduled"
                              ).length /
                                exams.length) *
                              100
                            }%`
                          : "0%",
                    }}
                  ></div>

                </div>

              </div>


              <div className="summary-item">

                <div className="summary-label">

                  <span>Published</span>

                  <strong>
                    {loading
                      ? "..."
                      : publishedExams.length}
                  </strong>

                </div>

                <div className="summary-bar">

                  <div
                    className="summary-fill purple-fill"
                    style={{
                      width:
                        exams.length > 0
                          ? `${
                              (publishedExams.length /
                                exams.length) *
                              100
                            }%`
                          : "0%",
                    }}
                  ></div>

                </div>

              </div>


              <div className="summary-item">

                <div className="summary-label">

                  <span>Completed</span>

                  <strong>
                    {loading
                      ? "..."
                      : completedExams.length}
                  </strong>

                </div>

                <div className="summary-bar">

                  <div
                    className="summary-fill orange-fill"
                    style={{
                      width:
                        exams.length > 0
                          ? `${
                              (completedExams.length /
                                exams.length) *
                              100
                            }%`
                          : "0%",
                    }}
                  ></div>

                </div>

              </div>

            </div>

          </section>


          {/* Quick Actions */}

          <section className="quick-actions-section">

            <div className="section-heading">

              <div>

                <h2>Quick Actions</h2>

                <p>
                  Quickly access faculty features
                </p>

              </div>

            </div>


            <div className="quick-actions-grid">

              <Link
                to="/question-bank"
                className="quick-action-card"
              >
                <div className="quick-action-icon blue">
                  📚
                </div>

                <div>
                  <h3>Question Bank</h3>
                  <p>
                    Create and manage questions
                  </p>
                </div>
              </Link>


              <Link
                to="/ai-question-generator"
                className="quick-action-card"
              >
                <div className="quick-action-icon purple">
                  ✦
                </div>

                <div>
                  <h3>AI Questions</h3>
                  <p>
                    Generate questions using AI
                  </p>
                </div>
              </Link>


              <Link
                to="/create-exam"
                className="quick-action-card"
              >
                <div className="quick-action-icon green">
                  📝
                </div>

                <div>
                  <h3>Create Exam</h3>
                  <p>
                    Create a new examination
                  </p>
                </div>
              </Link>


              <Link
                to="/schedule-exam"
                className="quick-action-card"
              >
                <div className="quick-action-icon orange">
                  📅
                </div>

                <div>
                  <h3>Schedule Exam</h3>
                  <p>
                    Schedule an examination
                  </p>
                </div>
              </Link>


              <Link
                to="/exam-management"
                className="quick-action-card"
              >
                <div className="quick-action-icon blue">
                  ⚙
                </div>

                <div>
                  <h3>Exam Management</h3>
                  <p>
                    Edit and manage exams
                  </p>
                </div>
              </Link>


              <Link
                to="/faculty-results"
                className="quick-action-card"
              >
                <div className="quick-action-icon purple">
                  📊
                </div>

                <div>
                  <h3>Exam Results</h3>
                  <p>
                    View student performance
                  </p>
                </div>
              </Link>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}

export default FacultyDashboard;
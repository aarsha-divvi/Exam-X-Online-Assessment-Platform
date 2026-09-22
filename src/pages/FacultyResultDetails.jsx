import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./FacultyResultDetails.css";

const API_URL = "http://localhost:5000/api/results";

function FacultyResultDetails() {
  const { studentId, examId } = useParams();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchResult = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/student/${studentId}/exam/${examId}`
      );

      setResult(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch student result:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load student result"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResult();
  }, [studentId, examId]);

  if (loading) {
    return (
      <div className="faculty-result-details">
        <div className="result-details-message">
          Loading result details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="faculty-result-details">

        <header className="result-details-header">
          <div>
            <h1>Student Result</h1>
            <p>View individual student performance</p>
          </div>

          <Link
            to="/faculty-results"
            className="back-btn"
          >
            Back to Results
          </Link>
        </header>

        <main className="result-details-content">

          <div className="result-error">
            {error}
          </div>

        </main>

      </div>
    );
  }

  if (!result) {
    return (
      <div className="faculty-result-details">

        <header className="result-details-header">
          <div>
            <h1>Student Result</h1>
            <p>View individual student performance</p>
          </div>

          <Link
            to="/faculty-results"
            className="back-btn"
          >
            Back to Results
          </Link>
        </header>

        <main className="result-details-content">

          <div className="result-details-message">
            Result not found.
          </div>

        </main>

      </div>
    );
  }

  return (
    <div className="faculty-result-details">

      {/* Header */}

      <header className="result-details-header">

        <div>
          <h1>Student Result</h1>

          <p>
            Individual exam performance
          </p>
        </div>

        <Link
          to="/faculty-results"
          className="back-btn"
        >
          Back to Results
        </Link>

      </header>


      <main className="result-details-content">

        {/* Student Information */}

        <section className="result-card">

          <h2>Student Information</h2>

          <div className="result-info-grid">

            <div>
              <span>Student Name</span>

              <strong>
                {result.student?.name ||
                  "Unknown"}
              </strong>
            </div>

            <div>
              <span>Email</span>

              <strong>
                {result.student?.email ||
                  "N/A"}
              </strong>
            </div>

          </div>

        </section>


        {/* Exam Information */}

        <section className="result-card">

          <h2>Exam Information</h2>

          <div className="result-info-grid">

            <div>
              <span>Exam</span>

              <strong>
                {result.exam?.title ||
                  "Unknown"}
              </strong>
            </div>

            <div>
              <span>Duration</span>

              <strong>
                {result.exam?.duration || 0} minutes
              </strong>
            </div>

            <div>
              <span>Total Questions</span>

              <strong>
                {result.totalQuestions}
              </strong>
            </div>

            <div>
              <span>Submitted At</span>

              <strong>
                {result.submittedAt
                  ? new Date(
                      result.submittedAt
                    ).toLocaleString()
                  : "N/A"}
              </strong>
            </div>

          </div>

        </section>


        {/* Result Summary */}

        <section className="result-card">

          <h2>Result Summary</h2>

          <div className="result-summary-grid">

            <div className="result-summary-box">

              <span>Marks</span>

              <strong>
                {result.marks}
              </strong>

              <small>
                out of {result.totalMarks}
              </small>

            </div>


            <div className="result-summary-box">

              <span>Percentage</span>

              <strong>
                {result.percentage}%
              </strong>

            </div>


            <div className="result-summary-box">

              <span>Correct Answers</span>

              <strong>
                {result.correctAnswers}
              </strong>

            </div>


            <div className="result-summary-box">

              <span>Wrong Answers</span>

              <strong>
                {result.wrongAnswers}
              </strong>

            </div>


            <div className="result-summary-box">

              <span>Unanswered</span>

              <strong>
                {result.unansweredQuestions}
              </strong>

            </div>


            <div className="result-summary-box">

              <span>Attempted</span>

              <strong>
                {result.attemptedQuestions}
              </strong>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default FacultyResultDetails;
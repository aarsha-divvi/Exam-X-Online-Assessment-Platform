import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./ExamDetails.css";

const API_URL = "http://localhost:5000/api/exams";

function ExamDetails() {
  const { id } = useParams();

  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchExam = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/${id}`
      );

      setExam(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch exam:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load exam details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExam();
  }, [id]);

  if (loading) {
    return (
      <div className="exam-details">
        <p>Loading exam details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="exam-details">
        <p className="error-message">
          {error}
        </p>

        <Link
          to="/exam-management"
          className="back-btn"
        >
          Back to Exam Management
        </Link>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="exam-details">
        <p>Exam not found.</p>
      </div>
    );
  }

  return (
    <div className="exam-details">

      {/* Header */}

      <header className="exam-details-header">

        <div>
          <h1>{exam.title}</h1>

          <p>
            Faculty Exam Details
          </p>
        </div>

        <Link
          to="/exam-management"
          className="back-btn"
        >
          Back
        </Link>

      </header>


      <main className="exam-details-content">

        {/* Basic Information */}

        <section className="details-card">

          <h2>Exam Information</h2>

          <div className="details-grid">

            <div>
              <strong>Title</strong>
              <p>{exam.title}</p>
            </div>

            <div>
              <strong>Duration</strong>
              <p>
                {exam.duration} minutes
              </p>
            </div>

            <div>
              <strong>Number of Questions</strong>
              <p>
                {exam.numberOfQuestions}
              </p>
            </div>

            <div>
              <strong>Status</strong>
              <p>
                {exam.scheduleStatus}
              </p>
            </div>

          </div>

          <div className="description">

            <strong>Description</strong>

            <p>
              {exam.description}
            </p>

          </div>

        </section>


        {/* Schedule */}

        <section className="details-card">

          <h2>Schedule</h2>

          <div className="details-grid">

            <div>
              <strong>Date</strong>

              <p>
                {exam.scheduledDate ||
                  "Not Scheduled"}
              </p>
            </div>

            <div>
              <strong>Start Time</strong>

              <p>
                {exam.startTime ||
                  "Not Scheduled"}
              </p>
            </div>

            <div>
              <strong>End Time</strong>

              <p>
                {exam.endTime ||
                  "Not Scheduled"}
              </p>
            </div>

          </div>

        </section>


        {/* Questions */}

        <section className="details-card">

          <h2>
            Questions (
            {exam.questions?.length || 0}
            )
          </h2>

          {!exam.questions ||
          exam.questions.length === 0 ? (

            <p>
              No questions added to this exam.
            </p>

          ) : (

            <div className="question-list">

              {exam.questions.map(
                (question, index) => (

                  <div
                    className="question-card"
                    key={question._id}
                  >

                    <h3>
                      Question {index + 1}
                    </h3>

                    <p>
                      {question.question}
                    </p>

                    <span>
                      Type:{" "}
                      {question.type || "N/A"}
                    </span>

                    <span>
                      Difficulty:{" "}
                      {question.difficulty ||
                        "N/A"}
                    </span>

                  </div>

                )
              )}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default ExamDetails;
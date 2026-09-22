import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./FacultyResults.css";

const EXAM_API_URL = "http://localhost:5000/api/exams";
const RESULT_API_URL = "http://localhost:5000/api/results";

function FacultyResults() {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");

  const [results, setResults] = useState([]);
  const [performance, setPerformance] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get exams
  const fetchExams = async () => {
    try {
      const response = await axios.get(EXAM_API_URL);

      setExams(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch exams:",
        error
      );

      setError("Failed to load exams");
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // Get results for selected exam
  const fetchResults = async (examId) => {
    if (!examId) {
      setResults([]);
      setPerformance(null);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const resultsResponse = await axios.get(
        `${RESULT_API_URL}/exam/${examId}`
      );

      const performanceResponse =
        await axios.get(
          `${RESULT_API_URL}/exam/${examId}/performance`
        );

      setResults(resultsResponse.data);

      setPerformance(
        performanceResponse.data
      );
    } catch (error) {
      console.error(
        "Failed to fetch results:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load exam results"
      );

      setResults([]);
      setPerformance(null);
    } finally {
      setLoading(false);
    }
  };

  // Exam selection
  const handleExamChange = (e) => {
    const examId = e.target.value;

    setSelectedExam(examId);

    fetchResults(examId);
  };

  return (
    <div className="faculty-results">

      {/* Header */}

      <header className="faculty-results-header">

        <div>
          <h1>Exam Results</h1>

          <p>
            View student submissions and exam
            performance
          </p>
        </div>

      </header>


      <main className="faculty-results-content">

        {/* Select Exam */}

        <section className="results-filter">

          <label>
            Select Exam
          </label>

          <select
            value={selectedExam}
            onChange={handleExamChange}
          >

            <option value="">
              Select an exam
            </option>

            {exams.map((exam) => (

              <option
                key={exam._id}
                value={exam._id}
              >
                {exam.title}
              </option>

            ))}

          </select>

        </section>


        {/* Error Message */}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}


        {/* Performance Summary */}

        {performance && (

          <section className="performance-section">

            <h2>
              Exam Performance
            </h2>

            <div className="performance-grid">

              <div className="performance-card">

                <h3>
                  Total Students
                </h3>

                <p>
                  {performance.totalStudents}
                </p>

              </div>


              <div className="performance-card">

                <h3>
                  Average Marks
                </h3>

                <p>
                  {performance.averageMarks}
                </p>

              </div>


              <div className="performance-card">

                <h3>
                  Highest Marks
                </h3>

                <p>
                  {performance.highestMarks}
                </p>

              </div>


              <div className="performance-card">

                <h3>
                  Lowest Marks
                </h3>

                <p>
                  {performance.lowestMarks}
                </p>

              </div>


              <div className="performance-card">

                <h3>
                  Average Percentage
                </h3>

                <p>
                  {performance.averagePercentage}%
                </p>

              </div>

            </div>

          </section>

        )}


        {/* Student Results */}

        {selectedExam && (

          <section className="student-results">

            <h2>
              Student Results
            </h2>

            {loading ? (

              <p>
                Loading results...
              </p>

            ) : results.length === 0 ? (

              <p>
                No student results available
                for this exam.
              </p>

            ) : (

              <div className="results-table-container">

                <table>

                  <thead>

                    <tr>

                      <th>
                        Student
                      </th>

                      <th>
                        Email
                      </th>

                      <th>
                        Marks
                      </th>

                      <th>
                        Percentage
                      </th>

                      <th>
                        Correct
                      </th>

                      <th>
                        Wrong
                      </th>

                      <th>
                        Unanswered
                      </th>

                      <th>
                        Submitted At
                      </th>

                      <th>
                        Action
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {results.map(
                      (result) => (

                        <tr
                          key={result._id}
                        >

                          <td>
                            {result.student
                              ?.name ||
                              "Unknown"}
                          </td>


                          <td>
                            {result.student
                              ?.email ||
                              "N/A"}
                          </td>


                          <td>
                            {result.marks}
                          </td>


                          <td>
                            {result.percentage}%
                          </td>


                          <td>
                            {result.correctAnswers}
                          </td>


                          <td>
                            {result.wrongAnswers}
                          </td>


                          <td>
                            {result.unansweredQuestions}
                          </td>


                          <td>
                            {result.submittedAt
                              ? new Date(
                                  result.submittedAt
                                ).toLocaleString()
                              : "N/A"}
                          </td>


                          <td>

                            {result.student &&
                            result.exam ? (

                              <Link
                                to={`/faculty-results/student/${result.student._id}/exam/${result.exam._id}`}
                                className="view-result-btn"
                              >
                                View Details
                              </Link>

                            ) : (

                              <span>
                                N/A
                              </span>

                            )}

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </section>

        )}

      </main>

    </div>
  );
}

export default FacultyResults;
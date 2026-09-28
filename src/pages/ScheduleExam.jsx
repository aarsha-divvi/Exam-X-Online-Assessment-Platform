import { useEffect, useState } from "react";
import axios from "axios";
import "./ScheduleExam.css";

const API_URL = "http://localhost:5000/api/exams";

function ScheduleExam() {
  const [exams, setExams] = useState([]);

  const [schedule, setSchedule] = useState({
    exam: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [publishingId, setPublishingId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Get exams from MongoDB
  const fetchExams = async () => {
    try {
      const response = await axios.get(API_URL);
      setExams(response.data);
    } catch (error) {
      console.error("Failed to fetch exams:", error);
      setError("Failed to load exams");
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setSchedule({
      ...schedule,
      [e.target.name]: e.target.value,
    });

    setMessage("");
    setError("");
  };

  // Schedule exam
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!schedule.exam) {
      setError("Please select an exam");
      return;
    }

    if (!schedule.date) {
      setError("Please select an exam date");
      return;
    }

    if (!schedule.startTime || !schedule.endTime) {
      setError("Please select start and end time");
      return;
    }

    // Check for past date
    const today = new Date();
    const selectedDate = new Date(
      `${schedule.date}T00:00:00`
    );

    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    if (selectedDate < todayOnly) {
      setError("Exam date cannot be in the past");
      return;
    }

    // Check time
    if (schedule.startTime >= schedule.endTime) {
      setError("End time must be after start time");
      return;
    }

    try {
      setLoading(true);

      await axios.put(
        `${API_URL}/${schedule.exam}/schedule`,
        {
          scheduledDate: schedule.date,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
        }
      );

      setMessage("Exam scheduled successfully!");

      setSchedule({
        exam: "",
        date: "",
        startTime: "",
        endTime: "",
      });

      await fetchExams();
    } catch (error) {
      console.error("Failed to schedule exam:", error);

      setError(
        error.response?.data?.message ||
          "Failed to schedule exam"
      );
    } finally {
      setLoading(false);
    }
  };

  // Publish exam
  const handlePublish = async (examId) => {
    setMessage("");
    setError("");

    try {
      setPublishingId(examId);

      await axios.put(
        `${API_URL}/${examId}/publish`
      );

      setMessage("Exam published successfully!");

      await fetchExams();
    } catch (error) {
      console.error("Failed to publish exam:", error);

      setError(
        error.response?.data?.message ||
          "Failed to publish exam"
      );
    } finally {
      setPublishingId("");
    }
  };

  return (
    <div className="schedule-exam">

      <header className="schedule-header">
        <h1>Schedule & Publish Exam</h1>

        <p>
          Schedule an examination and publish it for students
        </p>
      </header>

      <main className="schedule-content">

        {/* Schedule Form */}

        <form
          className="schedule-form"
          onSubmit={handleSubmit}
        >

          <label>Select Exam</label>

          <select
            name="exam"
            value={schedule.exam}
            onChange={handleChange}
          >
            <option value="">
              Select an exam
            </option>

            {exams
              .filter(
                (exam) =>
                  exam.scheduleStatus !== "Published"
              )
              .map((exam) => (
                <option
                  key={exam._id}
                  value={exam._id}
                >
                  {exam.title}
                </option>
              ))}
          </select>

          <label>Exam Date</label>

          <input
            type="date"
            name="date"
            value={schedule.date}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
          />

          <div className="schedule-row">

            <div>
              <label>Start Time</label>

              <input
                type="time"
                name="startTime"
                value={schedule.startTime}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>End Time</label>

              <input
                type="time"
                name="endTime"
                value={schedule.endTime}
                onChange={handleChange}
              />
            </div>

          </div>

          <button
            type="submit"
            className="schedule-btn"
            disabled={loading}
          >
            {loading
              ? "Scheduling..."
              : "Schedule Exam"}
          </button>

        </form>

        {/* Messages */}

        {message && (
          <p className="success-message">
            {message}
          </p>
        )}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {/* Exam List */}

        <section className="exam-list">

          <h2>Exam Schedule</h2>

          {exams.length === 0 ? (
            <p>No exams available.</p>
          ) : (
            exams.map((exam) => (
              <div
                className="exam-card"
                key={exam._id}
              >

                <div>
                  <h3>{exam.title}</h3>

                  <p>
                    {exam.description}
                  </p>

                  <p>
                    Date:{" "}
                    {exam.scheduledDate ||
                      "Not Scheduled"}
                  </p>

                  <p>
                    Time:{" "}
                    {exam.startTime &&
                    exam.endTime
                      ? `${exam.startTime} - ${exam.endTime}`
                      : "Not Scheduled"}
                  </p>

                  <p>
                    Status:{" "}
                    <strong>
                      {exam.scheduleStatus}
                    </strong>
                  </p>
                </div>

                {/* Publish Button */}

                {exam.scheduleStatus ===
                  "Scheduled" && (
                  <button
                    type="button"
                    className="publish-btn"
                    onClick={() =>
                      handlePublish(exam._id)
                    }
                    disabled={
                      publishingId === exam._id
                    }
                  >
                    {publishingId === exam._id
                      ? "Publishing..."
                      : "Publish Exam"}
                  </button>
                )}

                {exam.scheduleStatus ===
                  "Published" && (
                  <span className="published-label">
                    Published
                  </span>
                )}

              </div>
            ))
          )}

        </section>

      </main>

    </div>
  );
}

export default ScheduleExam;
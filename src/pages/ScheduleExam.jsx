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

  // Get exams from MongoDB
  const fetchExams = async () => {
    try {
      const response = await axios.get(API_URL);
      setExams(response.data);
    } catch (error) {
      console.error("Failed to fetch exams:", error);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleChange = (e) => {
    setSchedule({
      ...schedule,
      [e.target.name]: e.target.value,
    });
  };

  // Schedule exam
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${API_URL}/${schedule.exam}/schedule`,
        {
          scheduledDate: schedule.date,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
        }
      );

      alert("Exam scheduled successfully!");

      setSchedule({
        exam: "",
        date: "",
        startTime: "",
        endTime: "",
      });

      fetchExams();
    } catch (error) {
      console.error("Failed to schedule exam:", error);

      alert(
        error.response?.data?.message ||
          "Failed to schedule exam"
      );
    }
  };

  return (
    <div className="schedule-exam">

      <header className="schedule-header">
        <h1>Schedule Exam</h1>
        <p>Schedule an examination for students</p>
      </header>

      <main className="schedule-content">

        <form
          className="schedule-form"
          onSubmit={handleSubmit}
        >

          <label>Select Exam</label>

          <select
            name="exam"
            value={schedule.exam}
            onChange={handleChange}
            required
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

          <label>Exam Date</label>

          <input
            type="date"
            name="date"
            value={schedule.date}
            onChange={handleChange}
            required
          />

          <div className="schedule-row">

            <div>
              <label>Start Time</label>

              <input
                type="time"
                name="startTime"
                value={schedule.startTime}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>End Time</label>

              <input
                type="time"
                name="endTime"
                value={schedule.endTime}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <button
            type="submit"
            className="schedule-btn"
          >
            Schedule Exam
          </button>

        </form>

      </main>

    </div>
  );
}

export default ScheduleExam;
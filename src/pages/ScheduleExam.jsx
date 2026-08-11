import { useState } from "react";
import "./ScheduleExam.css";

function ScheduleExam() {
  const [schedule, setSchedule] = useState({
    exam: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    setSchedule({
      ...schedule,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Exam Scheduled:", schedule);

    alert("Exam scheduled successfully!");
  };

  return (
    <div className="schedule-exam">

      <header className="schedule-header">
        <h1>Schedule Exam</h1>
        <p>Schedule an examination for students</p>
      </header>

      <main className="schedule-content">

        <form className="schedule-form" onSubmit={handleSubmit}>

          <label>Select Exam</label>

          <select
            name="exam"
            value={schedule.exam}
            onChange={handleChange}
            required
          >
            <option value="">Select an exam</option>
            <option value="Java Programming">
              Java Programming
            </option>
            <option value="DBMS">
              DBMS
            </option>
            <option value="Python Programming">
              Python Programming
            </option>
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

          <button type="submit" className="schedule-btn">
            Schedule Exam
          </button>

        </form>

      </main>

    </div>
  );
}

export default ScheduleExam;
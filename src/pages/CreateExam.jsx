import { useState } from "react";
import "./CreateExam.css";

function CreateExam() {
  const [exam, setExam] = useState({
    title: "",
    description: "",
    duration: "",
    questions: "",
  });

  const handleChange = (e) => {
    setExam({
      ...exam,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Exam Created:", exam);

    alert("Exam created successfully!");

    setExam({
      title: "",
      description: "",
      duration: "",
      questions: "",
    });
  };

  return (
    <div className="create-exam">

      <header className="create-exam-header">
        <div>
          <h1>Create Exam</h1>
          <p>Create a new examination</p>
        </div>
      </header>

      <main className="create-exam-content">

        <form className="exam-form" onSubmit={handleSubmit}>

          <label>Exam Title</label>

          <input
            type="text"
            name="title"
            value={exam.title}
            onChange={handleChange}
            placeholder="Example: Java Programming"
            required
          />

          <label>Description</label>

          <textarea
            name="description"
            value={exam.description}
            onChange={handleChange}
            placeholder="Enter exam description"
            required
          />

          <div className="exam-row">

            <div>
              <label>Duration (minutes)</label>

              <input
                type="number"
                name="duration"
                value={exam.duration}
                onChange={handleChange}
                placeholder="60"
                min="1"
                required
              />
            </div>

            <div>
              <label>Number of Questions</label>

              <input
                type="number"
                name="questions"
                value={exam.questions}
                onChange={handleChange}
                placeholder="20"
                min="1"
                required
              />
            </div>

          </div>

          <div className="exam-actions">

            <button type="submit" className="create-btn">
              Create Exam
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                setExam({
                  title: "",
                  description: "",
                  duration: "",
                  questions: "",
                })
              }
            >
              Clear
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default CreateExam;
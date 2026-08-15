import { useState } from "react";
import axios from "axios";
import "./CreateExam.css";

const API_URL = "http://localhost:5000/api/exams";

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

  // Create exam and save it to MongoDB
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const examData = {
        title: exam.title,
        description: exam.description,
        duration: Number(exam.duration),
        numberOfQuestions: Number(exam.questions),

        // Faculty Test user ID
        createdBy: "6a8009deb087e3a52e6f2856",
      };

      await axios.post(API_URL, examData);

      alert("Exam created successfully!");

      setExam({
        title: "",
        description: "",
        duration: "",
        questions: "",
      });
    } catch (error) {
      console.error("Failed to create exam:", error);

      alert(
        error.response?.data?.message ||
          "Failed to create exam"
      );
    }
  };

  const clearForm = () => {
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

        <form
          className="exam-form"
          onSubmit={handleSubmit}
        >

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

            <button
              type="submit"
              className="create-btn"
            >
              Create Exam
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={clearForm}
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
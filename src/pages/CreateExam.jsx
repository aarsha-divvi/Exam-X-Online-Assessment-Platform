import { useEffect, useState } from "react";
import axios from "axios";
import "./CreateExam.css";

const API_URL = "http://localhost:5000/api/exams";
const QUESTION_API_URL = "http://localhost:5000/api/questions";

function CreateExam() {
  const [exam, setExam] = useState({
    title: "",
    description: "",
    duration: "",
    questions: "",
  });

  const [questionBank, setQuestionBank] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Get questions from Question Bank
  const fetchQuestions = async () => {
    try {
      setLoadingQuestions(true);

      const response = await axios.get(QUESTION_API_URL);

      setQuestionBank(response.data);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      setError("Failed to load Question Bank");
    } finally {
      setLoadingQuestions(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setExam({
      ...exam,
      [e.target.name]: e.target.value,
    });

    setMessage("");
    setError("");
  };

  // Select / remove question
  const handleQuestionSelect = (questionId) => {
    setSelectedQuestions((previous) => {
      if (previous.includes(questionId)) {
        return previous.filter((id) => id !== questionId);
      }

      return [...previous, questionId];
    });

    setMessage("");
    setError("");
  };

  // Create exam
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const duration = Number(exam.duration);
    const numberOfQuestions = Number(exam.questions);

    // Validate title
    if (!exam.title.trim()) {
      setError("Exam title is required");
      return;
    }

    // Validate description
    if (!exam.description.trim()) {
      setError("Exam description is required");
      return;
    }

    // Validate duration
    if (duration <= 0) {
      setError("Duration must be greater than 0");
      return;
    }

    // Validate number of questions
    if (numberOfQuestions <= 0) {
      setError("Number of questions must be greater than 0");
      return;
    }

    // Validate selected questions
    if (selectedQuestions.length !== numberOfQuestions) {
      setError(
        `Please select exactly ${numberOfQuestions} questions`
      );
      return;
    }

    try {
      const examData = {
        title: exam.title.trim(),
        description: exam.description.trim(),
        duration: duration,
        numberOfQuestions: numberOfQuestions,

        // Existing Faculty Test user ID
        createdBy: "6a8009deb087e3a52e6f2856",

        // Questions selected from Question Bank
        questions: selectedQuestions,
      };

      await axios.post(API_URL, examData);

      setMessage("Exam created successfully!");

      // Clear form after successful creation
      setExam({
        title: "",
        description: "",
        duration: "",
        questions: "",
      });

      setSelectedQuestions([]);
    } catch (error) {
      console.error("Failed to create exam:", error);

      setError(
        error.response?.data?.message ||
          "Failed to create exam"
      );
    }
  };

  // Clear form
  const clearForm = () => {
    setExam({
      title: "",
      description: "",
      duration: "",
      questions: "",
    });

    setSelectedQuestions([]);
    setMessage("");
    setError("");
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
          />

          <label>Description</label>

          <textarea
            name="description"
            value={exam.description}
            onChange={handleChange}
            placeholder="Enter exam description"
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
              />
            </div>

          </div>

          {/* Question Bank */}

          <div className="question-selection">

            <h2>Select Questions</h2>

            {loadingQuestions && (
              <p>Loading questions...</p>
            )}

            {!loadingQuestions &&
              questionBank.length === 0 && (
                <p>
                  No questions available in Question Bank.
                </p>
              )}

            {!loadingQuestions &&
              questionBank.length > 0 && (
                <div className="question-list">

                  {questionBank.map((question) => (
                    <label
                      key={question._id}
                      className="question-item"
                    >

                      <input
                        type="checkbox"
                        checked={selectedQuestions.includes(
                          question._id
                        )}
                        onChange={() =>
                          handleQuestionSelect(
                            question._id
                          )
                        }
                      />

                      <span>
                        {question.question}
                      </span>

                    </label>
                  ))}

                </div>
              )}

            <p>
              Selected Questions:{" "}
              <strong>
                {selectedQuestions.length}
              </strong>
            </p>

          </div>

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

          {/* Buttons */}

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
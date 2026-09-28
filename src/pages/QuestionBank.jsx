import { useEffect, useState } from "react";
import axios from "axios";
import "./QuestionBank.css";

const API_URL = "http://localhost:5000/api/questions";

function QuestionBank() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    question: "",
    type: "MCQ",
    options: ["", "", "", ""],
    correctAnswer: "",
    difficulty: "Easy",
    topic: "",
  });

  // Get questions from MongoDB
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(API_URL);
      setQuestions(response.data);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handle normal input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle MCQ option changes
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;

    setFormData({
      ...formData,
      options: updatedOptions,
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      question: "",
      type: "MCQ",
      options: ["", "", "", ""],
      correctAnswer: "",
      difficulty: "Easy",
      topic: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // Edit question - load existing data into form
  const editQuestion = (item) => {
    setFormData({
      question: item.question,
      type: item.type,
      options:
        item.type === "MCQ"
          ? item.options
          : ["", "", "", ""],
      correctAnswer:
        item.type === "MCQ"
          ? item.correctAnswer
          : "",
      difficulty: item.difficulty,
      topic: item.topic,
    });

    setEditingId(item._id);
    setShowForm(true);
  };

  // Add or Update question
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const questionData = {
        question: formData.question,
        type: formData.type,
        options:
          formData.type === "MCQ"
            ? formData.options
            : [],
        correctAnswer:
          formData.type === "MCQ"
            ? formData.correctAnswer
            : "",
        difficulty: formData.difficulty,
        topic: formData.topic,
      };

      if (editingId) {
        // Update existing question
        await axios.put(
          `${API_URL}/${editingId}`,
          questionData
        );

        alert("Question updated successfully!");
      } else {
        // Add new question
        await axios.post(API_URL, {
          ...questionData,

          // Faculty Test user ID created earlier
          createdBy: "6a8009deb087e3a52e6f2856",
        });

        alert("Question added successfully!");
      }

      resetForm();

      // Refresh questions
      fetchQuestions();

    } catch (error) {
      console.error("Failed to save question:", error);

      alert(
        error.response?.data?.message ||
          "Failed to save question"
      );
    }
  };

  // Delete question
  const deleteQuestion = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      alert("Question deleted successfully!");

      fetchQuestions();
    } catch (error) {
      console.error("Failed to delete question:", error);

      alert("Failed to delete question");
    }
  };

  return (
    <div className="question-bank">

      <header className="question-header">

        <div>
          <h1>Question Bank</h1>
          <p>Create and manage examination questions</p>
        </div>

        <button
          className="add-question-btn"
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
            }
          }}
        >
          + Add Question
        </button>

      </header>

      {showForm && (
        <section className="question-form-section">

          <h2>
            {editingId
              ? "Edit Question"
              : "Add New Question"}
          </h2>

          <form onSubmit={handleSubmit}>

            <label>Question</label>

            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="Enter your question"
              required
            />

            <div className="form-row">

              <div>
                <label>Question Type</label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="MCQ">MCQ</option>
                  <option value="Descriptive">
                    Descriptive
                  </option>
                  <option value="Coding">
                    Coding
                  </option>
                </select>
              </div>

              <div>
                <label>Difficulty</label>

                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label>Topic</label>

                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="Example: Java"
                  required
                />
              </div>

            </div>

            {formData.type === "MCQ" && (
              <div className="options-section">

                <label>Options</label>

                {formData.options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(
                        index,
                        e.target.value
                      )
                    }
                    placeholder={`Option ${index + 1}`}
                    required
                  />
                ))}

                <label>Correct Answer</label>

                <input
                  type="text"
                  value={formData.correctAnswer}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      correctAnswer: e.target.value,
                    })
                  }
                  placeholder="Enter correct answer"
                  required
                />

              </div>
            )}

            <div className="form-buttons">

              <button
                type="submit"
                className="save-btn"
              >
                {editingId
                  ? "Update Question"
                  : "Save Question"}
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>

            </div>

          </form>

        </section>
      )}

      <section className="questions-section">

        <div className="questions-title">

          <h2>All Questions</h2>

          <span>
            {questions.length} Questions
          </span>

        </div>

        <div className="questions-list">

          {questions.map((item) => (

            <div
              className="question-card"
              key={item._id}
            >

              <div className="question-info">

                <h3>{item.question}</h3>

                <div className="question-meta">

                  <span>{item.type}</span>

                  <span>{item.topic}</span>

                  <span>{item.difficulty}</span>

                </div>

              </div>

              <div className="question-actions">

                <button
                  className="edit-btn"
                  onClick={() => editQuestion(item)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteQuestion(item._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default QuestionBank;
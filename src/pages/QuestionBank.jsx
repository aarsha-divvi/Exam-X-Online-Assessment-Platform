import { useState } from "react";
import "./QuestionBank.css";

function QuestionBank() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is JavaScript?",
      type: "MCQ",
      difficulty: "Easy",
      topic: "JavaScript",
    },
    {
      id: 2,
      question: "Explain normalization in DBMS.",
      type: "Descriptive",
      difficulty: "Medium",
      topic: "DBMS",
    },
    {
      id: 3,
      question: "Write a program to reverse a string.",
      type: "Coding",
      difficulty: "Hard",
      topic: "Programming",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    question: "",
    type: "MCQ",
    options: ["", "", "", ""],
    correctAnswer: "",
    difficulty: "Easy",
    topic: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;

    setFormData({
      ...formData,
      options: updatedOptions,
    });
  };

  const addQuestion = (e) => {
    e.preventDefault();

    const newQuestion = {
      id: Date.now(),
      question: formData.question,
      type: formData.type,
      difficulty: formData.difficulty,
      topic: formData.topic,
    };

    setQuestions([...questions, newQuestion]);

    setFormData({
      question: "",
      type: "MCQ",
      options: ["", "", "", ""],
      correctAnswer: "",
      difficulty: "Easy",
      topic: "",
    });

    setShowForm(false);
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
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
          onClick={() => setShowForm(!showForm)}
        >
          + Add Question
        </button>
      </header>

      {showForm && (
        <section className="question-form-section">

          <h2>Add New Question</h2>

          <form onSubmit={addQuestion}>

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
                  <option value="Descriptive">Descriptive</option>
                  <option value="Coding">Coding</option>
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
                      handleOptionChange(index, e.target.value)
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

              <button type="submit" className="save-btn">
                Save Question
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
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

          <span>{questions.length} Questions</span>
        </div>

        <div className="questions-list">

          {questions.map((item) => (

            <div className="question-card" key={item.id}>

              <div className="question-info">

                <h3>{item.question}</h3>

                <div className="question-meta">

                  <span>{item.type}</span>

                  <span>{item.topic}</span>

                  <span>{item.difficulty}</span>

                </div>

              </div>

              <div className="question-actions">

                <button className="edit-btn">
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteQuestion(item.id)}
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
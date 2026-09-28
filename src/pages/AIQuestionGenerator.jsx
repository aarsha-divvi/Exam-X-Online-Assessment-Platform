import { useState } from "react";
import axios from "axios";

const AI_API_URL = "http://localhost:5000/api/ai/generate";
const QUESTION_API_URL = "http://localhost:5000/api/questions";

// Same Faculty Test user used in Question Bank
const FACULTY_USER_ID = "6a8009deb087e3a52e6f2856";

function AIQuestionGenerator() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingIndex, setSavingIndex] = useState(null);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setQuestions([]);

    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(AI_API_URL, {
        topic: topic.trim(),
        difficulty,
        numberOfQuestions: Number(numberOfQuestions),
      });

      if (response.data.success) {
        setQuestions(response.data.questions);
        setMessage("Questions generated successfully!");
      } else {
        setError(
          response.data.message ||
            "Failed to generate questions"
        );
      }
    } catch (error) {
      console.error("AI generation error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to generate questions"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveQuestion = async (question, index) => {
    setError("");
    setMessage("");
    setSavingIndex(index);

    try {
      await axios.post(QUESTION_API_URL, {
        question: question.question,
        type: "MCQ",
        options: question.options,
        correctAnswer: question.correctAnswer,
        difficulty: difficulty,
        topic: topic.trim(),
        createdBy: FACULTY_USER_ID,
      });

      setMessage(
        `Question ${index + 1} saved to Question Bank successfully!`
      );
    } catch (error) {
      console.error("Save question error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to create question"
      );
    } finally {
      setSavingIndex(null);
    }
  };

  return (
    <div>
      <h1>AI Question Generator</h1>

      <form onSubmit={handleGenerate}>
        <div>
          <label>Topic</label>

          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Example: Java"
          />
        </div>

        <div>
          <label>Difficulty</label>

          <select
            value={difficulty}
            onChange={(e) =>
              setDifficulty(e.target.value)
            }
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label>Number of Questions</label>

          <input
            type="number"
            min="1"
            max="20"
            value={numberOfQuestions}
            onChange={(e) =>
              setNumberOfQuestions(e.target.value)
            }
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading
            ? "Generating..."
            : "Generate Questions"}
        </button>
      </form>

      {message && <p>{message}</p>}

      {error && <p>{error}</p>}

      {questions.length > 0 && (
        <div>
          <h2>Generated Questions</h2>

          {questions.map((question, index) => (
            <div key={index}>
              <h3>
                {index + 1}. {question.question}
              </h3>

              <ul>
                {question.options.map(
                  (option, optionIndex) => (
                    <li key={optionIndex}>
                      {option}
                    </li>
                  )
                )}
              </ul>

              <p>
                <strong>Correct Answer:</strong>{" "}
                {question.correctAnswer}
              </p>

              <button
                type="button"
                onClick={() =>
                  handleSaveQuestion(question, index)
                }
                disabled={savingIndex === index}
              >
                {savingIndex === index
                  ? "Saving..."
                  : "Save to Question Bank"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AIQuestionGenerator;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ExamManagement.css";

const API_URL = "http://localhost:5000/api/exams";

function ExamManagement() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingExam, setEditingExam] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    duration: "",
    numberOfQuestions: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch all exams
  const fetchExams = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL);

      setExams(response.data);
    } catch (error) {
      console.error("Failed to fetch exams:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load exams"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // Open Edit Form
  const handleEdit = (exam) => {
    console.log("Editing exam:", exam);

    setEditingExam(exam);

    setEditForm({
      title: exam.title || "",
      description: exam.description || "",
      duration: exam.duration || "",
      numberOfQuestions:
        exam.numberOfQuestions || "",
    });

    setMessage("");
    setError("");
  };

  // Handle edit form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  // Update exam
  const handleUpdate = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!editingExam) {
      setError("No exam selected for editing");
      return;
    }

    const duration = Number(editForm.duration);

    const numberOfQuestions = Number(
      editForm.numberOfQuestions
    );

    if (!editForm.title.trim()) {
      setError("Exam title is required");
      return;
    }

    if (!editForm.description.trim()) {
      setError("Exam description is required");
      return;
    }

    if (duration <= 0) {
      setError(
        "Duration must be greater than 0"
      );
      return;
    }

    if (numberOfQuestions <= 0) {
      setError(
        "Number of questions must be greater than 0"
      );
      return;
    }

    // Check selected questions
    if (
      editingExam.questions &&
      editingExam.questions.length !==
        numberOfQuestions
    ) {
      setError(
        `This exam contains ${editingExam.questions.length} selected questions. Number of questions must remain ${editingExam.questions.length}.`
      );
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/${editingExam._id}`,
        {
          title: editForm.title.trim(),
          description:
            editForm.description.trim(),
          duration,
          numberOfQuestions,
        }
      );

      console.log(
        "Updated exam:",
        response.data
      );

      setMessage(
        "Exam updated successfully!"
      );

      setEditingExam(null);

      await fetchExams();
    } catch (error) {
      console.error(
        "Failed to update exam:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update exam"
      );
    }
  };

  // Delete exam
  const handleDelete = async (examId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this exam?"
    );

    if (!confirmed) {
      return;
    }

    setMessage("");
    setError("");

    try {
      await axios.delete(
        `${API_URL}/${examId}`
      );

      setMessage(
        "Exam deleted successfully!"
      );

      await fetchExams();
    } catch (error) {
      console.error(
        "Failed to delete exam:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to delete exam"
      );
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setEditingExam(null);
    setMessage("");
    setError("");
  };

  return (
    <div className="exam-management">

      {/* Header */}

      <header className="exam-management-header">

        <div>
          <h1>Exam Management</h1>

          <p>
            View, edit and manage faculty exams
          </p>
        </div>

      </header>


      <main className="exam-management-content">

        {/* Success Message */}

        {message && (
          <p className="success-message">
            {message}
          </p>
        )}


        {/* Error Message */}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}


        {/* Edit Exam Form */}

        {editingExam && (

          <section className="edit-exam-section">

            <h2>Edit Exam</h2>

            <form onSubmit={handleUpdate}>

              <label>
                Exam Title
              </label>

              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleChange}
              />


              <label>
                Description
              </label>

              <textarea
                name="description"
                value={
                  editForm.description
                }
                onChange={handleChange}
              />


              <div className="edit-row">

                <div>

                  <label>
                    Duration (minutes)
                  </label>

                  <input
                    type="number"
                    name="duration"
                    min="1"
                    value={
                      editForm.duration
                    }
                    onChange={handleChange}
                  />

                </div>


                <div>

                  <label>
                    Number of Questions
                  </label>

                  <input
                    type="number"
                    name="numberOfQuestions"
                    min="1"
                    value={
                      editForm.numberOfQuestions
                    }
                    onChange={handleChange}
                  />

                </div>

              </div>


              <div className="edit-actions">

                <button
                  type="submit"
                  className="save-btn"
                >
                  Save Changes
                </button>


                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

              </div>

            </form>

          </section>

        )}


        {/* All Exams */}

        <section className="exam-management-list">

          <h2>All Exams</h2>

          {loading ? (

            <p>
              Loading exams...
            </p>

          ) : exams.length === 0 ? (

            <p>
              No exams available.
            </p>

          ) : (

            exams.map((exam) => (

              <div
                className="management-card"
                key={exam._id}
              >

                <div className="exam-details">

                  <h3>
                    {exam.title}
                  </h3>

                  <p>
                    {exam.description}
                  </p>

                  <p>
                    Duration:{" "}
                    {exam.duration} minutes
                  </p>

                  <p>
                    Questions:{" "}
                    {exam.numberOfQuestions}
                  </p>

                  <p>
                    Status:{" "}
                    <strong>
                      {exam.scheduleStatus}
                    </strong>
                  </p>

                </div>


                {/* Action Buttons */}

                <div className="management-actions">

                  <Link
                    to={`/exam-details/${exam._id}`}
                    className="view-btn"
                  >
                    View
                  </Link>


                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(exam)
                    }
                  >
                    Edit
                  </button>


                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(
                        exam._id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </section>

      </main>

    </div>
  );
}

export default ExamManagement;
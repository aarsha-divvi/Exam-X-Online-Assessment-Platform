const Question = require("../models/Question");

<<<<<<< HEAD
=======
// Create a question
>>>>>>> origin/member3-faculty
const createQuestion = async (req, res) => {
  try {
    const {
      question,
      type,
      options,
      correctAnswer,
      difficulty,
      topic,
<<<<<<< HEAD
=======
      createdBy,
>>>>>>> origin/member3-faculty
    } = req.body;

    const newQuestion = await Question.create({
      question,
      type,
      options,
      correctAnswer,
      difficulty,
      topic,
<<<<<<< HEAD
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
=======
      createdBy,
    });

    res.status(201).json({
>>>>>>> origin/member3-faculty
      message: "Question created successfully",
      question: newQuestion,
    });
  } catch (error) {
    res.status(500).json({
<<<<<<< HEAD
      success: false,
      message: error.message,
=======
      message: "Failed to create question",
      error: error.message,
>>>>>>> origin/member3-faculty
    });
  }
};

<<<<<<< HEAD
=======
// Get all questions
>>>>>>> origin/member3-faculty
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

<<<<<<< HEAD
    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
=======
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch questions",
      error: error.message,
>>>>>>> origin/member3-faculty
    });
  }
};

<<<<<<< HEAD
=======
// Get one question
>>>>>>> origin/member3-faculty
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
<<<<<<< HEAD
        success: false,
=======
>>>>>>> origin/member3-faculty
        message: "Question not found",
      });
    }

<<<<<<< HEAD
    res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
=======
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch question",
      error: error.message,
>>>>>>> origin/member3-faculty
    });
  }
};

<<<<<<< HEAD
=======
// Update question
>>>>>>> origin/member3-faculty
const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
<<<<<<< HEAD
      { new: true, runValidators: true }
=======
      {
        new: true,
        runValidators: true,
      }
>>>>>>> origin/member3-faculty
    );

    if (!question) {
      return res.status(404).json({
<<<<<<< HEAD
        success: false,
=======
>>>>>>> origin/member3-faculty
        message: "Question not found",
      });
    }

    res.status(200).json({
<<<<<<< HEAD
      success: true,
=======
>>>>>>> origin/member3-faculty
      message: "Question updated successfully",
      question,
    });
  } catch (error) {
    res.status(500).json({
<<<<<<< HEAD
      success: false,
      message: error.message,
=======
      message: "Failed to update question",
      error: error.message,
>>>>>>> origin/member3-faculty
    });
  }
};

<<<<<<< HEAD
=======
// Delete question
>>>>>>> origin/member3-faculty
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);

    if (!question) {
      return res.status(404).json({
<<<<<<< HEAD
        success: false,
=======
>>>>>>> origin/member3-faculty
        message: "Question not found",
      });
    }

    res.status(200).json({
<<<<<<< HEAD
      success: true,
=======
>>>>>>> origin/member3-faculty
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
<<<<<<< HEAD
      success: false,
      message: error.message,
=======
      message: "Failed to delete question",
      error: error.message,
>>>>>>> origin/member3-faculty
    });
  }
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
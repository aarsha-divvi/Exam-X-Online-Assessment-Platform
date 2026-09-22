const Submission = require("../models/Submission");
const Exam = require("../models/Exam");

const createSubmission = async (req, res) => {
  try {
    const { examId, answers } = req.body;

    const exam = await Exam.findById(examId);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    const existing = await Submission.findOne({
      exam: examId,
      student: req.user.id,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Exam already submitted",
      });
    }

    const submission = await Submission.create({
      exam: examId,
      student: req.user.id,
      answers,
      status: "SUBMITTED",
    });

    res.status(201).json({
      success: true,
      message: "Exam submitted successfully",
      submission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      student: req.user.id,
    })
      .populate("exam", "title duration")
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      submissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getExamSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      exam: req.params.examId,
    })
      .populate("student", "name email")
      .populate("exam", "title");

    res.status(200).json({
      success: true,
      submissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSubmission,
  getMySubmissions,
  getExamSubmissions,
};
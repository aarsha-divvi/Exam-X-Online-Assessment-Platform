const Exam = require("../models/Exam");

// Create a new exam
const createExam = async (req, res) => {
  try {
    const {
      title,
      description,
      duration,
      numberOfQuestions,
      createdBy,
    } = req.body;

    const exam = await Exam.create({
      title,
      description,
      duration,
      numberOfQuestions,
      createdBy,
    });

    res.status(201).json(exam);
  } catch (error) {
    console.error("Create exam error:", error);

    res.status(500).json({
      message: "Failed to create exam",
      error: error.message,
    });
  }
};

// Get all exams
const getExams = async (req, res) => {
  try {
    const exams = await Exam.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(exams);
  } catch (error) {
    console.error("Get exams error:", error);

    res.status(500).json({
      message: "Failed to fetch exams",
      error: error.message,
    });
  }
};

// Schedule an exam
const scheduleExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { scheduledDate, startTime, endTime } = req.body;

    const exam = await Exam.findById(id);

    if (!exam) {
      return res.status(404).json({
        message: "Exam not found",
      });
    }

    exam.scheduledDate = scheduledDate;
    exam.startTime = startTime;
    exam.endTime = endTime;
    exam.scheduleStatus = "Scheduled";

    await exam.save();

    const updatedExam = await Exam.findById(id)
      .populate("createdBy", "name email");

    res.status(200).json(updatedExam);
  } catch (error) {
    console.error("Schedule exam error:", error);

    res.status(500).json({
      message: "Failed to schedule exam",
      error: error.message,
    });
  }
};

module.exports = {
  createExam,
  getExams,
  scheduleExam,
};
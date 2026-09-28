const Exam = require("../models/Exam");

<<<<<<< HEAD
=======
// Create a new exam
>>>>>>> origin/member3-faculty
const createExam = async (req, res) => {
  try {
    const {
      title,
      description,
      duration,
<<<<<<< HEAD
      questions,
      startTime,
      endTime,
      status,
    } = req.body;

=======
      numberOfQuestions,
      createdBy,
      questions,
    } = req.body;

    if (!title || !description || !duration || !numberOfQuestions || !createdBy) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

>>>>>>> origin/member3-faculty
    const exam = await Exam.create({
      title,
      description,
      duration,
<<<<<<< HEAD
      questions,
      startTime,
      endTime,
      status,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Exam created successfully",
      exam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
=======
      numberOfQuestions,
      createdBy,
      questions: questions || [],
    });

    res.status(201).json(exam);
  } catch (error) {
    console.error("Create exam error:", error);

    res.status(500).json({
      message: "Failed to create exam",
      error: error.message,
>>>>>>> origin/member3-faculty
    });
  }
};

<<<<<<< HEAD
const getExams = async (req, res) => {
  try {
    const exams = await Exam.find()
      .populate("questions")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      exams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
=======

// Get all exams
const getExams = async (req, res) => {
  try {
    const exams = await Exam.find()
      .populate("createdBy", "name email")
      .populate("questions")
      .sort({ createdAt: -1 });

    res.status(200).json(exams);
  } catch (error) {
    console.error("Get exams error:", error);

    res.status(500).json({
      message: "Failed to fetch exams",
      error: error.message,
>>>>>>> origin/member3-faculty
    });
  }
};

<<<<<<< HEAD
const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id)
      .populate("questions")
      .populate("createdBy", "name email");

    if (!exam) {
      return res.status(404).json({
        success: false,
=======

// Get one exam
const getExamById = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findById(id)
      .populate("createdBy", "name email")
      .populate("questions");

    if (!exam) {
      return res.status(404).json({
>>>>>>> origin/member3-faculty
        message: "Exam not found",
      });
    }

<<<<<<< HEAD
    res.status(200).json({
      success: true,
      exam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
=======
    res.status(200).json(exam);
  } catch (error) {
    console.error("Get exam error:", error);

    res.status(500).json({
      message: "Failed to fetch exam",
      error: error.message,
>>>>>>> origin/member3-faculty
    });
  }
};

<<<<<<< HEAD
const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!exam) {
      return res.status(404).json({
        success: false,
=======

// Update exam
const updateExam = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      duration,
      numberOfQuestions,
      questions,
    } = req.body;

    const exam = await Exam.findById(id);

    if (!exam) {
      return res.status(404).json({
>>>>>>> origin/member3-faculty
        message: "Exam not found",
      });
    }

<<<<<<< HEAD
    res.status(200).json({
      success: true,
      message: "Exam updated successfully",
      exam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
=======
    if (title !== undefined) exam.title = title;
    if (description !== undefined) exam.description = description;
    if (duration !== undefined) exam.duration = duration;
    if (numberOfQuestions !== undefined) {
      exam.numberOfQuestions = numberOfQuestions;
    }
    if (questions !== undefined) {
      exam.questions = questions;
    }

    await exam.save();

    const updatedExam = await Exam.findById(id)
      .populate("createdBy", "name email")
      .populate("questions");

    res.status(200).json(updatedExam);
  } catch (error) {
    console.error("Update exam error:", error);

    res.status(500).json({
      message: "Failed to update exam",
      error: error.message,
>>>>>>> origin/member3-faculty
    });
  }
};

<<<<<<< HEAD
const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);

    if (!exam) {
      return res.status(404).json({
        success: false,
=======

// Delete exam
const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findById(id);

    if (!exam) {
      return res.status(404).json({
>>>>>>> origin/member3-faculty
        message: "Exam not found",
      });
    }

<<<<<<< HEAD
    res.status(200).json({
      success: true,
      message: "Exam deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
=======
    await Exam.findByIdAndDelete(id);

    res.status(200).json({
      message: "Exam deleted successfully",
    });
  } catch (error) {
    console.error("Delete exam error:", error);

    res.status(500).json({
      message: "Failed to delete exam",
      error: error.message,
>>>>>>> origin/member3-faculty
    });
  }
};

<<<<<<< HEAD
=======

// Schedule an exam
const scheduleExam = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      scheduledDate,
      startTime,
      endTime,
    } = req.body;

    if (!scheduledDate || !startTime || !endTime) {
      return res.status(400).json({
        message: "Please provide date, start time and end time",
      });
    }

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
      .populate("createdBy", "name email")
      .populate("questions");

    res.status(200).json(updatedExam);
  } catch (error) {
    console.error("Schedule exam error:", error);

    res.status(500).json({
      message: "Failed to schedule exam",
      error: error.message,
    });
  }
};


// Publish an exam
const publishExam = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findById(id);

    if (!exam) {
      return res.status(404).json({
        message: "Exam not found",
      });
    }

    if (exam.scheduleStatus !== "Scheduled") {
      return res.status(400).json({
        message: "Exam must be scheduled before publishing",
      });
    }

    exam.scheduleStatus = "Published";

    await exam.save();

    const updatedExam = await Exam.findById(id)
      .populate("createdBy", "name email")
      .populate("questions");

    res.status(200).json(updatedExam);
  } catch (error) {
    console.error("Publish exam error:", error);

    res.status(500).json({
      message: "Failed to publish exam",
      error: error.message,
    });
  }
};


// Add questions to an exam
const addQuestionsToExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { questions } = req.body;

    if (!Array.isArray(questions)) {
      return res.status(400).json({
        message: "Questions must be an array",
      });
    }

    const exam = await Exam.findById(id);

    if (!exam) {
      return res.status(404).json({
        message: "Exam not found",
      });
    }

    exam.questions = questions;

    await exam.save();

    const updatedExam = await Exam.findById(id)
      .populate("createdBy", "name email")
      .populate("questions");

    res.status(200).json(updatedExam);
  } catch (error) {
    console.error("Add questions error:", error);

    res.status(500).json({
      message: "Failed to add questions to exam",
      error: error.message,
    });
  }
};


>>>>>>> origin/member3-faculty
module.exports = {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam,
<<<<<<< HEAD
=======
  scheduleExam,
  publishExam,
  addQuestionsToExam,
>>>>>>> origin/member3-faculty
};
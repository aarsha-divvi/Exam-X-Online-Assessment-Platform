const Result = require("../models/Result");

const getMyResults = async (req, res) => {
  try {
    const results = await Result.find({
      student: req.user.id,
    })
      .populate("exam", "title duration startTime endTime")
      .populate("submission", "submittedAt status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate("student", "name email")
      .populate("exam", "title duration")
      .populate("submission");

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    const studentOwnsResult =
      req.user.role === "student" &&
      String(result.student._id) === String(req.user.id);

    const staffAccess =
      req.user.role === "faculty" ||
      req.user.role === "admin";

    if (!studentOwnsResult && !staffAccess) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getExamResults = async (req, res) => {
  try {
    const results = await Result.find({
      exam: req.params.examId,
    })
      .populate("student", "name email")
      .populate("exam", "title")
      .sort({ score: -1 });

    res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMyResults,
  getResultById,
  getExamResults,
};
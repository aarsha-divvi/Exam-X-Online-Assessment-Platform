const Result = require("../models/Result");

// Get all results
const getResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate("student", "name email")
      .populate("exam", "title duration numberOfQuestions")
      .sort({ submittedAt: -1 });

    res.status(200).json(results);
  } catch (error) {
    console.error("Get results error:", error);

    res.status(500).json({
      message: "Failed to fetch results",
      error: error.message,
    });
  }
};


// Get results for one exam
const getResultsByExam = async (req, res) => {
  try {
    const { examId } = req.params;

    const results = await Result.find({ exam: examId })
      .populate("student", "name email")
      .populate("exam", "title duration numberOfQuestions")
      .sort({ marks: -1 });

    res.status(200).json(results);
  } catch (error) {
    console.error("Get exam results error:", error);

    res.status(500).json({
      message: "Failed to fetch exam results",
      error: error.message,
    });
  }
};


// Get one student's result
const getStudentResult = async (req, res) => {
  try {
    const { studentId, examId } = req.params;

    const result = await Result.findOne({
      student: studentId,
      exam: examId,
    })
      .populate("student", "name email")
      .populate("exam", "title duration numberOfQuestions");

    if (!result) {
      return res.status(404).json({
        message: "Result not found",
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Get student result error:", error);

    res.status(500).json({
      message: "Failed to fetch student result",
      error: error.message,
    });
  }
};


// Get exam performance summary
const getExamPerformance = async (req, res) => {
  try {
    const { examId } = req.params;

    const results = await Result.find({ exam: examId });

    if (results.length === 0) {
      return res.status(200).json({
        totalStudents: 0,
        averageMarks: 0,
        highestMarks: 0,
        lowestMarks: 0,
        averagePercentage: 0,
      });
    }

    const marks = results.map((result) => result.marks);
    const percentages = results.map(
      (result) => result.percentage
    );

    const totalMarks = marks.reduce(
      (sum, mark) => sum + mark,
      0
    );

    const totalPercentage = percentages.reduce(
      (sum, percentage) => sum + percentage,
      0
    );

    const highestMarks = Math.max(...marks);
    const lowestMarks = Math.min(...marks);

    res.status(200).json({
      totalStudents: results.length,

      averageMarks: Number(
        (totalMarks / results.length).toFixed(2)
      ),

      highestMarks,

      lowestMarks,

      averagePercentage: Number(
        (totalPercentage / results.length).toFixed(2)
      ),
    });
  } catch (error) {
    console.error("Performance error:", error);

    res.status(500).json({
      message: "Failed to calculate exam performance",
      error: error.message,
    });
  }
};


module.exports = {
  getResults,
  getResultsByExam,
  getStudentResult,
  getExamPerformance,
};
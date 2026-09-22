const Submission = require("../models/Submission");
const Exam = require("../models/Exam");
const Result = require("../models/Result");

const normalizeAnswer = (value) => {
  return String(value || "")
    .trim()
    .toLowerCase();
};

const evaluateMCQ = (questions, answers) => {
  const answerMap = new Map(
    (answers || []).map((item) => [
      String(item.questionId),
      normalizeAnswer(item.answer),
    ])
  );

  let totalQuestions = 0;
  let correctAnswers = 0;

  for (const question of questions) {
    // Week 4 evaluates MCQs.
    // Coding evaluation can be added later.
    if (question.type !== "MCQ") {
      continue;
    }

    totalQuestions++;

    const submittedAnswer = answerMap.get(String(question._id));
    const correctAnswer = normalizeAnswer(question.correctAnswer);

    if (
      submittedAnswer &&
      submittedAnswer === correctAnswer
    ) {
      correctAnswers++;
    }
  }

  const wrongAnswers = totalQuestions - correctAnswers;

  const percentage =
    totalQuestions === 0
      ? 0
      : Number(((correctAnswers / totalQuestions) * 100).toFixed(2));

  return {
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    score: correctAnswers,
    percentage,
  };
};

const createSubmission = async (req, res) => {
  try {
    const { examId, answers } = req.body;

    const exam = await Exam.findById(examId).populate("questions");

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

    const evaluation = evaluateMCQ(
      exam.questions,
      answers
    );

    const submission = await Submission.create({
      exam: examId,
      student: req.user.id,
      answers,
      score: evaluation.score,
      status: "EVALUATED",
      submittedAt: new Date(),
    });

    const result = await Result.create({
      student: req.user.id,
      exam: examId,
      submission: submission._id,
      totalQuestions: evaluation.totalQuestions,
      correctAnswers: evaluation.correctAnswers,
      wrongAnswers: evaluation.wrongAnswers,
      score: evaluation.score,
      percentage: evaluation.percentage,
      status: "COMPLETED",
      evaluatedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Exam submitted and evaluated successfully",
      submission,
      result,
    });
  } catch (error) {
    console.error("Submission error:", error);

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
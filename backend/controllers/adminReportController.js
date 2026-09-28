const mongoose = require("mongoose");

const getAdminReports = async (req, res) => {
  try {
    const db = mongoose.connection.db;

    const users = await db.collection("users").find({}).toArray();
    const exams = await db.collection("exams").find({}).toArray();
    const results = await db.collection("results").find({}).toArray();

    // USERS

    const students = users.filter((user) => user.role === "student");
    const faculty = users.filter((user) => user.role === "faculty");
    const admins = users.filter((user) => user.role === "admin");

    const userRoleData = [
      {
        role: "Students",
        count: students.length,
      },
      {
        role: "Faculty",
        count: faculty.length,
      },
      {
        role: "Admins",
        count: admins.length,
      },
    ];

    const recentUsers = [...users]
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      )
      .slice(0, 10)
      .map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      }));

    // RESULTS

    const completedResults = results.filter(
      (result) => result.status === "COMPLETED"
    );

    const totalScore = completedResults.reduce(
      (sum, result) => sum + (result.percentage || 0),
      0
    );

    const averageScore =
      completedResults.length > 0
        ? Math.round(
            totalScore / completedResults.length
          )
        : 0;

    const passed = completedResults.filter(
      (result) => (result.percentage || 0) >= 40
    ).length;

    const failed = completedResults.filter(
      (result) => (result.percentage || 0) < 40
    ).length;

    const passRate =
      completedResults.length > 0
        ? Math.round(
            (passed / completedResults.length) * 100
          )
        : 0;

    const resultData = [
      {
        name: "Passed",
        value: passed,
      },
      {
        name: "Failed",
        value: failed,
      },
    ];

    // EXAMS

    const examStatusData = [
      {
        status: "Draft",
        count: exams.filter(
          (exam) => exam.status === "DRAFT"
        ).length,
      },
      {
        status: "Scheduled",
        count: exams.filter(
          (exam) => exam.status === "SCHEDULED"
        ).length,
      },
      {
        status: "Published",
        count: exams.filter(
          (exam) => exam.status === "PUBLISHED"
        ).length,
      },
      {
        status: "Completed",
        count: exams.filter(
          (exam) => exam.status === "COMPLETED"
        ).length,
      },
    ];

    const examData = exams.map((exam) => {
      const examResults = completedResults.filter(
        (result) =>
          String(result.exam) === String(exam._id)
      );

      const average =
        examResults.length > 0
          ? Math.round(
              examResults.reduce(
                (sum, result) =>
                  sum + (result.percentage || 0),
                0
              ) / examResults.length
            )
          : 0;

      return {
        id: exam._id,
        title: exam.title,
        status: exam.status,
        participants: examResults.length,
        average,
        startTime: exam.startTime,
        endTime: exam.endTime,
      };
    });

    // PARTICIPATION

    const participationData = examData.map((exam) => ({
      exam: exam.title,
      participants: exam.participants,
    }));

    // OVERALL STATISTICS

    const stats = {
      totalUsers: users.length,
      totalStudents: students.length,
      totalFaculty: faculty.length,
      totalAdmins: admins.length,

      totalExams: exams.length,

      activeExams: exams.filter(
        (exam) =>
          exam.status === "PUBLISHED" ||
          exam.status === "SCHEDULED"
      ).length,

      completedExams: exams.filter(
        (exam) => exam.status === "COMPLETED"
      ).length,

      studentsAppeared: completedResults.length,

      averageScore,
      passRate,

      passed,
      failed,
    };

    res.status(200).json({
      success: true,

      stats,

      users: {
        roleData: userRoleData,
        recentUsers,
      },

      exams: {
        statusData: examStatusData,
        examData,
      },

      results: {
        passed,
        failed,
        resultData,
      },

      participation: participationData,
    });
  } catch (error) {
    console.error("Admin report error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAdminReports,
};
const dns = require("dns");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const protectedRoutes = require("./routes/protectedRoutes");
const questionRoutes = require("./routes/questionRoutes");
const examRoutes = require("./routes/examRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const resultRoutes = require("./routes/resultRoutes");
=======

>>>>>>> origin/ramya
=======
const questionRoutes = require("./routes/questionRoutes");
const examRoutes = require("./routes/examRoutes");
const resultRoutes = require("./routes/resultRoutes");

>>>>>>> origin/member3-faculty
=======
const userRoutes = require("./routes/userRoutes");
const adminReportRoutes = require("./routes/adminReportRoutes");

>>>>>>> origin/Hansika
dotenv.config();

const app = express();

<<<<<<< HEAD
<<<<<<< HEAD
// Connect to MongoDB
=======
>>>>>>> origin/ramya
=======
>>>>>>> origin/Hansika
connectDB();

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/results", resultRoutes);

// Test route
=======
app.use("/api/auth", authRoutes);

>>>>>>> origin/ramya
=======
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/ai", require("./routes/aiRoutes"));

// Test Route
>>>>>>> origin/member3-faculty
=======
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin/reports", adminReportRoutes);

>>>>>>> origin/Hansika
app.get("/", (req, res) => {
  res.send("ExamX Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
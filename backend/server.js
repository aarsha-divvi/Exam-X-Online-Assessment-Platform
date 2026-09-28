const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
<<<<<<< HEAD
const protectedRoutes = require("./routes/protectedRoutes");
const questionRoutes = require("./routes/questionRoutes");
const examRoutes = require("./routes/examRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const resultRoutes = require("./routes/resultRoutes");
=======

>>>>>>> origin/ramya
dotenv.config();

const app = express();

<<<<<<< HEAD
// Connect to MongoDB
=======
>>>>>>> origin/ramya
connectDB();

app.use(cors());
app.use(express.json());

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
app.get("/", (req, res) => {
  res.send("ExamX Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
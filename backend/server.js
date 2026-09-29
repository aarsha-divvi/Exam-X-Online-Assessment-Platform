const dns = require("dns");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const questionRoutes = require("./routes/questionRoutes");
const examRoutes = require("./routes/examRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const resultRoutes = require("./routes/resultRoutes");
const aiRoutes = require("./routes/aiRoutes");
const adminReportRoutes = require("./routes/adminReportRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/admin", adminReportRoutes);

app.get("/", (req, res) => {
  res.send("ExamX Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
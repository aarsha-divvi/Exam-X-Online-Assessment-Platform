const dns = require("dns");
dns.setServers(["1.1.1.1", "1.0.0.1"]);
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const examRoutes = require("./routes/examRoutes");
dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/exams", examRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("ExamX Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

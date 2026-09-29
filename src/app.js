const express = require("express");
const errorHandler = require("./middlewares/error.middlewares");
const authRoutes = require("./routes/auth.routes");


const app = express();

// Import Routes
const teacherRoutes = require("./routes/teacher.routes");

// Middleware
app.use(express.json());

// Auth Routes
app.use("/api/auth", authRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to Teacher API");
});
app.use(errorHandler);
module.exports = app;

const express = require("express");

const app = express();

// Import Routes
const teacherRoutes = require("./routes/teacher.routes");

// Middleware
app.use(express.json());

// Teacher Routes
app.use("/api/myteacher", teacherRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to Teacher API");
});

module.exports = app;
const teacherSchema = require("../validations/teacher.validation");
const validateTeacher = (req, res, next) => {
  const result = teacherSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.error.issues,
    });
  }

  req.body = result.data;

  next();
};

module.exports = validateTeacher;
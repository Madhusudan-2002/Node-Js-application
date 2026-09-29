const teacherService = require("../services/teacher.service");
const teacherSchema = require("../validations/teacher.validation");
const asyncHandler = require("../utils/asyncHandler");
const logger = require("../utils/logger");


// Create Teacher
const createTeacher = asyncHandler(async (req, res) => {
  logger.info("TeacherController.createTeacher - start");
  const teacher = await teacherService.createTeacher(req.body);

  res.status(201).json({
    success: true,
    message: "Teacher created successfully",
    data: teacher,
  });
});

// Create Teacher with Global Exception Handler
const createTeacherWithGEH = asyncHandler(async (req, res) => {
  const teacher = await teacherService.createTeacher(req.body);

  res.status(201).json({
    success: true,
    message: "Teacher created successfully",
    data: teacher,
  });
});

// Create Teacher with Validation
const createTeacherWithValidation = asyncHandler(async (req, res) => {
  const validationResult = teacherSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: validationResult.error.issues,
    });
  }

  const teacher = await teacherService.createTeacher(
    validationResult.data
  );

  res.status(201).json({
    success: true,
    message: "Teacher created successfully",
    data: teacher,
  });
});

// Create Teacher with Validation Middleware
const createTeacherWithValidationMW = asyncHandler(async (req, res) => {
  const teacher = await teacherService.createTeacher(req.body);

  res.status(201).json({
    success: true,
    message: "Teacher created successfully",
    data: teacher,
  });
});

// Create Multiple Teachers
const createMultipleTeacher = asyncHandler(async (req, res) => {
  const teachers = await teacherService.createMultipleTeacher(req.body);

  res.status(201).json({
    success: true,
    message: "Teachers created successfully",
    data: teachers,
  });
});

// Get All Teachers
const getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await teacherService.getAllTeachers();

  res.status(200).json({
    success: true,
    count: teachers.length,
    data: teachers,
  });
});

// Get Teacher By ID
const getTeacherByIdUsingParams = asyncHandler(async (req, res) => {
  const teacher = await teacherService.getTeacherByIdUsingParams(
    req.params.id
  );

  if (!teacher) {
    return res.status(404).json({
      success: false,
      message: "Teacher not found",
    });
  }

  res.status(200).json({
    success: true,
    data: teacher,
  });
});

// Get Teacher By Subject
const getTeacherBySubject = asyncHandler(async (req, res) => {
  const { subject } = req.query;

  const teacher = await teacherService.getTeacherBySubject(subject);

  if (!teacher) {
    return res.status(404).json({
      success: false,
      message: "Teacher not found",
    });
  }

  res.status(200).json({
    success: true,
    data: teacher,
  });
});

// Get Teacher By Subject and Marital Status
const getTeacherBySubjectAndMaritalStatus = asyncHandler(
  async (req, res) => {
    const { subject, married } = req.query;

    const teacher =
      await teacherService.getTeacherBySubjectAndMaritalStatus(
        subject,
        married
      );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      data: teacher,
    });
  }
);

// Get Teachers Using Pagination
const getAllTeachersUsingPagination = asyncHandler(async (req, res) => {
  let page = parseInt(req.query.page, 10) || 1;
  let limit = parseInt(req.query.limit, 10) || 10;

  if (page < 1) {
    page = 1;
  }

  if (limit < 1) {
    limit = 10;
  }

  if (limit > 100) {
    limit = 100;
  }

  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order === "desc" ? "desc" : "asc";

  const { subject, name, city } = req.query;

  const allowedSortFields = [
    "name",
    "email",
    "age",
    "subject",
    "createdAt",
  ];

  const safeSortBy = allowedSortFields.includes(sortBy)
    ? sortBy
    : "createdAt";

  const result = await teacherService.getTeachersByPagination({
    page,
    limit,
    sortBy: safeSortBy,
    order,
    subject,
    name,
    city,
  });

  res.status(200).json({
    success: true,
    count: result.teachers.length,
    pagination: result.pagination,
    data: result.teachers,
  });
});

// Delete Teacher
const deleteTeacher = asyncHandler(async (req, res) => {
  const teacher = await teacherService.deleteTeacher(req.params.id);

  if (!teacher) {
    return res.status(404).json({
      success: false,
      message: "Teacher not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Teacher Record Deleted",
  });
});

// Update Teacher
const updateTeacher = asyncHandler(async (req, res) => {
  const teacher = await teacherService.updateTeacher(
    req.params.id,
    req.body
  );

  if (!teacher) {
    return res.status(404).json({
      success: false,
      message: "Teacher not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Teacher Updated successfully",
    data: teacher,
  });
});

module.exports = {
  createTeacher,
  createTeacherWithGEH,
  createTeacherWithValidation,
  createTeacherWithValidationMW,
  createMultipleTeacher,
  getAllTeachers,
  getTeacherByIdUsingParams,
  getTeacherBySubject,
  getTeacherBySubjectAndMaritalStatus,
  getAllTeachersUsingPagination,
  deleteTeacher,
  updateTeacher,
};
const Teacher = require("../models/teacher");
const logger = require("../utils/logger");
// Create Teacher
const createTeacher = async (teacherData) => {
   logger.info("TeacherService.createTeacher - start");
  return await Teacher.create(teacherData);
};

// Create Multiple Teachers
const createMultipleTeacher = async (teacherData) => {
  return await Teacher.insertMany(teacherData);
};

// Get All Teachers
const getAllTeachers = async () => {
  return await Teacher.find();
};

// Get Teachers Using Pagination
const getTeachersByPagination = async ({
  page,
  limit,
  sortBy,
  order,
  subject,
  name,
  city,
}) => {
  const filter = {};

  // Exact match for subject
  if (subject) {
    filter.subject = subject;
  }

  // Partial case-insensitive search for name
  if (name) {
    filter.name = {
      $regex: name,
      $options: "i",
    };
  }

  // Partial case-insensitive search for city
  if (city) {
    filter["address.city"] = {
      $regex: city,
      $options: "i",
    };
  }

  const sortOrder = order === "desc" ? -1 : 1;

  const sort = {
    [sortBy]: sortOrder,
  };

  const skip = (page - 1) * limit;

  const [teachers, total] = await Promise.all([
    Teacher.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit),

    Teacher.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limit) || 1;

  return {
    teachers,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

// Get Teacher By ID
const getTeacherByIdUsingParams = async (id) => {
  return await Teacher.findById(id);
};

// Get Teacher By Subject
const getTeacherBySubject = async (subject) => {
  const filter = {};

  if (subject) {
    filter.subject = subject;
  }

  return await Teacher.find(filter);
};

// Get Teacher By Subject and Marital Status
const getTeacherBySubjectAndMaritalStatus = async (
  subject,
  married
) => {
  const filter = {};

  if (subject) {
    filter.subject = subject;
  }

  if (married !== undefined) {
    filter.married = married;
  }

  return await Teacher.find(filter);
};

// Delete Teacher
const deleteTeacher = async (id) => {
  return await Teacher.findByIdAndDelete(id);
};

// Update Teacher
const updateTeacher = async (id, newTeacherData) => {
  return await Teacher.findByIdAndUpdate(
    id,
    newTeacherData,
    {
      new: true,
    }
  );
};

module.exports = {
  createTeacher,
  createMultipleTeacher,
  getAllTeachers,
  getTeachersByPagination,
  getTeacherByIdUsingParams,
  getTeacherBySubject,
  getTeacherBySubjectAndMaritalStatus,
  deleteTeacher,
  updateTeacher,
};
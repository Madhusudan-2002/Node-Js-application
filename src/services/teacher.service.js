const Teacher = require("../models/teacher");

// Create Teacher
const createTeacher = async (teacherData) => {
  return await Teacher.create(teacherData);
};
// Create Multiple Teacher
const createmultipleTeacher = async (teacherData) => {
  return await Teacher.insertMany(teacherData)
};

// Get All Teachers
const getAllTeachers = async () => {
  return await Teacher.find();
};

// Get Teacher By ID
const getTeacherByIdUsingParams = async (id) => {
  return await Teacher.findById(id);
};
// Get Teacher By subject
const getTeacherBySubject = async (subject) => {
      const filter = {};

    if (subject) {
        filter.subject = subject;
    }

    return await Teacher.find(filter);
};
// Get Teacher By subject and marital status
const  getTeacherBySubjectandmaritalstatus = async (subject,married) => {
      const filter = {};

    if (subject) {
        filter.subject = subject;
    }
      if (married) {
        filter.married = married;
    }
    return await Teacher.find(filter);
};

// Delete Teacher
const deleteTeacher = async (id) => {
  return await Teacher.findByIdAndDelete(id);
};
const updateTeacher = async (id,newTeacherData) => {
    return await Teacher.findByIdAndUpdate(
        id,
        newTeacherData,
        { new: true }
    );
};


module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherByIdUsingParams,
  deleteTeacher,
  updateTeacher,
  createmultipleTeacher,
  getTeacherBySubject,
  getTeacherBySubjectandmaritalstatus
};
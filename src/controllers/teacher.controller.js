const teacherService = require("../services/teacher.service");

// Create Teacher
const createTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.createTeacher(req.body);

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Create Teacher
const createmultipleTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.createmultipleTeacher(req.body);

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get All Teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await teacherService.getAllTeachers();

    res.status(200).json({
      success: true,
      count: teachers.length,
      data: teachers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Teacher By ID Using Params
const getTeacherByIdUsingParams = async (req, res) => {
  try {
    const teacher =
      await teacherService.getTeacherByIdUsingParams(req.params.id);

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// get teacher by subject
const getTeacherBySubject = async (req, res) => {
  try {
       const { subject } = req.query;
    const teacher =
      await teacherService.getTeacherBySubject(subject);

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// get teacher by subject and marital status
const getTeacherBySubjectandmaritalstatus = async (req, res) => {
  try {
       const { subject,married } = req.query;
    const teacher =
      await teacherService.getTeacherBySubjectandmaritalstatus(subject,married);

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Teacher
const deleteTeacher = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateTeacher = async (req, res) => {
    try {
        const teacher = await teacherService.updateTeacher(req.params.id,req.body);

        if(!teacher)
        {
            return res.status(404).json({
            success: false,
            message: "Teacher not found"
        });
        }
        res.status(200).json({
            success: true,
            message: "Teacher Updated successfully",
            data: teacher
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};  




module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherByIdUsingParams,
  deleteTeacher,
  updateTeacher,
 createmultipleTeacher ,
 getTeacherBySubject,
 getTeacherBySubjectandmaritalstatus

};
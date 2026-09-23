const express = require("express");
const router = express.Router();

const teacherController = require("../controllers/teacher.controller");
router.delete("/:id", teacherController.deleteTeacher);
router.get("/getTeacherBySubjectandmarital", teacherController.getTeacherBySubjectandmaritalstatus);
router.get("/getTeacherBySubject", teacherController.getTeacherBySubject);
router.get("/:id", teacherController.getTeacherByIdUsingParams);
router.post("/addMultiple", teacherController.createmultipleTeacher);
router.post("/", teacherController.createTeacher);
router.get("/", teacherController.getAllTeachers);
router.put("/:id", teacherController.updateTeacher);


module.exports = router;
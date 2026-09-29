const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher.controller");
const validteTeacher = require("../middlewares/validate.teacher.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
router.delete("/:id", teacherController.deleteTeacher);
router.get("/getTeacherBySubjectandmarital", teacherController.getTeacherBySubjectAndMaritalStatus);
router.get("/getTeacherBySubject", teacherController.getTeacherBySubject);
router.get("/getAllTeachersUsingPagination", teacherController.getAllTeachersUsingPagination);
router.get("/:id", teacherController.getTeacherByIdUsingParams);
router.post("/addMultiple",authMiddleware, teacherController.createMultipleTeacher);
router.post("/createTeacherWithGEH",authMiddleware,validteTeacher, teacherController.createTeacherWithGEH);
router.post("/createTeacherWithValidation", authMiddleware,teacherController.createTeacherWithValidation);
router.post("/createTeacherWithValidationMW", authMiddleware,validteTeacher,teacherController.createTeacherWithValidationMW);
router.post("/",authMiddleware, teacherController.createTeacher);
router.get("/", teacherController.getAllTeachers);
router.put("/:id",authMiddleware, teacherController.updateTeacher);


module.exports = router;
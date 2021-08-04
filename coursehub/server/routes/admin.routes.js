var router = require("express").Router();


const admin = require("../controllers/admin.controller.js");



router.get("/freeCourse/all", admin.getFreeCourses);

router.get("/post/all", admin.getPosts);

router.get("/all/teacher", admin.getTeachers);

router.get("/students/all", admin.getStudents);

router.get("/student/one/:id", admin.getOneStudent);

router.delete("/student/delete/:id", admin.deleteOneStudent)

router.get("/posts/all/:id", admin.getOnePost);

router.get("/posts/teacher/:id", admin.getOneTeacherPost);

router.get("/freecourse/all/:id", admin.getOneFreeCourse);

router.get("/freecourse/teacher/:id", admin.getOneTeacherFreeCourse);

router.get("/freecourse/attachement/:id", admin.getFreeCourseAttachement);

router.get("/teacher/all", admin.getAllTeachers);

router.get("/teacher/one/:id", admin.getOneTeacher);

router.delete("/teacher/delete/:id", admin.deleteOneTeacher);

router.put("/freeCourse/update/:id", admin.updateFreeCourse);

router.delete("/freeCourse/delete/:id", admin.deleteFreeCourse);

router.put("/post/update/:id", admin.updatePost);

router.delete("/post/delete/:id", admin.deletePost);



module.exports = router;
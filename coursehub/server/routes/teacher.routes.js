var router = require("express").Router();

const teacher = require("../controllers/teacher.controller");

router.post(`/post`, teacher.makePost); //

router.get(`/oneUser/:id`, teacher.getOneTeacher); //

router.get(`/user/teachers`, teacher.getAllTeachers); //

router.get(`/posts/:id`, teacher.getTeacherPosts); //

router.put(`/update/profile/:id`, teacher.updateTeacherProfile); //

router.put(`/form/feedback/:id`, teacher.feedBackForm); //

router.get(`/all/posts/:id`, teacher.getAllteachersPosts); //

router.get(`/all/blogs`, teacher.getAllPosts); //

router.get(`/all/teachers`, teacher.getTeachers); //

module.exports = router;

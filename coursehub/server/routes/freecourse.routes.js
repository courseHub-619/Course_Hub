var router = require("express").Router();



    const course = require("../controllers/freecourse.controller.js");


       
    router.get("/all", course.allFreecourses);
    router.get("/all/teacher", course.getAllTeachers);
    router.get("/all/:id", course.getFreeCourse);
    router.get("/attachement/:id", course.getAttachement);
    router.get("/teacher/:id", course.getOneTeacher);
    router.post("/post", course.postFreeCourse);

  

module.exports = router;
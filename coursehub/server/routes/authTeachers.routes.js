var router = require("express").Router();



    const users = require("../controllers/authTeachers.controller.js");


       
    router.post("/signUp", users.signUp);
    router.post("/logIn",  users.logIn);
    router.get('/trying',users.authenticateToken,users.trying);
  

module.exports = router;
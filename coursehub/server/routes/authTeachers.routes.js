
module.exports = app => {
    const users = require("../controllers/authTeachers.controller.js");
    var router = require("express").Router();


       
    router.post("/signUp", users.signUp);
    router.post("/logIn",  users.logIn);
    router.get('/trying',users.authenticateToken,users.trying);

  
        app.use('/api/auth/teacher', router);

}
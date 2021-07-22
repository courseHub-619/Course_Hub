
module.exports = app => {
    const users = require("../controllers/authStudents.controller.js");
    var router = require("express").Router();


       
    router.post("/signUp", users.signUp);
    router.post("/logIn",  users.logIn);
    
  
        app.use('/api/auth', router);

}
var router = require("express").Router();


    const users = require("../controllers/authStudents.controller.js");


       
    router.post("/signUp", users.signUp);
    router.post("/logIn",  users.logIn);


    router.post("/getOneByToken",users.getUserByToken);
    router.get('/trying',users.authenticateToken,users.trying);


    
  

module.exports = router;
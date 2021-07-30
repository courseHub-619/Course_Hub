var router = require("express").Router();


    const users = require("../controllers/authStudents.controller.js");


       
    router.post("/signUp", users.signUp);
    router.post("/logIn",  users.logIn);


    // router.post("/token",users.token);
    router.get('/trying',users.authenticateToken,users.trying);
    // router.delete('/logout',users.logout);


    
  

module.exports = router;
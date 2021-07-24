
module.exports = app => {
    const users = require("../controllers/authStudents.controller.js");
    var router = require("express").Router();


       
    router.post("/signUp", users.signUp);
    router.post("/logIn",  users.logIn);


    // router.post("/token",users.token);
    router.get('/trying',users.authenticateToken,users.trying);
    // router.delete('/logout',users.logout);

    
  
        app.use('/api/auth/student', router);

}
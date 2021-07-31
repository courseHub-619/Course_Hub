const cors = require("cors");

var router = require("express").Router();



    const users = require("../controllers/buyPointsStudent.js");




    router.post('/payment',users.buyPoints);
    router.post('/getOldBalence',users.getOldBalence);
    router.post('/setNewBalence',users.setNewBalence)







    module.exports = router;
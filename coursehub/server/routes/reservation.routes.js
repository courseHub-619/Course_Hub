var router = require("express").Router();

const users = require("../controllers/reservation.controller.js");

router.get("/day/available/:id", users.availableDays);
router.get("/session/available/:id", users.availableSessions);
router.get("/balance/:id", users.getBalance);
router.put("/balance/:id/:price/:tId", users.changeBalance);
router.post("/scheduel", users.postReservation);
router.get("/available/:id", users.getAvailableReservation);
router.get("/available/:id/:day", users.getAvailableDay);
router.get("/scheduel/:id", users.getAllReservation);
router.delete("/scheduel/delete/:id", users.deleteReservation);

module.exports = router;

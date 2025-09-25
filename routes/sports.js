const express = require("express");
const router = express.Router();
const sportsController = require("../controllers/sportsController");

// List all sports
router.get("/", sportsController.listSports);

// Admin creates sport
router.post("/create", sportsController.createSport);

module.exports = router;

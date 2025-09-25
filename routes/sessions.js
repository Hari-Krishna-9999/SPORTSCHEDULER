const express = require("express");
const router = express.Router();
const sessionsController = require("../controllers/sessionsController");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/", sessionsController.getSessionsPage);
router.post("/create", isAuthenticated, sessionsController.createSession);
router.post("/join/:id", isAuthenticated, sessionsController.joinSession);
router.post("/cancel/:id", isAuthenticated, sessionsController.cancelSession);

module.exports = router;

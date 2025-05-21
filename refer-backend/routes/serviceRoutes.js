const express = require("express");
const { createService, getMyServices } = require("../controllers/servicesController");
const authenticate = require("../middleware/auth");

const router = express.Router();

router.post("/", authenticate, createService);
router.get("/mine", authenticate, getMyServices);

module.exports = router;

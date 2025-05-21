const express = require("express");
const { createLead, getMyLeads, updateLeadStatus} = require("../controllers/leadsController");
const authenticate = require("../middleware/auth");

const router = express.Router();

router.post("/", authenticate, createLead);
router.get("/mine", authenticate, getMyLeads);
router.post("/:id/status", authenticate, updateLeadStatus);


module.exports = router;

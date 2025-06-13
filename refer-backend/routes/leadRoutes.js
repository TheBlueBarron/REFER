const express = require("express");
const {
  createLead,
  getMyLeads,
  getIncomingLeads,
  updateLeadStatus,
} = require("../controllers/leadsController");
const authenticate = require("../middleware/auth");

const router = express.Router();

router.post("/", authenticate, createLead);
router.get("/mine", authenticate, getMyLeads);
router.get("/for-me", authenticate, getIncomingLeads);
router.post("/:id/status", authenticate, updateLeadStatus);


module.exports = router;

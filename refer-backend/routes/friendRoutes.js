const express = require("express");
const { addFriend, getFriends,getFriendServices} = require("../controllers/friendsController");
const authenticate = require("../middleware/auth");

const router = express.Router();

router.post("/", authenticate, addFriend);
router.get("/", authenticate, getFriends);
router.get("/services", authenticate, getFriendServices);

module.exports = router;

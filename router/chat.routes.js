const express = require("express");
const router = express.Router();
const chatController = require("../controller/chat.controller.js");
const userAuthorize = require("../middleware/user-authorization.js");

router.get("/:userEmail", [userAuthorize], chatController.getChat);

module.exports = router;

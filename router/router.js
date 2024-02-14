const express = require("express");
const router = express.Router();
const authRouter = require("./auth.routes.js");
const chatRouter = require("./chat.routes.js");
const uploadsRouter = require("./uploads.routes.js");

router.use("/auth", authRouter);
router.use("/chat", chatRouter);
router.use("/uploads", uploadsRouter);

module.exports = router;

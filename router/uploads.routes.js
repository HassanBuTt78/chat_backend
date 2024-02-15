const express = require("express");
const router = express.Router();
const uploadsController = require("../controller/uploads.controller.js");
const userAuthorize = require("../middleware/user-authorization.js");
const uploader = require("../middleware/file-upload.js");

router.post(
    "/",
    [userAuthorize, uploader("document", 5).array("file")],
    uploadsController.uploadFile
);
router.get("/:filename", uploadsController.getUpload);

module.exports = router;

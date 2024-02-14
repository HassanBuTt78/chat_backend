const express = require("express");
const router = express.Router();
const uploadsController = require("../controller/uploads.controller.js");
const userAuthorize = require("../middleware/user-authorization.js");
const upload = require("../middleware/file-upload.js");

router.post(
    "/",
    [userAuthorize, upload.single("file")],
    uploadsController.uploadFile
);
router.get("/:filename", uploadsController.getUpload);

module.exports = router;

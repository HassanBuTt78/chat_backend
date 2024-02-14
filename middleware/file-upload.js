const multer = require("multer");
const path = require("path");
const CustomError = require("../utils/custom-error");
const MAX_FILE_SIZE = 5e7; /*50MB in bytes*/

const storage = multer.diskStorage({
    destination: "public/uploads/",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        const fileExtension = path.extname(file.originalname);
        cb(
            null,
            path.parse(file.originalname).name.trim().replace(" ", "-") +
                "-" +
                uniqueSuffix +
                fileExtension
        );
    },
});
const fileFilter = (req, file, cb) => {
    const shouldAccept = req.headers["content-length"] <= MAX_FILE_SIZE;
    shouldAccept
        ? cb(null, true)
        : cb(new CustomError(413, "File must be under 50MB"), false);
};

const upload = multer({
    storage: storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: fileFilter,
});

module.exports = upload;

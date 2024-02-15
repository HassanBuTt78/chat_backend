const multer = require("multer");
const path = require("path");
const CustomError = require("../utils/custom-error");
const MAX_FILE_SIZE = 5e7; /*50MB in bytes*/
const ALLOWED_MIME_TYPES = [
    "audio/mpeg",
    "audio/vnd.wav",
    "audio/mp4",
    "application/json",
    "application/pdf",
    "application/vnd.ms-powerpoint",
    "text/plain",
    "application/zip",
    "image/gif",
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "video/x-msvideo",
    "video/mpeg",
    "video/mp4",
];

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
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return cb(new CustomError(415, "File Type not Allowed"), false);
    }
    if (!(req.headers["content-length"] <= MAX_FILE_SIZE)) {
        return cb(new CustomError(413, "File must be under 50MB"), false);
    }

    cb(null, true);
};

const upload = multer({
    storage: storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: fileFilter,
});

module.exports = upload;

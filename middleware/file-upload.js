const multer = require("multer");
const path = require("path");
const CustomError = require("../utils/custom-error");
const ALLOWED_MIME_TYPES = {
    image: ["image/gif", "image/jpeg", "image/png", "image/webp", "image/avif"],
    audio: ["audio/mpeg", "audio/vnd.wav", "audio/mp4"],
    document: [
        "application/json",
        "application/pdf",
        "application/vnd.ms-powerpoint",
        "text/plain",
        "application/zip",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
    ],
    video: ["video/x-msvideo", "video/mpeg", "video/mp4"],
};

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

const uploader = (filetypes, maxSize) => {
    const allowedFileTypes = [];
    if (typeof filetypes === "object") {
        for (const filetype of filetypes) {
            allowedFileTypes.push(...ALLOWED_MIME_TYPES[filetype]);
        }
    } else {
        allowedFileTypes.push(...ALLOWED_MIME_TYPES[filetypes]);
    }

    return multer({
        storage: storage,
        limits: { fileSize: maxSize * 1000000 },
        fileFilter: (req, file, cb) => {
            if (!allowedFileTypes.includes(file.mimetype)) {
                return cb(
                    new CustomError(
                        415,
                        `Only [${filetypes}] are allowed to upload on this route`
                    ),
                    false
                );
            }
            if (!(req.headers["content-length"] <= maxSize * 1000000)) {
                return cb(
                    new CustomError(413, `File must be under ${maxSize}MB`),
                    false
                );
            }
            cb(null, true);
        },
    });
};

module.exports = uploader;

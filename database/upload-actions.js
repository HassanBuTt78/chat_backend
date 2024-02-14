const Upload = require("../model/Upload.js");
const CustomError = require("../utils/custom-error");

const addUpload = async (doc) => {
    const addedUpload = await Upload.create(doc);
    if (!addedUpload) {
        throw new CustomError(500, "failed to upload image");
    }
    return addedUpload;
};

const getUpload = async (filename) => {
    const upload = await Upload.findOne({ filename: filename });
    if (!upload) {
        throw new CustomError(404, "No file of this name is found");
    }
    return upload;
};

module.exports = { addUpload, getUpload };

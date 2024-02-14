const mongoose = require("mongoose");

const Upload = mongoose.model(
    "upload",
    new mongoose.Schema(
        {
            filename: {
                type: String,
                required: true,
            },
            originalname: {
                type: String,
                required: true,
            },
            mimetype: {
                type: String,
                required: true,
            },
            uploader: {
                type: mongoose.Schema.ObjectId,
                ref: "user",
                required: true,
            },
            size: {
                type: Number,
                required: true,
            },

            address: {
                type: String,
                required: true,
            },
        },
        { versionKey: false }
    )
);
module.exports = Upload;

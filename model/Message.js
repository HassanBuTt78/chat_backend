const mongoose = require("mongoose");

const Message = mongoose.model(
    "message",
    new mongoose.Schema(
        {
            to: {
                type: mongoose.Schema.ObjectId,
                ref: "user",
                required: true,
            },
            from: {
                type: mongoose.Schema.ObjectId,
                ref: "user",
                required: true,
            },
            message: {
                type: String,
                required: true,
            },
            file: {
                type: mongoose.Schema.ObjectId,
                ref: "upload",
                default: null,
            },
        },
        { versionKey: false }
    )
);
module.exports = Message;

const mongoose = require("mongoose");

const User = mongoose.model(
    "user",
    new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
            },

            email: {
                type: String,
                required: true,
                unique: true,
            },
            password: {
                type: String,
                required: true,
            },
            role: {
                type: String,
                default: "user",
            },
            online: {
                type: Boolean,
                default: false,
            },
            room: {
                type: String,
                default: null,
            },
        },
        { versionKey: false }
    )
);
module.exports = User;

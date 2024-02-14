const userActions = require("../database/user-actions.js");
const chatActions = require("../database/message-actions.js");
const errorHandler = require("../utils/socketErrorHandler.js");

const chatHandler = (socket) => {
    return async (data) => {
        try {
            const userData = await userActions.getUserByUsername(data.to);
            if (!userData) {
                throw new Error("No user with this email!");
            }
            if (userData.online) {
                socket.to(userData.room).emit("chat", {
                    from: socket.userData.email,
                    to: data.to,
                    message: data.message,
                    file: data.file || null,
                });
            }
            const doc = {
                to: userData._id,
                from: socket.userData._id,
                message: data.message,
                file: data.file ? data.file._id : null,
            };
            await chatActions.addMessage(doc);
        } catch (err) {
            errorHandler(err, socket);
        }
    };
};

module.exports = chatHandler;

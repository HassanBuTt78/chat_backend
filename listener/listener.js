const chatHandler = require("./chat-handler.js");
const disconnectHandler = require("./disconnect-handler.js");
const userActions = require("../database/user-actions.js");
const errorHandler = require("../utils/socketErrorHandler.js");

const listener = async (socket) => {
    try {
        await userActions.updateUser(
            { _id: socket.userData._id },
            { online: true, room: socket.id }
        );

        socket.on("chat", chatHandler(socket));
        socket.on("disconnect", disconnectHandler(socket));
    } catch (err) {
        errorHandler(err, socket);
    }
};

module.exports = listener;

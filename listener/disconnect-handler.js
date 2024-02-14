const userActions = require("../database/user-actions.js");
const errorHandler = require("../utils/socketErrorHandler.js");

const disconnectHandler = (socket) => {
    return async (msg) => {
        try {
            await userActions.updateUser(
                { _id: socket.userData._id },
                { online: false, room: null }
            );
        } catch (err) {
            errorHandler(err, socket);
        }
    };
};

module.exports = disconnectHandler;

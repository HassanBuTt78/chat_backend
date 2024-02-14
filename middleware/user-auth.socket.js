const jwt = require("../utils/jwt.js");
const db = require("../database/user-actions.js");

const userAuthorize = async (socket, next) => {
    try {
        const header = socket.handshake.headers["authorization"];
        if (!header) {
            const err = new Error("unauthorized - You are not Logged In");
            throw err;
        }

        const token = header.replace("Bearer ", "");
        const decodedData = jwt.readToken(token);
        if (!decodedData) {
            const err = new Error("unauthorized - Your Login is Expired");
            throw err;
        }

        const userData = await db.getUserById(decodedData.id);
        if (!userData) {
            const err = new Error("unauthorized - Invalid Token");
            throw err;
        }

        socket.userData = userData;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = userAuthorize;

const chatActions = require("../database/message-actions.js");
const userActions = require("../database/user-actions.js");
const CustomError = require("../utils/custom-error.js");

const chatController = {
    getChat: async (req, res) => {
        const receiverEmail = req.params.userEmail;
        const receiverData = await userActions.getUserByUsername(receiverEmail);
        if (!receiverData) {
            throw new CustomError(404, "email not found");
        }
        const receiverId = receiverData._id;
        const senderId = req.userData._id;
        const messages = await chatActions.getMessages(receiverId, senderId);
        res.json({
            success: true,
            message: "messages retrieved successfully",
            data: messages,
        });
    },
};

module.exports = chatController;

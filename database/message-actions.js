const Message = require("../model/message.js");

const addMessage = async (doc) => {
    const createdMessage = await Message.create(doc);
    if (!createdMessage) {
        throw new Error("Failed to create message");
    }
    return createdMessage;
};

const getMessages = async (receiverId, senderId) => {
    const messages = await Message.find({
        $or: [
            {
                to: receiverId,
                from: senderId,
            },
            {
                from: receiverId,
                to: senderId,
            },
        ],
    })
        .sort("-_id")
        .populate([{ path: "file" }]);
    return messages;
};

module.exports = {
    addMessage,
    getMessages,
};

const Message = require("../model/message.js");

const addMessage = async (doc) => {
    const createdMessage = await Message.create(doc);
    if (!createdMessage) {
        throw new Error("Failed to create message");
    }
    return createdMessage;
};

const getMessages = async (receiverId, senderId, params) => {
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 50;

    const filter = {
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
    };
    const offset = (page - 1) * limit;
    const messageCount = await Message.countDocuments(filter);
    const messages = await Message.find(filter)
        .sort("-_id")
        .skip(offset)
        .limit(limit)
        .populate([{ path: "file" }]);
    return {
        messageCount: messageCount,
        page: page,
        limit: limit,
        messages: messages,
    };
};

module.exports = {
    addMessage,
    getMessages,
};

const errorHandler = async (err, socket) => {
    await socket.emit("error", {
        message: err.message,
    });
};

module.exports = errorHandler;

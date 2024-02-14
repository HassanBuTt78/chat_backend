const { app, server } = require("./app.js");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT;

const start = async () => {
    await mongoose.connect(process.env.DBURI);
    app.listen(PORT, () => {
        console.log(`HTTP server listening on ${PORT}`);
    });
    server.listen(parseInt(PORT) + 1, () => {
        console.log(`Socket.io is listening on ${parseInt(PORT) + 1}`);
    });
};
start();

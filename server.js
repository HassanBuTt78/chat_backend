const server = require("./app.js");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT;

const start = async () => {
    await mongoose.connect(process.env.DBURI);
    server.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`);
    });
};
start();

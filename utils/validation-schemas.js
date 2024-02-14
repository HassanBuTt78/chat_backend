const joi = require("joi");

const validationSchemas = {
    registor: joi.object({
        name: joi.string().max(20).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(30).required(),
    }),
    login: joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).max(30).required(),
    }),
};
module.exports = validationSchemas;

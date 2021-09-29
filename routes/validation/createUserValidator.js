const Joi = require('joi');

exports.createUserValidator = req => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required().max(4),
        isAdmin: Joi.boolean().required(),
    });

    return { error } = schema.validate(req);

}
const Joi = require('joi');

exports.loginValidator = req => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });
    return { error } = schema.validate(req);
}



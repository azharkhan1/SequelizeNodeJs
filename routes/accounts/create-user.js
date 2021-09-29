const { createUserValidator } = require('../validation/createUserValidator');
const { User } = require('../../app/models')
const bcrpyt = require('bcrypt-inzi');

exports.createUser = async (req, res) => {
    const { error } = createUserValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        where: {
            name: req.body.username
        }
    })
    if (user) return res.status(404).send({
        message: 'user already exists'
    })

    let hashPassword = await bcrpyt.stringToHash(req.body.password);

    user = User.build({
        name: req.body.username,
        password: hashPassword,
        isAdmin: req.body.isAdmin,
        online: false,
    });

    await user.save();

    res.json({
        message: 'user saved'
    })

}
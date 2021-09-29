

const jwt = require('jsonwebtoken');
const { User } = require('../../app/models')
const bcrypt = require('bcrypt-inzi');
const { loginValidator } = require('../validation/loginValidator');


exports.login = async (req, res) => {
    const { error } = loginValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({
        where: {
            name: req.body.username,
        },
        attributes: ['password', 'name']
    })
    if (!user) return res.status(403).json({
        message: 'username is wrong'
    })

    const isPasswordMatched = await bcrypt.varifyHash(req.body.password, user.dataValues.password);
    if (!isPasswordMatched) return res.status(403).send({
        message: 'password not matched'
    })


    const token = jwt.sign({ name: req.body.name }, 'whapport1234', { expiresIn: '30d' });
    return res.status(200).json({
        token,
    });
}


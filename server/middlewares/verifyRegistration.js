const db = require('../models')
const User = db.user

checkDuplicateUsernameOrEmail = (request, response, next) => {
    User.findOne({
        username: request.body.username
    }).exec((err, user) => {
        if (err) {
            return response.status(500).send({
                message: err
            })
        }

        if (user) {
            return response.status(400).send({
                message: 'duplicate username'
            })
        }

        User.findOne({
            email: request.body.email
        }).exec((err, email) => {
            if (err) {
                return response.status(500).send({
                    message: err
                })
            }
            if (email) {
                return response.status(400).send({
                    message: 'duplicate email'
                })
            }

            next()
        })
    })
}
const verifyRegistration = {
    checkDuplicateUsernameOrEmail,
};
module.exports = verifyRegistration;
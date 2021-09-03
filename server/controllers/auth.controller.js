const config = require('../config/auth.config')
const db = require('../models')
const User = db.user

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.register = (request, response) => {
    if (request.body.username && request.body.password && request.body.email) {
        const user = new User({
            username: request.body.username,
            email: request.body.email,
            password: bcrypt.hashSync(request.body.password, 8)
        })

        user.save((err, user) => {
            if (err) {
                return response.status(500).send({
                    message: err
                })
            }
            console.log(user)
        })

        response.status(200).send({
            message: 'registered successfully'
        })
    } else {
        return response.status(400).send({
            message: 'bad request'
        })
    }
}

exports.login = (request, response) => {
    User.findOne({
        username: request.body.username
    }).exec((err, user) => {
        if (err) {
            return response.status(500).send({
                message: err
            })
        }
        if (!user) {
            return response.status(400).send({
                message: 'user not found'
            })
        }
        const isPasswordValid = bcrypt.compareSync(
            request.body.password,
            user.password
        )
        if (!isPasswordValid) {
            return response.status(401).send({
                accessToken: null,
                message: 'invalid password'
            })
        }
        const token = jwt.sign({
            id: user.id
        }, config.secret, { expiresIn: 86400 })

        response.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token
        })
    })
}
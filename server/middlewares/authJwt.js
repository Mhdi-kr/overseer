const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db = require('../models')
const User = db.user

verifyToken = (request, response, next) => {
    let token = request.headers['x-access-token']
    
    if (!token) {
        return response.status(403).send({
            message: 'no token provided'
        })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return response.status(401).send({
                message: 'unauthorized'
            })
        }
        request.userId = decoded.id
        next()
    })
}

const authJwt = {
    verifyToken
}
module.exports = authJwt
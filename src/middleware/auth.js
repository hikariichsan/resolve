const { request, response } = require('express')
require('dotenv').config
const jwt = require('jsonwebtoken')

module.exports = {
    authorization: (request,response,next)=>{
        let token = request.headers.authorization
        if (token) {
            token = token.split(' ')[1]
            jwt.verify(token, process.env.JWT_KEY, (error, result)=>{
                if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError') ) {
                    response.status(403).send({
                        success: false,
                        message: error.message
                    })
                } else {
                    console.log(result);
                    request.token = result
                    next()
                }
            })
        }else{
            response.status(400).send({
                success: false,
                message: 'Please login first'
            })
        }
    },
    authorizationDev: (request,response,next)=>{
        let token = request.headers.authorization
        if (token) {
            token = token.split(' ')[1]
            jwt.verify(token, process.env.JWT_KEY, (error, result)=>{
                if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError') ) {
                    response.status(403).send({
                        success: false,
                        message: error.message
                    })
                } else {
                    console.log(result);
                    request.token = result
                    next()
                }
            })
        }else{
            response.status(400).send({
                success: false,
                message: 'Please login first'
            })
        }
    }
}
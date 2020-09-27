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
                    if (result.role === 1){
                    next()
                    }else {
                        response.status(403).send({
                            success: false,
                            message: 'You cant access'
                        })
                    }
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
                    if (result.role === 2 ){
                    next()
                    }else {
                        response.status(403).send({
                            success: false,
                            message: 'You cant access'
                        })
                    }
                }
            })
        }else{
            response.status(400).send({
                success: false,
                message: 'Please login first'
            })
        }
    },
    authAll: (request,response,next)=>{
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
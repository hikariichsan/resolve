const db = require('../helpers/db')
const {postRecruiterModel,checkRecruiterModel, getDataRecruiterModel, selectRecruiterModel, deleteRecruiterIDModel, putRecruiterModel, pathRecruiterModel} = require('../models/recruiter')
const bcrypt = require('bcryptjs')
const { request, response } = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    registerRecruiter: async (request,response)=>{
        const {name, email, company, position, password, no_hp}= request.body
        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(password, salt)
        const checkEmail = await checkDeveloperEmailModel(email)
        const setData =  {
            name,
            email,
            company,
            position,
            password : encryptPassword,
            no_hp,
            role:1,
            created_at: new Date()
        }
        try {
            if (name && email && password && no_hp && company) {
                if (password.length >= 6) {
                  if (checkEmail.length > 0) {
                    response.send({
                      success: false,
                      message: 'Email has been registered!'
                    })
                  } else {
                      const result = await  postRecruiterModel(setData)
                      response.send({
                        success: true,
                        message: 'Success Register User!',
                        data: result
                      })
                    }
            
                } else {
                  response.send({
                    success: false,
                    message: 'Password must containt at least 6 characters!'
                  })
                }
            
              } else {
                response.send({
                  success: false,
                  message: 'All field must be filled!'
                })
              }
            
            } catch (error) {
              response.send({
                success: false,
                message: 'Bad request!',
                print: console.log('Error = ' + error)
              })
            }
          },
    loginRecruiter : async (request, response)=>{
        try {
            const { email, password} = request.body
            const checkDataRecruiter = await checkRecruiterModel(email)
            if (email.trim() && password.trim()) {
            if (checkDataRecruiter.length > 0) {
                const checkPassword = bcrypt.compareSync(
                    password, 
                    checkDataRecruiter[0].password)
           if(checkPassword){
               const{id_recruiter,name,email,role,password} = checkDataRecruiter[0]
               let payload = {
                   id_recruiter,
                   name,
                   email,
                   role
               }
               const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn : '1h'})
               payload = { ...payload, token}
               response.send({
                   success: true,
                   message: 'Success Login!',
                   data: payload
               })
           }else{
            response.send({
                success: false,
                message: 'Wrong Password!'
            })
           }
            }else{
                response.send({
                    success: false,
                    message: 'Email/Account not Register'
                })
            }
        } else {
            response.send({
              success: false,
              message: 'All field must be filled!'
            })
          }
        } catch (error) {
            console.log(error)
            response.send({
                success: false,
                message: 'Bad Request!'
            })
        }
    },

    getDataRecruiter : async (req, res)=>{
        let {page, limit, search } = req.query
    
        let searchKey = ''
        let searchValue = ''
    
        if(typeof search == 'object'){
            searchKey = Object.keys(search)[0]
            searchValue = Object.value(search)[0]
        }else{
            searchKey = 'name'
            searchValue = search||''
        }
        if(!limit){
            limit = 10
        }else{
            limit = parseInt(limit)
        }
        if(!page){
            page = 1
        }else{
            page = parseInt(page)
        }
    
    const offset = (page-1)*limit
    try {
        const result = await getDataRecruiterModel(searchKey,searchValue,limit,offset)
        if(result.length){
            res.status(201).send({
                success:true,
                message:'List Recruiter',
                data: result
            })
        }else{
            res.send({
                success: true,
                message: 'There is no item list'
            })
        }

    } catch (error) {
        res.send({
            success: false,
            message: 'Bad Request'
        })
    }
    },
    deleteRecruiter : async (req,res)=>{
            const idRec = req.params.id
            try {
                const select = await selectRecruiterModel(idRec)
                if (select.length) {
                    const result = await deleteRecruiterIDModel(idRec)
                    if (result.affectedRows) {
                        res.send({
                            success:true,
                            message:`Recruiter ${idRec} has been deleted`,
                            data: result
                        })
                    } else {
                        res.send({
                            success: false,
                            message: 'Data filed to delete'
                        })
                    }
                    
                } else {
                    res.send({
                        success: false,
                        message: 'Not Found'
                    })
                    
                }
            } catch (error) {
                res.send({
                    success: false,
                    message: 'Bad Required'
                })
            }
          
        },
        putRecruiter : async (req,res)=>{
                const idRec = req.params.id
                const {name, email,company,position, password, no_hp} =req.body
                if (name.trim() && email.trim() && company.trim() && position.trim() && password.trim() && no_hp.trim()){
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                     try {
                         const select = await selectRecruiterModel(idRec)
                         if (select.length) {
                             const result = await putRecruiterModel(idRec,data)
                             if (result.affectedRows) {
                                res.send({
                                    success: true,
                                    message: `Recruiter with id ${idRec} has been Update`
                                })
                             } else {
                                res.send({
                                    success: true,
                                    message: `Failed Update`
                                })
                             }
                         } else {
                            res.send({
                                success: true,
                                message: `Not Found`
                            })
                         }
                         
                     } catch (error) {
                        res.send({
                            success: false,
                            message: 'Bad Required'
                            })
                     }
         
            }else{
                res.send({
                    success: false,
                    message: 'All field must be filled'
                    })
                    }
            },
            patchRecruiter : async (req,res)=>{
                    const idRec  = req.params.id
                    const {name ='', email='', company='',position='',password='',no_hp=''} = req.body
                if (name.trim() || email.trim() || company.trim() || position.trim() || password.trim() || no_hp.trim() ) {
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        try {
                            const select = await selectRecruiterModel(idRec)
                            if (select.length) {
                                const result = await pathRecruiterModel(data, idRec)
                                if (result.affectedRows) {
                                    res.send({
                                        success: true,
                                        message: `Recruiter with id ${idRec} has been Update`
                                    })
                                } else {
                                    res.send({
                                        success: true,
                                        message: `Failed Update`
                                    })
                                }
                                
                            } else {
                                res.send({
                                    success: true,
                                    message: `Not Found`
                                })
                            }
                        } catch (error) {
                      
                            res.send({
                                success: false,
                                message: 'Bad Required'
                                })
                        }
                    }else{
                    res.send({
                        success: false,
                        message: 'All field must be filled'
                        })
                    }
                }
                        
                
               
}
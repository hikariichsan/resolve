const db = require('../helpers/db')
const {postDeveloperModel,checkDeveloperModel, getDataDeveloperModel, selectDeveloperModel, deleteDeveloperIDModel, putDeveloperModel, pathDeveloperModel} = require('../models/developer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    registerDeveloper : async (request,response)=>{
        const {name, email, password, no_hp}= request.body
        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(password, salt)
        const setData =  {
            name,
            email,
            password : encryptPassword,
            no_hp,
            role: 2,
            created_at: new Date()
        }
        try {
            const result = await postDeveloperModel(setData)
            if(result == undefined){
                response.send({
                success: true,
                message: 'Email Registered'})
            }else{
            response.send({
                success: true,
                message: 'Success Register Developer!',
                data: result
            })
        }
        } catch (error) {
            console.log(error)
                response.status(400).send({
                success: false,
                message: 'Bad Request!'
            })
            
             
        }
    },
    loginDeveloper : async (request, response)=>{
        try {
            const { email, password} = request.body
            const checkDataDeveloper = await checkDeveloperModel(email)
            if (checkDataDeveloper.length >= 1) {
                const checkPassword = bcrypt.compareSync(
                    password, 
                    checkDataDeveloper[0].password)
           if(checkPassword){
               const{id_dev,name,role,email,password} = checkDataDeveloper[0]
               let payload = {
                   id_dev,
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
            response.status(400).send({
                success: false,
                message: 'Wrong Password!'
            })
           }
            }else{
                response.status(400).send({
                    success: false,
                    message: 'Email/Account not Register'
                })
            }
        } catch (error) {
            console.log(error)
            response.status(400).send({
                success: false,
                message: 'Bad Request!'
            })
        }
    },
    getDataDeveloper : async (req, res)=>{
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
        const result = await getDataDeveloperModel(searchKey,searchValue,limit,offset)
        if (result.length) {
            res.status(201).send({
                success:true,
                message:'List Developer',
                data: result
            })
        } else {
            res.send({
                success: true,
                message: 'There is no item list'
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: 'Bad required'
        })
    }  
   
    },
    deleteDeveloper : async (req,res)=>{
            const idDev = req.params.id
            try {
                const select = await selectDeveloperModel(idDev)
                if (select.length) {
                    const result = await deleteDeveloperIDModel(idDev)
                    if (result.affectedRows) {
                        res.send({
                            success:true,
                            message:`developer ${idDev} has been deleted`,
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
                        success:false,
                        message:'Data not Found'
                    })
                }
            } catch (error) {
                res.send({
                    success:false,
                    message:'Bad Required'
                })
            }
        },
        putDeveloper : async(req,res)=>{
                const idDev = req.params.id
                const {name, email, password, no_hp} =req.body
                if (name.trim() && email.trim() && password.trim() && no_hp.trim()){
                    try {
                        const select = await selectDeveloperModel(idDev)
                        if (select.length) {
                            const result = await putDeveloperModel (idDev,[ name, email, password, no_hp] )
                        if (result.affectedRows) {
                            res.send({
                                success: true,
                                message: `Developer with id ${idDev} has been created`,
                            })
                        } else {
                            res.send({
                                success: false,
                                message: 'Failed to Update'
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
                            message: 'Bad required'
                            })
                    }
            }else{
                res.send({
                    success: false,
                    message: 'Field must be filled'
                        })
                    }
            },
            patchDeveloper : async (req,res)=>{
                    const idDev  = req.params.id
                    const {name ='', email='',password='',no_hp=''} = req.body
                if (name.trim() || email.trim() || password.trim() || no_hp.trim() ) {
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })

                        try {
                            const select = await selectDeveloperModel(idDev)
                            if (select.length) {
                                const result = await pathDeveloperModel(idDev,data)
                                if (result.affectedRows) {
                                    res.send({
                                        success: true,
                                        message: `Project with id ${idDev} has been updated`,
                                    })
                                } else {
                                    res.send({
                                        success: false,
                                        message: 'filed to updated'
                                    })
                                }
                            } else {
                                res.send({
                                    success: false,
                                    message: 'Not found'
                                })
                            }
                        } catch (error) {
                            res.send({
                                success: false,
                                message: 'Bad required'
                            })
                        }
                     
                    }else{
                    res.send({
                        success: false,
                        message: 'Field must be filled'
                    })
                    }
                }
                
               
}
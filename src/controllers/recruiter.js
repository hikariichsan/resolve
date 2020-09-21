const db = require('../helpers/db')
const {createRecruiterModel, getDataRecruiterModel, selectRecruiterModel, deleteRecruiterIDModel, putRecruiterModel, pathRecruiterModel} = require('../models/recruiter')

module.exports = {
    createDataRecruiter : (req, res) => {
        const {name, email, company, position, password, no_hp,} = req.body
        if (name && email && company && position && password && no_hp){
            createRecruiterModel([name, email,company, position, password,no_hp], result=>{
                console.log(result);
res.status(201).send({
    success:true,
    message: 'Recruiter has been created',
    data: req.body
})
            })
        }else{
            res.status(500).send({
                success:false,
                message: 'All field must be filled'
            })
        }

        
    },
    getDataRecruiter : (req, res)=>{
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

    getDataRecruiterModel(searchKey,searchValue,limit,offset, result => {
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
    })
    
   
    },
    deleteRecruiter : (req,res)=>{
            const idRec = req.params.id
            selectRecruiterModel(idRec, result =>{
            if (result.length){
                deleteRecruiterIDModel(idRec, result=>{
                    if (result.affectedRows){
                        res.send({
                            success:true,
                            message:`Recruiter ${idRec} has been deleted`,
                            data: result
                        })
                    }else{
                        res.send({
                            success: false,
                            message: 'Data filed to delete'
                        })
                    }
                })
            }else{
                res.send({
                    success:false,
                    message:'Data not Found'    
                })
            }
            })
        },
        putRecruiter :(req,res)=>{
                const idRec = req.params.id
                const {name, email,company,position, password, no_hp} =req.body
                if (name.trim() && email.trim() && company.trim() && position.trim() && password.trim() && no_hp.trim()){
                    selectRecruiterModel(idRec, result=>{
                    if (result.length){
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        console.log(data)
               putRecruiterModel (idRec,data, result =>{
                   console.log(result);
                            if(result.affectedRows){
                                res.send({
                                    success: true,
                                    message: `Recruiter with id ${idRec} has been created`,
                                })
                                }else{
                                res.send({
                                    success: false,
                                    message: 'All field must be filled'
                                    })
                                }
                })
            }else{
                    res.send({
                        success: false,
                        message: 'Recruiter not found'
                        })
                    }
                })
            }else{
                res.send({
                    success: false,
                    message: 'Not Found'
                        })
                    }
            },
            patchRecruiter : (req,res)=>{
                    const idRec  = req.params.id
                    const {name ='', email='', company='',position='',password='',no_hp=''} = req.body
                if (name.trim() || email.trim() || company.trim() || position.trim() || password.trim() || no_hp.trim() ) {
                    selectRecruiterModel(idRec, result=>{
                if (result.length){
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        console.log(data);
                       pathRecruiterModel(idRec,data,result=>{
                            console.log(result);
                    if (result.affectedRows){
                        res.send({
                            success: true,
                            message: `Recruiter with id ${idRec} has been updated`,
                        })
                    }else{
                        res.send({
                            success: false,
                            message: 'filed updated'
                        })
                    }
                        })  
                  } else{
                    res.send({
                        success: false,
                        message: 'Recruiter not found'
                        })
                    }
                })
                    }else{
                    res.send({
                        success: false,
                        message: 'erorr'
                    })
                    }
                }
                
               
}
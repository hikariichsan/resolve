const db = require('../helpers/db')
const {createDeveloperModel, getDataDeveloperModel, selectDeveloperModel, deleteDeveloperIDModel, putDeveloperModel, pathDeveloperModel} = require('../models/developer')

module.exports = {
    createDataDeveloper : (req, res) => {
        const {name, email, password, no_hp} = req.body
        if (name && email && password && no_hp){
            createDeveloperModel([name, email,password,no_hp], result=>{
                console.log(result);
res.status(201).send({
    success:true,
    message: 'Developer has been created',
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
    getDataDeveloper : (req, res)=>{
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

    getDataDeveloperModel(searchKey,searchValue,limit,offset, result => {
        if(result.length){
                        res.status(201).send({
                            success:true,
                            message:'List Developer',
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
    deleteDeveloper : (req,res)=>{
            const idDev = req.params.id
            selectDeveloperModel(idDev, result =>{
            if (result.length){
                deleteDeveloperIDModel(idDev, result=>{
                    if (result.affectedRows){
                        res.send({
                            success:true,
                            message:`developer ${idDev} has been deleted`,
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
        putDeveloper :(req,res)=>{
                const idDev = req.params.id
                const {name, email, password, no_hp} =req.body
                if (name.trim() && email.trim() && password.trim() && no_hp.trim()){
               putDeveloperModel (idDev, name, email, password, no_hp, result=>{
                    console.log(result);
                            if(result.affectedRows){
                                res.send({
                                    success: true,
                                    message: `Developer with id ${idDev} has been created`,
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
                    message: 'semaua harus di isi mas'
                        })
                    }
            },
            patchDeveloper : (req,res)=>{
                    const idDev  = req.params.id
                    const {name ='', email='',password='',no_hp=''} = req.body
                if (name.trim() || email.trim() || password.trim() || no_hp.trim() ) {
                    selectDeveloperModel(idDev, result=>{
                if (result.length){
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        console.log(data);
                       pathDeveloperModel(idDev,data,result=>{
                            console.log(result);
                    if (result.affectedRows){
                        res.send({
                            success: true,
                            message: `Project with id ${idDev} has been updated`,
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
                        message: 'project not found'
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
const db = require('../helpers/db')
const {createexpModel, getexpModel, selectexpModel, deleteexpIDModel, putexpModel, patchexpModel} = require('../models/exp')

module.exports = {
    createexp : (req, res) => {
        const {name_company,position,description,start,end, id_bio_dev} = req.body
        if (name_company && position && description && start && end &&  id_bio_dev){
            createexpModel([name_company,position,description,start,end, id_bio_dev], result=>{
                console.log(result);
res.status(201).send({
    success:true,
    message: 'exp has been created',
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
    getexp : (req, res)=>{
        let {page, limit, search } = req.query
    
        let searchKey = ''
        let searchValue = ''
    
        if(typeof search == 'object'){
            searchKey = Object.keys(search)[0]
            searchValue = Object.value(search)[0]
        }else{
            searchKey = 'name_company'
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

    getexpModel(searchKey,searchValue,limit,offset, result => {
        if(result.length){
                        res.status(201).send({
                            success:true,
                            message:'List exp',
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
    deleteexp : (req,res)=>{
            const idexp = req.params.id
            selectexpModel(idexp, result =>{
            if (result.length){
                deleteexpIDModel(idexp, result=>{
                    if (result.affectedRows){
                        res.send({
                            success:true,
                            message:`exp ${idexp} has been deleted`,
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
        putexp :(req,res)=>{
                const idexp = req.params.id
                const {name_company,position,description,start,end, id_bio_dev} =req.body
                if (name_company.trim() &&position.trim() &&description.trim() &&start.trim() &&end.trim() && id_bio_dev.trim()){
                    selectexpModel(idexp, result=>{
                    if (result.length){
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        console.log(data);
               putexpModel (idexp,data, result =>{
                    console.log(result);
                            if(result.affectedRows){
                                res.send({
                                    success: true,
                                    message: `exp with id ${idexp} has been Update`,
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
                        message: 'exp not found'
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
            patchexp : (req,res)=>{
                    const idexp = req.params.id
                    const {name_company='',position='',description='',start='',end='', id_bio_dev=''} = req.body
                if (name_company.trim()|| position.trim()|| description.trim()|| start.trim()|| end.trim()||  id_bio_dev.trim()) {
                    selectexpModel(idexp, result=>{
                if (result.length){
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        console.log(data);
                       patchexpModel(idexp,data,result=>{
                            console.log(result);
                    if (result.affectedRows){
                        res.send({
                            success: true,
                            message: `exp with id ${idexp} has been updated`,
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
                        message: 'exp not found'
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
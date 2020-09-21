const db = require('../helpers/db')
const {createPortModel, getPortModel, selectPortModel, deletePortModel, putPortModel, patchPortModel} = require('../models/port')

module.exports = {
    createport : (req, res) => {
        const {name_app, description, link_repo, link_publish, workplace_related, base_type, photo, id_bio_dev} = req.body
        if (name_app && description && link_repo && link_publish && workplace_related && base_type && photo && id_bio_dev ){
            createPortModel([name_app, description, link_repo, link_publish, workplace_related, base_type, photo, id_bio_dev], result=>{
                console.log(result);
res.status(201).send({
    success:true,
    message: 'Portfolio has been created',
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
    getport : (req, res)=>{
        let {page, limit, search } = req.query
    
        let searchKey = ''
        let searchValue = ''
    
        if(typeof search == 'object'){
            searchKey = Object.keys(search)[0]
            searchValue = Object.value(search)[0]
        }else{
            searchKey = 'name_app'
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

    getPortModel(searchKey,searchValue,limit,offset, result => {
        if(result.length){
                        res.status(201).send({
                            success:true,
                            message:'List Portfolio',
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
    deleteport : (req,res)=>{
            const idPort = req.params.id
            selectPortModel(idPort, result =>{
            if (result.length){
                deletePortModel(idPort, result=>{
                    if (result.affectedRows){
                        res.send({
                            success:true,
                            message:`Portfolio ${idPort} has been deleted`,
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
        putport :(req,res)=>{
                const idPort = req.params.id
                const {name_app, description, link_repo, link_publish, workplace_related, base_type, photo, id_bio_dev} =req.body
                if (name_app.trim() && description.trim() && link_repo.trim() && link_publish.trim() && workplace_related.trim() && base_type.trim() && photo.trim() && id_bio_dev.trim()){
                    selectPortModel(idPort, result=>{
                    if (result.length){
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        console.log(data);
               putPortModel (idPort,data, result =>{
                    console.log(result);
                            if(result.affectedRows){
                                res.send({
                                    success: true,
                                    message: `Portfolio with id ${idPort} has been Update`,
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
                        message: 'Portfolio not found'
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
            patchport : (req,res)=>{
                    const idSkill = req.params.id
                    const {name_app='', description='', link_repo='', link_publish='', workplace_related='', base_type='', photo='', id_bio_dev=''} = req.body
                if (name_app.trim() || description.trim() || link_repo.trim() || link_publish.trim() || workplace_related.trim() || base_type.trim() || photo.trim() || id_bio_dev.trim()) {
                    selectPortModel(idSkill, result=>{
                if (result.length){
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        console.log(data);
                       patchPortModel(idSkill,data,result=>{
                            console.log(result);
                    if (result.affectedRows){
                        res.send({
                            success: true,
                            message: `Skill with id ${idSkill} has been updated`,
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
                        message: 'Skill not found'
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
const db = require('../helpers/db')
const {createProdevModel, getProdevModel, selectProdevModel, deleteProdevModel, putProdevModel, patchProdevModel} = require('../models/prodev')

module.exports = {
    createProdev : (req, res) => {
        const {name_detail, project_job, location, price, message, id_project, id_dev, sts_confirm, confirm_date, description} = req.body
        if (name_detail && project_job && location && price && message && id_project && id_dev && sts_confirm && confirm_date && description){
            createProdevModel([name_detail, project_job, location, price, message, id_project, id_dev, sts_confirm, confirm_date,description], result=>{
                console.log(result);
res.status(201).send({
    success:true,
    message: 'Project to Developer has been created',
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
    getProdev : (req, res)=>{
        let {page, limit, search } = req.query
    
        let searchKey = ''
        let searchValue = ''
    
        if(typeof search == 'object'){
            searchKey = Object.keys(search)[0]
            searchValue = Object.value(search)[0]
        }else{
            searchKey = 'name_detail'
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

    getProdevModel(searchKey,searchValue,limit,offset, result => {
        if(result.length){
                        res.status(201).send({
                            success:true,
                            message:'List Project to Developer',
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
    deleteProdev : (req,res)=>{
            const idProdev = req.params.id
            selectProdevModel(idProdev, result =>{
            if (result.length){
                deleteProdevModel(idProdev, result=>{
                    if (result.affectedRows){
                        res.send({
                            success:true,
                            message:`Project to Developer ${idProdev} has been deleted`,
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
        putProdev :(req,res)=>{
                const idProdev = req.params.id
                const {name_detail, project_job, location, price, message, id_project, id_dev, sts_confirm, confirm_date, description} =req.body
                if (name_detail.trim() && project_job.trim() && location.trim() && price.trim() && message.trim() && id_project.trim() && id_dev.trim() && sts_confirm.trim() && confirm_date.trim() && description.trim()){
                    selectProdevModel(idProdev, result=>{
                    if (result.length){
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        console.log(data);
               putProdevModel (idProdev,data, result =>{
                    console.log(result);
                            if(result.affectedRows){
                                res.send({
                                    success: true,
                                    message: `Project to Developer with id ${idProdev} has been Update`,
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
                        message: 'Project to Developer not found'
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
            patchProdev : (req,res)=>{
                    const idProdev = req.params.id
                    const {name_detail='', project_job='', location='', price='', message='', id_project='', id_dev='', sts_confirm='', confirm_date='', description=''} = req.body
                if (name_detail.trim() || project_job.trim() || location.trim() || price.trim() || message.trim() || id_project.trim() || id_dev.trim() || sts_confirm.trim() || confirm_date.trim() || description.trim()) {
                    selectProdevModel(idProdev, result=>{
                if (result.length){
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        console.log(data);
                       patchProdevModel(idProdev,data,result=>{
                            console.log(result);
                    if (result.affectedRows){
                        res.send({
                            success: true,
                            message: `Prodev with id ${idProdev} has been updated`,
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
                        message: 'Prodev not found'
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
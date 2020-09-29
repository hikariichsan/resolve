const db = require('../helpers/db')
const {createProdevModel, getProdevModel, selectProdevModel, deleteProdevModel, putProdevModel, patchProdevModel} = require('../models/prodev')

module.exports = {
    createProdev : async (req, res) => {
        const {name_detail, project_job, location, price, message, id_project, id_dev, sts_confirm, confirm_date, description} = req.body
        if (name_detail && project_job && location && price && message && id_project && id_dev && sts_confirm && confirm_date && description){
            try {
               await  createProdevModel([name_detail, project_job, location, price, message, id_project, id_dev, sts_confirm, confirm_date,description])

                    res.status(201).send({
                        success:true,
                        message: 'Project to Developer has been created',
                        data: req.body
                    })
                
            } catch (error) {
                res.send({
                    success:true,
                    message: 'Bad required'
                })
            }

        }else{
            res.status(500).send({
                success:false,
                message: 'All field must be filled'
            })
        }

        
    },
    getProdev : async(req, res)=>{
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

    try {
        const result = await getProdevModel(searchKey,searchValue,limit,offset)
        if (result.length) {
            res.status(201).send({
                success:true,
                message:'List Project to Developer',
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
    deleteProdev : async (req,res)=>{
            const idProdev = req.params.id
            try {
                const select = await selectProdevModel(idProdev)
                if (select.length) {
                    const result = await deleteProdevModel(idProdev)
                    if (result.affectedRows) {
                        res.send({
                            success:true,
                            message:`Project to Developer ${idProdev} has been deleted`,
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
        putProdev : async (req,res)=>{
                const idProdev = req.params.id
                const {name_detail, project_job, location, price, message, id_project, id_dev, sts_confirm, confirm_date, description} =req.body
                if (name_detail.trim() && project_job.trim() && location.trim() && price.trim() && message.trim() && id_project.trim() && id_dev.trim() && sts_confirm.trim() && confirm_date.trim() && description.trim()){
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        try {
                            const select= await selectProdevModel (idProdev)
                            if (select.length) {
                                const result = await putProdevModel (idProdev,data)
                                if (result.affectedRows) {
                                    res.send({
                                        success: true,
                                        message: `Project to Developer with id ${idProdev} has been Update`,
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
                                    message: 'Project to Developer not found'
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
            patchProdev : async (req,res)=>{
                    const idProdev = req.params.id
                    const {name_detail='', project_job='', location='', price='', message='', id_project='', id_dev='', sts_confirm='', confirm_date='', description=''} = req.body
                if (name_detail.trim() || project_job.trim() || location.trim() || price.trim() || message.trim() || id_project.trim() || id_dev.trim() || sts_confirm.trim() || confirm_date.trim() || description.trim()) {

                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        try {
                            const select = await selectProdevModel(idProdev)
                            if (select.length) {
                                const result = await patchProdevModel(data,idProdev)
                                if (result.affectedRows) {
                                    res.send({
                                        success: true,
                                        message: `Prodev with id ${idProdev} has been updated`,
                                    })
                                } else {
                                    res.send({
                                        success: false,
                                        message: 'filed updated'
                                    })
                                }
                            } else {
                                res.send({
                                    success: false,
                                    message: 'Prodev not found'
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
                        message: 'field must be filled'
                    })
                    }
                }
                
               
}
const db = require('../helpers/db')
const {createProjectModel, getProjectModel, selectProjectModel, deleteProjectIDModel, putProjectModel, patchProjectModel} = require('../models/project')

module.exports = {
    createProject : async (req, res) => {
        try {
            const {name_project , location , description, deadline_month, id_recruiter} = req.body
       const setData = {
           name_project,
           location,
           description,
           deadline_month,
           id_recruiter,
           image: req.file === undefined ? '' : req.file.filename
       }
       const resultCreate = await createProjectModel(setData)
       res.status(200).send({
           success: true,
           message:'Product Created',
           data: setData
       })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: 'Bad Request'
            })
            
        }
        

        
    },
    getProject : (req, res)=>{
        let {page, limit, search } = req.query
    
        let searchKey = ''
        let searchValue = ''
    
        if(typeof search == 'object'){
            searchKey = Object.keys(search)[0]
            searchValue = Object.value(search)[0]
        }else{
            searchKey = 'name_project'
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

    getProjectModel(searchKey,searchValue,limit,offset, result => {
        if(result.length){
                        res.status(201).send({
                            success:true,
                            message:'List Project',
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
    deleteProject : (req,res)=>{
            const idProject = req.params.id
            selectProjectModel(idProject, result =>{
            if (result.length){
                deleteProjectIDModel(idProject, result=>{
                    if (result.affectedRows){
                        res.send({
                            success:true,
                            message:`Project ${idProject} has been deleted`,
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
        putProject :(req,res)=>{
                const idProject = req.params.id
                const {name_project, location, description, deadline_month, image, id_recruiter} =req.body
                if (name_project.trim() && location.trim() && description.trim() && deadline_month.trim() && image.trim() && id_recruiter.trim()){
                    selectProjectModel(idProject, result=>{
                    if (result.length){
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        console.log(data);
               putProjectModel (idProject,data, result =>{
                    console.log(result);
                            if(result.affectedRows){
                                res.send({
                                    success: true,
                                    message: `Project with id ${idProject} has been Update`,
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
                        message: 'Project not found'
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
            patchProject : (req,res)=>{
                    const idProject = req.params.id
                    const {name_project='', location='', description='', deadline_month='', image='', id_recruiter=''} = req.body
                if (name_project.trim() || location.trim() || description.trim() || deadline_month.trim() || image.trim() || id_recruiter.trim()) {
                    selectProjectModel(idProject, result=>{
                if (result.length){
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        console.log(data);
                       patchProjectModel(idProject,data,result=>{
                            console.log(result);
                    if (result.affectedRows){
                        res.send({
                            success: true,
                            message: `Project with id ${idProject} has been updated`,
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
                        message: 'Project not found'
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
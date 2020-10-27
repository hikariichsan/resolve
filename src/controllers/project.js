const db = require('../helpers/db')
const {createProjectModel, getProjectModel,getProjectByIdModel,selectProjectModel, deleteProjectIDModel, putProjectModel, patchProjectModel} = require('../models/project')

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
    getProject : async (req, res)=>{
        let {page, limit, search } = req.query
    
        let searchKey = ''
        let searchValue = ''
    
        if(typeof search == 'object'){
            searchKey = Object.keys(search)[0]
            searchValue = Object.values(search)[0]
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
    
    const offset = (page - 1)*limit
        try {
            const result = await getProjectModel(searchKey,searchValue,limit,offset)
            if(result.length){
                res.status(201).send({
                    success:true,
                    messages:'List Project',
                    data: result
                })
            }else {
                res.send({
                    success: true,
                    messages: 'There is no Portfolio on list'
                  })
            }
        } catch (error) {
            res.send({
                success: false,
                message : 'Bad Required!!'
            })
        }
    
   
    },

    getIDProject: async (req, res) => {    
        const idProject = req.params.id
        try{
            const select = await getProjectByIdModel(idProject)
            if (select.length) { 
                    res.send({
                        success:true,
                        message:`Project ${idProject} `,
                        data: select
                    })
            } else {
                res.send({
                    success:false,
                    message:'Data not Found'
                })
            }
        } catch (error) {
            console.log(error);
            res.send({
                success:false,
                message:'Bad required'
               
            })
        }
      },


    deleteProject : async (req,res)=>{
            const idProject = req.params.id
            try {
                    const result = await deleteProjectIDModel(idProject)
                    if (result.affectedRows) {
                        res.send({
                            success:true,
                            message:`Project  ${idProject} has been deleted`,
                            data: result
                        })
                    } else {
                        res.send({
                            success: false,
                            message: 'Data filed to delete'
                        })
                    }
                
            } catch (error) {
                res.send({
                    success:false,
                    message:'Bad Required'
                })
            }
           
        },
        putProject : async (req,res)=>{
                const idProject = req.params.id
                const {name_project, location, description, deadline_month, id_recruiter} =req.body
                const image = req.file === undefined ? '' : req.file.filename
                if (name_project.trim() && location.trim() && description.trim() && deadline_month.trim() && image.trim() && id_recruiter.trim()){
                    const setData = {
                        ...req.body,
                        image
                    }
                        const data = Object.entries(setData).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                      try {
                          const select = await selectProjectModel(idProject)
                          if (select.length) {
                              const result = await putProjectModel(idProject,data)
                              if (result.affectedRows) {
                                res.send({
                                    success: true,
                                    message: `Project with id ${idProject} has been Update`,
                                })
                              } else {
                                res.send({
                                    success: false,
                                    message: `Project failed to Update`,
                                })
                              }
                          } else {
                            res.send({
                                success: false,
                                message: 'Project not found'
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
                    message: 'All fields must be filled'
                        })
                    }
            },
            patchProject : async (req,res)=>{
                    const idProject = req.params.id
                    const {name_project='', location='', description='', deadline_month='', id_recruiter=''} = req.body
                    const image = req.file === undefined ? '' : req.file.filename
                if (name_project.trim() || location.trim() || description.trim() || deadline_month.trim() || image.trim() || id_recruiter.trim()) {
                    const setData = {
                        ...req.body,
                        image
                    }
                        const data = Object.entries(setData).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        
                        try {
                            const select = await selectProjectModel(idProject)
                            if (select.length) {
                                const result = await patchProjectModel(idProject,data)
                                if (result.affectedRows) {
                                  res.send({
                                      success: true,
                                      message: `Project with id ${idProject} has been Update`,
                                  })
                                } else {
                                  res.send({
                                      success: false,
                                      message: `Project failed to Update`,
                                  })
                                }
                            } else {
                              res.send({
                                  success: false,
                                  message: 'Project not found'
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
                      message: 'field must be filled'
                          })
                      }
              }
                
               
}

const db = require('../helpers/db')
const {createPortModel, getPortModel, selectPortModel, deletePortModel, putPortModel, patchPortModel} = require('../models/port')

module.exports = {
    createport : async (req, res) => {
        try{
        const {name_app, description, link_repo, link_publish, workplace_related, base_type, id_bio_dev} = req.body
        const setData = {
            name_app,
            description,
            link_repo,
            link_publish,
            workplace_related,
            base_type,
            id_bio_dev,
            image: req.file === undefined ? '' : req.file.filename
        
        }
            const resultCreate = await createPortModel(setData)
       res.status(200).send({
           success: true,
           message:'Portfolio Created',
           data: setData
       })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: 'Bad Request'
            })
            
        }

        
    },
    getport : async (req, res)=>{
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
        try {
            const result = await getPortModel(searchKey,searchValue,limit,offset)
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
        } catch (error) {
            res.send({
                success: false,
                message: 'Bad Required'
            })
        }
        
    },
    deleteport : async (req, res) => {
        const { idPort } = req.params
        try {
          const select = await selectPortModel(idPort)
          if (select.length) {
            const result = await deletePortModel(idPort)
            if (result.affectedRows) {
              res.send({
                success: true,
                message: `Portfolio with id ${idPort} has been deleted`
              })
            } else {
              res.send({
                success: false,
                message: 'Failed delete portfolio'
              })
            }
          } else {
            res.send({
              success: false,
              message: `Portofolio with id ${idPort} not found`
            })
          }
        } catch (err) {
          res.send({
            success: false,
            message: 'Bad Request!'
          })
        }
      },
        putport : async(req,res)=>{
                const idPort = req.params.id
                const {name_app, description, link_repo, link_publish, workplace_related, base_type, id_bio_dev} =req.body
                const image = req.file === undefined ? '' : req.file.filename
                if (name_app.trim() && description.trim() && link_repo.trim() && link_publish.trim() && workplace_related.trim() && base_type.trim() && image.trim() && id_bio_dev.trim()){
                    try {
                        const select = await selectPortModel(idPort)
                        if (select.length){
                            const result = await putPortModel([name_app, description, link_repo, link_publish, workplace_related,id_bio_dev,base_type,image], idPort)
                            if (result.affectedRows) {
                                res.send({
                                  success: true,
                                  messages: `Portfolio with id ${idPort} Has Been Updated`
                                })
                              } else {
                                res.send({
                                  success: false,
                                  messages: 'Update portfolio failed'
                                })
                              }
                            } else {
                              res.send({
                                success: false,
                                message: `Portfolio with id ${idPort} not found`
                              })
                            }
                    } catch (error) {
                        res.send({
                            success: false,
                            messages: 'Bad request'
                          })
                        }
                      } else {
                        res.send({
                          success: false,
                          messages: 'Field must be filled'
                        })
                      }
                    },
            patchport : async(req,res)=>{
                    const idPort = req.params.id
                    const {name_app='', description='', link_repo='', link_publish='', workplace_related='', base_type='', id_bio_dev=''} = req.body
                if (name_app.trim() || description.trim() || link_repo.trim() || link_publish.trim() || workplace_related.trim() || base_type.trim()  || id_bio_dev.trim() || image.trim()) {
                    const setData = {
                        name_app,
                        description,
                        link_repo,
                        link_publish,
                        workplace_related,
                        id_bio_dev,
                        base_type,
                        image: req.file === undefined ? '' : req.file.filename
                      }
                      const data = Object.entries(setData).map(item => {
                        return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
                      })
                
                      try {
                        const select = await selectPortfolioModel(idPort)
                        if (select.length) {
                          const result = await updatePatchPortfolioModel(data, idPort)
                          if (result.affectedRows) {
                            res.send({
                              success: true,
                              message: `Portfolio With id ${idPort} has been Updated`
                            })
                          } else {
                            res.send({
                              success: false,
                              messages: 'Failed to Update'
                            })
                          }
                        } else {
                          res.send({
                            success: false,
                            message: `Portfolio with id ${idPort} not found`
                          })
                        }
                      } catch (err) {
                        res.send({
                          success: false,
                          message: 'Bad Request!'
                        })
                      }
                    } else {
                      res.send({
                        success: false,
                        message: 'Field must be filled'
                      })
                    }
                  }
}
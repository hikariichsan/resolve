const db = require('../helpers/db')
const {createBioDevModel,getBioDevByIDModel, getBioDevModel, selectBioDevModel, deleteBioDevIDModel, putBioDevModel, pathBioDevModel} = require('../models/biodev')

module.exports = {
    createBioDev : async (req, res) => {
        try{
        const {id_dev,name, status_job,job_desk, city, work_place,description} = req.body
        const setData = {
            name,
            id_dev,
            status_job,
            job_desk,
            city,
            work_place,
            description,
            image: req.file === undefined ? '' : req.file.filename
        
        }
                const resultCreate = await createBioDevModel(setData)
                res.status(200).send({
                    success: true,
                    message:'Bio Developer Created',
                    data: setData
                })
                 } catch (error) {
                     res.status(500).send({
                         success: false,
                         message: 'Bad Request'
                     })
                     
                 }
        
    },
    getBioDev : async (req, res)=>{
        let {page,order,sort, limit, search } = req.query
    
        let searchKey = ''
        let searchValue = ''
    
        if(typeof search == 'object'){
            searchKey = Object.keys(search)[0]
            searchValue = Object.values(search)[0]
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
            const result = await  getBioDevModel(searchKey,order,sort,searchValue,limit,offset)
            if (result.length) {
              res.status(201).send({
                  success:true,
                  message:'List bio Developer',
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
    getBioDevByID : async (req,res)=>{
        const {id} = req.params
        try {
            const result = await getBioDevByIDModel(id)
            if (result.length) {
                res.send({
                    success: true,
                    message:`data Bio id ${id}`,
                    data: result[0]
                })
            } else {
                res.send({
                    success:false,
                    message: `data Bio ${id} not found`
                })
            }
        } catch (error) {
            res.send({
                success:false,
                message: `Bad Required`
            })
        }
       
    },
    deleteBioDev : async (req,res)=>{
            const idBioDev = req.params.id
            try {
                const select = await selectBioDevModel(idBioDev)
                if (select.length) {
                    const result = await deleteBioDevIDModel(idBioDev)
                    if (result.affectedRows) {
                        res.send({
                            success:true,
                            message:`Developer bio ${idBioDev} has been deleted`,
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
                    message:'Bad required'
                })
            }
           
        },
        putBioDev : async (req,res)=>{
                const idBioDev = req.params.id
                const {name, status_job,job_desk, city, work_place,description} =req.body
                    const image = req.file === undefined ? '' : req.file.filename
                if (name.trim() && status_job.trim() && job_desk.trim() && image.trim() && city.trim() && work_place.trim() && description.trim()){
                    const setData = {
                        ...req.body,
                        image
                    
                    }
                        const data = Object.entries(setData).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        try {
                            const select = await selectBioDevModel(idBioDev)
                            if (select.length) {
                                const result = await putBioDevModel(idBioDev,data)
                                if (result.affectedRows) {
                                    res.send({
                                        success: true,
                                        message: `Developer Bio with id ${idBioDev} has been Update All`,
                                    })
                                } else {
                                    res.send({
                                        success: false,
                                        message: `Failed to Update`,
                                    })
                                }
                            } else {
                                res.send({
                                    success: true,
                                    message: `Not Found`,
                                })
                            }
                        } catch (error) {
                            res.send({
                                success: false,
                                message: `Bad required`,
                            })
                        }
            }else{
                res.send({
                    success: false,
                    message: 'All field must be filled'
                        })
                    }
            },
            patchBioDev : async (req,res)=>{
                    const idBioDev  = req.params.id
                    const {name='', status_job='',job_desk='', city='', work_place='',description=''} =req.body
                    const image = req.file === undefined ? '' : req.file.filename
                    if (name.trim() || status_job.trim() || job_desk.trim() || image.trim() || city.trim() || work_place.trim() || description.trim()) {
                    const setData = {
                        ...req.body,
                        image
                    
                    }
                        const data = Object.entries(setData).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        try {
                            const select = await selectBioDevModel(idBioDev)
                            if (select.length) {
                                const result = await pathBioDevModel(idBioDev,data)
                                if (result.affectedRows) {
                                    res.send({
                                        success: true,
                                        message: `Developer Bio with id ${idBioDev} has been Update All`,
                                    })
                                } else {
                                    res.send({
                                        success: false,
                                        message: `Failed to Update`,
                                    })
                                }
                            } else {
                                res.send({
                                    success: true,
                                    message: `Not Found`,
                                })
                            }
                        } catch (error) {
                            res.send({
                                success: false,
                                message: `Bad required`,
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
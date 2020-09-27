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
    getBioDev : (req, res)=>{
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

    getBioDevModel(searchKey,order,sort,searchValue,limit,offset, result => {
        if(result.length){
                        res.status(201).send({
                            success:true,
                            message:'List bio Developer',
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
    getBioDevByID : (req,res)=>{
        const {id} = req.params
        getBioDevByIDModel(id,result=>{
            if (result.length){
                        res.send({
                            success: true,
                            message:`data Bio id ${id}`,
                            data: result[0]
                        })
                    }else{
                        res.send({
                            success:false,
                            message: `data Bio ${id} not found`
                        })
                        
                    }
        })
    },
    deleteBioDev : (req,res)=>{
            const idBioDev = req.params.id
            selectBioDevModel(idBioDev, result =>{
            if (result.length){
                deleteBioDevIDModel(idBioDev, result=>{
                    if (result.affectedRows){
                        res.send({
                            success:true,
                            message:`developer bio ${idBioDev} has been deleted`,
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
        putBioDev :(req,res)=>{
                const idBioDev = req.params.id
                const {name, status_job,job_desk,image, city, work_place,description} =req.body
                if (name.trim() && status_job.trim() && job_desk.trim() && image.trim() && city.trim() && work_place.trim() && description.trim()){
               putBioDevModel (idBioDev,name, status_job,job_desk,image, city, work_place,description, result=>{
                    console.log(result);
                            if(result.affectedRows){
                                res.send({
                                    success: true,
                                    message: `Developer Bio with id ${idBioDev} has been Update All`,
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
                    message: 'All field must be filled'
                        })
                    }
            },
            patchBioDev : (req,res)=>{
                    const idBioDev  = req.params.id
                    const {name='', status_job='',job_desk='',image='', city='', work_place='',description=''} =req.body
                if (name.trim() || status_job.trim() || job_desk.trim() || image.trim() || city.trim() || work_place.trim() || description.trim()) {
                    selectBioDevModel(idBioDev, result=>{
                if (result.length){
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        console.log(data);
                       pathBioDevModel(idBioDev,data,result=>{
                            console.log(result);
                    if (result.affectedRows){
                        res.send({
                            success: true,
                            message: `Project with id ${idBioDev} has been updated`,
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
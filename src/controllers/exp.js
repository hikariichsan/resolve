const db = require('../helpers/db')
const {createexpModel, getexpModel, selectexpModel, deleteexpIDModel, putexpModel, patchexpModel} = require('../models/exp')

module.exports = {
    createexp : async (req, res) => {
        const {name_company,position,description,start,end, id_bio_dev} = req.body
        if (name_company && position && description && start && end &&  id_bio_dev){
           try {
           await createexpModel([name_company,position,description,start,end, id_bio_dev])
           res.status(201).send({
            success:true,
            message: 'exp has been created',
            data: req.body
        })
           } catch (error) {
            res.send({
                success:false,
                message: 'Bad Required'
            })
           }
        }else{
            res.status(500).send({
                success:false,
                message: 'All field must be filled'
            })
        }

        
    },
    getexp : async (req, res)=>{
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
try {
    const result =  await getexpModel(searchKey,searchValue,limit,offset)
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
} catch (error) {
    res.send({
        success: false,
        message: 'Bad required'
    })
}
  
    },

    getIDexp: async (req, res) => {    
        const idexp = req.params.id
        try{
            const select = await selectexpModel(idexp)
            if (select.length) { 
                    res.send({
                        success:true,
                        message:`Experience ${idexp} `,
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

    deleteexp : async (req,res)=>{
            const idexp = req.params.id
            try {
                const select = await selectexpModel(idexp)
                if (select.length) {
                    const result = await deleteexpIDModel(idexp)
                    if (result.affectedRows) {
                        res.send({
                            success:true,
                            message:`exp ${idexp} has been deleted`,
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
        putexp : async (req,res)=>{
                const idexp = req.params.id
                const {name_company,position,description,start,end, id_bio_dev} =req.body
                if (name_company.trim() &&position.trim() &&description.trim() &&start.trim() &&end.trim() && id_bio_dev.trim()){
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        try {
                            const select = await selectexpModel(idexp)
                            if (select.length) {
                                const result = await patchexpModel(idexp,data)
                                if (result.affectedRows) {
                                 res.send({
                                     success: true,
                                     message: `Experience with id ${idexp} has been Update`,
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
                                 message: 'Experience not found'
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
                     message: 'All Fields must be filled'
                         })
                     }
                    },
            patchexp : async (req,res)=>{
                    const idexp = req.params.id
                    const {name_company='',position='',description='',start='',end='', id_bio_dev=''} = req.body
                if (name_company.trim()|| position.trim()|| description.trim()|| start.trim()|| end.trim()||  id_bio_dev.trim()) {

                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        try {
                            const select = await selectexpModel(idexp)
                            if (select.length) {
                                const result = await patchexpModel(idexp,data)
                                if (result.affectedRows) {
                                 res.send({
                                     success: true,
                                     message: `Experience with id ${idexp} has been Update`,
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
                                 message: 'Experience not found'
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
                     message: 'Field must be filled'
                         })
                     }
                    }
                
               
}
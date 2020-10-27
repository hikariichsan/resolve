const db = require('../helpers/db')
const {createSkillModel, getSkillModel, selectSkillModel, deleteSkillIDModel, putSkillModel, patchSkillModel} = require('../models/skill')

module.exports = {
    createSkill : async (req, res) => {
        const {name_skill, id_bio_dev} = req.body
        if (name_skill && id_bio_dev ){
            try {
                await createSkillModel ([name_skill, id_bio_dev])
                res.status(201).send({
                    success:true,
                    message: 'Skill has been created',
                    data: req.body
                })
            } catch (error) {
                res.status(201).send({
                    success:true,
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
    getSkill : async (req, res)=>{
        let {page, limit, search } = req.query
    
        let searchKey = ''
        let searchValue = ''
    
        if(typeof search == 'object'){
            searchKey = Object.keys(search)[0]
            searchValue = Object.values(search)[0]
        }else{
            searchKey = 'name_skill'
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
        const result = await getSkillModel(searchKey,searchValue,limit,offset)
        if (result.length) {
            res.status(201).send({
                success:true,
                message:'List skill',
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
    getIDSkill: async (req, res) => {    
        const idSkill = req.params.id
        try{
            const select = await selectSkillModel(idSkill)
            if (select.length) { 
                    res.send({
                        success:true,
                        message:`Skill ${idSkill} `,
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

    deleteSkill : async(req,res)=>{
            const idSkill = req.params.id
            try {
                const select = await selectSkillModel(idSkill)
                if (select.length) {
                    const result = await  deleteSkillIDModel(idSkill)
                    if (result.affectedRows) {
                        res.send({
                            success:true,
                            message:`Skill ${idSkill} has been deleted`,
                            data: result
                        })
                    } else {
                        res.send({
                            success: false,
                            message: 'Data failed to delete'
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
        putSkill : async(req,res)=>{
                const idSkill = req.params.id
                const {name_skill} =req.body
                if (name_skill.trim()){
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                       try {
                           const select = await selectSkillModel(idSkill)
                           if (select.length) {
                               const result = await putSkillModel(idSkill,data)
                               if (result.affectedRows) {
                                res.send({
                                    success: true,
                                    message: `SKill with id ${idSkill} has been Update`,
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
                                message: 'Skill not found'
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
            patchSkill : async (req,res)=>{
                    const idSkill = req.params.id
                    const {name_skill ='',id_bio_dev=''} = req.body
                if (name_skill.trim() || id_bio_dev.trim()) {
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        try {
                            const select = await selectSkillModel(idSkill)
                            if (select.length) {
                                const result = await patchSkillModel(idSkill,data)
                                if (result.affectedRows) {
                                 res.send({
                                     success: true,
                                     message: `SKill with id ${idSkill} has been Update`,
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
                                 message: 'Skill not found'
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

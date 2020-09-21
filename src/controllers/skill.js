const db = require('../helpers/db')
const {createSkillModel, getSkillModel, selectSkillModel, deleteSkillIDModel, putSkillModel, patchSkillModel} = require('../models/skill')

module.exports = {
    createSkill : (req, res) => {
        const {name_skill, id_bio_dev} = req.body
        if (name_skill && id_bio_dev ){
            createSkillModel([name_skill, id_bio_dev], result=>{
                console.log(result);
res.status(201).send({
    success:true,
    message: 'Skill has been created',
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
    getSkill : (req, res)=>{
        let {page, limit, search } = req.query
    
        let searchKey = ''
        let searchValue = ''
    
        if(typeof search == 'object'){
            searchKey = Object.keys(search)[0]
            searchValue = Object.value(search)[0]
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

    getSkillModel(searchKey,searchValue,limit,offset, result => {
        if(result.length){
                        res.status(201).send({
                            success:true,
                            message:'List skill',
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
    deleteSkill : (req,res)=>{
            const idSkill = req.params.id
            selectSkillModel(idSkill, result =>{
            if (result.length){
                deleteSkillIDModel(idSkill, result=>{
                    if (result.affectedRows){
                        res.send({
                            success:true,
                            message:`Skill ${idSkill} has been deleted`,
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
        putSkill :(req,res)=>{
                const idSkill = req.params.id
                const {name_skill} =req.body
                if (name_skill.trim()){
                    selectSkillModel(idSkill, result=>{
                    if (result.length){
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        console.log(data);
               putSkillModel (idSkill,data, result =>{
                    console.log(result);
                            if(result.affectedRows){
                                res.send({
                                    success: true,
                                    message: `SKill with id ${idSkill} has been Update`,
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
                        message: 'Skill not found'
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
            patchSkill : (req,res)=>{
                    const idSkill = req.params.id
                    const {name_skill ='',id_bio_dev=''} = req.body
                if (name_skill.trim() || id_bio_dev.trim()) {
                    selectSkillModel(idSkill, result=>{
                if (result.length){
                        const data = Object.entries(req.body).map(item =>{
                            return parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]}='${item[1]}'`
                        })
                        console.log(data);
                       patchSkillModel(idSkill,data,result=>{
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
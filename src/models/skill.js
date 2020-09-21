const db = require('../helpers/db')

module.exports ={
    createSkillModel : (arr, cb) =>{
        const query =`INSERT INTO skill_dev ( name_skill, id_bio_dev ) VALUES('${arr[0]}', ${arr[1]})`
        db.query(query, (err, result,fields)=>{
            if(!err){
                cb(result) 
              }else{
                  res.send({
                      success: false,
                      message: 'Cant to created  :' + err
                  })
      
              }
        })
    },
    getSkillModel : (searchKey,searchValue,limit,offset, cb)=>{
        const query =`SELECT * FROM skill_dev WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`
        db.query(query,(err,result,fields)=>{
            if(!err){
              cb(result) 
            }else{
                res.send({
                    success: false,
                    message: 'Internal Srever Error :' + err
                })
    
            }
        })
    },
    selectSkillModel : (idSkill,cb)=>{
    db.query(`SELECT * FROM skill_dev WHERE id_skill = ${idSkill}`, (err, result, field)=>{
            cb(result)
        })
    },
    deleteSkillIDModel : (idSkill,cb)=>{
    db.query(`DELETE FROM skill_dev WHERE id_skill = ${idSkill}`, (err, result, field)=>{
        cb(result)
        })
    },
    putSkillModel : (idSkill, data, cb)=>{
        db.query(`UPDATE skill_dev SET ${data}
        WHERE id_skill = ${idSkill}`, (err, result,fields) =>{
            cb(result)
        })
    },
    patchSkillModel : (idSkill, data, cb)=>{
        db.query(`UPDATE skill_dev SET ${data} WHERE id_skill = ${idSkill}`, (err, result,field)=>{
cb(result)
        })
    }
}
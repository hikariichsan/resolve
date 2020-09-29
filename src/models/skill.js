const db = require('../helpers/db')

module.exports ={
    createSkillModel : (arr) =>{
        return new Promise ((resolve,reject)=>{
            const query =`INSERT INTO skill_dev ( name_skill, id_bio_dev ) VALUES('${arr[0]}', ${arr[1]})`
            db.query(query, (err, result,_fields)=>{
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
        })
        })
    },
    getSkillModel : (searchKey,searchValue,limit,offset)=>{
        return new Promise ((resolve,reject)=>{
        const query =`SELECT * FROM skill_dev WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`
        db.query(query,(err,result,_fields)=>{
            if (!err) {
                resolve(result)
            } else {
                reject(new Error(err))
            }
         })
        })
    },
    selectSkillModel : (idSkill)=>{
        return new Promise ((resolve,reject)=>{
    db.query(`SELECT * FROM skill_dev WHERE id_skill = ${idSkill}`, (err, result, _field)=>{
        if (!err) {
            resolve(result)
        } else {
            reject(new Error(err))
        }
     })
        })
    },
    deleteSkillIDModel : (idSkill)=>{
        return new Promise ((resolve,reject)=>{
    db.query(`DELETE FROM skill_dev WHERE id_skill = ${idSkill}`, (err, result, _field)=>{
        if (!err) {
            resolve(result)
        } else {
            reject(new Error(err))
        }
     })
        })
    },
    putSkillModel : (idSkill, data)=>{
        return new Promise ((resolve,reject)=>{
        db.query(`UPDATE skill_dev SET ${data}
        WHERE id_skill = ${idSkill}`, (err, result,_fields) =>{
            if (!err) {
                resolve(result)
            } else {
                reject(new Error(err))
            }
         })
        })
    },
    patchSkillModel : (idSkill, data)=>{
        return new Promise ((resolve,reject)=>{
        db.query(`UPDATE skill_dev SET ${data} WHERE id_skill = ${idSkill}`, (err, result,_field)=>{
            if (!err) {
                resolve(result)
            } else {
                reject(new Error(err))
            }
         })
        })
    }
}
const db = require('../helpers/db')

module.exports ={
    getSearchModel : (searchKey,searchValue,limit,offset,cb)=>{
        const query =`SELECT bio_dev.id_bio_dev,name,status_job,job_desk,city, skill_dev.name_skill FROM bio_dev LEFT JOIN skill_dev ON bio_dev.id_bio_dev = skill_dev.id_bio_dev WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset} `
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
    getDataSearchModel : (id,cb)=>{
        const query = `SELECT bio_dev.* , developer.no_hp FROM bio_dev LEFT JOIN developer ON bio_dev.id_dev = developer.id_dev WHERE id_bio_dev = ${id}`
        db.query(query, (err, result, field)=>{
            cb(result)
        })
    }
}
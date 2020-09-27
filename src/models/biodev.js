const db = require('../helpers/db')

module.exports ={
    createBioDevModel : (setData) =>{
        return new Promise((resolve, reject)=>{
            const query = 'INSERT INTO bio_dev SET ?'
            db.query(query, setData, (err, result, _fields)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
      },
    getBioDevModel : (searchKey,searchValue,limit,offset, cb)=>{
        const query =`SELECT d.*, GROUP_CONCAT(s.name_skill) AS skill FROM bio_dev d LEFT JOIN skill_dev s ON d.id_bio_dev = s.id_bio_dev 
         WHERE ${searchKey} LIKE '%${searchValue}%' GROUP BY(d.id_bio_dev) LIMIT ${limit} OFFSET ${offset}`
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
    selectBioDevModel : (idBioDev,cb)=>{
    db.query(`SELECT * FROM bio_dev WHERE id_bio_dev = ${idBioDev}`, (err, result, field)=>{
        if(!err){
            cb(result) 
          }else{
              res.send({
                  success: false,
                  message: 'Not Found  :' + err
              })
  
          }
        })
    },
    deleteBioDevIDModel : (idBioDev,cb)=>{
    db.query(`DELETE FROM bio_dev WHERE id_bio_dev = ${idBioDev}`, (err, result, field)=>{
        if(!err){
            cb(result) 
          }else{
              res.send({
                  success: false,
                  message: 'Cant to deleted :' + err
              })
  
          }
        })
    },
    putBioDevModel : (idBioDev,name, status_job,job_desk,image, city, work_place,description, cb)=>{
        db.query(`UPDATE bio_dev SET name='${name}', job_desk='${job_desk}', status_job= ${status_job}, work_place='${work_place}', description = '${description}',image = '${image}',city = '${city}'
        WHERE id_bio_dev = ${idBioDev}`, (err, result,fields) =>{
            if(!err){
                cb(result) 
              }else{
                  res.send({
                      success: false,
                      message: 'Cant to Update All :' + err
                  })
      
              }
        })
    },
    pathBioDevModel : (idBioDev, data, cb)=>{
        db.query(`UPDATE bio_dev SET ${data} WHERE id_bio_dev = ${idBioDev}`, (err, result,field)=>{
            if(!err){
                cb(result) 
              }else{
                  res.send({
                      success: false,
                      message: 'Cant to Update All :' + err
                  })
      
              }
        })
    }
}
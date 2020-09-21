const db = require('../helpers/db')

module.exports ={
    createBioDevModel : (arr, cb) =>{
        const query =`INSERT INTO bio_dev (id_dev,name, status_job,job_desk,image, city, work_place,description) VALUES('${arr[0]}','${arr[1]}',${arr[2]},'${arr[3]}','${arr[4]}','${arr[5]}','${arr[6]}','${arr[7]}')`
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
    getBioDevModel : (searchKey,searchValue,limit,offset, cb)=>{
        const query =`SELECT bio_dev.*,exp_dev.*,port_dev.* FROM ((bio_dev LEFT JOIN exp_dev ON bio_dev.id_bio_dev = exp_dev.id_bio_dev)LEFT JOIN port_dev ON bio_dev.id_bio_dev = port_dev.id_bio_dev) WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`
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
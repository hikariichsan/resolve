const db = require('../helpers/db')

module.exports ={
    createBioRecModel : (arr, cb) =>{
        const query =`INSERT INTO bio_recuiter (id_recruiter,name_company, sector,city,description, instagram, image,linkedin) VALUES(${arr[0]},'${arr[1]}','${arr[2]}','${arr[3]}','${arr[4]}','${arr[5]}','${arr[6]}','${arr[7]}')`
        db.query(query, (err, result,fields)=>{
            if(!err){
                cb(result) 
              }else{    
                  result.send({
                      success: false,
                      message: 'Cant to created  :' + err
                  })
      
              }
        })
    },
    getBioRecModel : (searchKey,searchValue,limit,offset, cb)=>{
        const query =`SELECT * FROM bio_recuiter WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`
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
    selectBioRecModel : (idBioRec,cb)=>{
    db.query(`SELECT * FROM bio_recuiter WHERE id_bio_rec = ${idBioRec}`, (err, result, field)=>{
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
    deleteBioRecIDModel : (idBioRec,cb)=>{
    db.query(`DELETE FROM bio_recuiter WHERE id_bio_rec = ${idBioRec}`, (err, result, field)=>{
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
    putBioRecModel : (idBioRec,name_company, sector,instagram,image, city, linkedin,description, cb)=>{
        db.query(`UPDATE bio_recuiter SET name_company='${name_company}', sector='${sector}', instagram= '${instagram}', linkedin='${linkedin}', description = '${description}',image = '${image}',city = '${city}'
        WHERE id_bio_rec = ${idBioRec}`, (err, result,fields) =>{
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
    pathBioRecModel : (idBioRec, data, cb)=>{
        db.query(`UPDATE bio_recuiter SET ${data} WHERE id_bio_rec = ${idBioRec}`, (err, result,field)=>{
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
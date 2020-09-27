const db = require('../helpers/db')

module.exports ={
    
    createBioRecModel  : (setData) =>{
            return new Promise((resolve, reject)=>{
                const query = 'INSERT INTO bio_recuiter SET ?'
                db.query(query, setData, (err, result, _fields)=>{
                    if(!err){
                        resolve(result)
                    }else{
                        reject(new Error(err))
                    }
                })
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
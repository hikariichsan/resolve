const db = require('../helpers/db')

module.exports ={
    createRecruiterModel : (arr, cb) =>{
        const query =`INSERT INTO recruiter (name, email, company, position, password, no_hp) VALUES('${arr[0]}','${arr[1]}','${arr[2]}','${arr[3]}','${arr[4]}','${arr[5]}')`
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
    getDataRecruiterModel : (searchKey,searchValue,limit,offset, cb)=>{
        const query =`SELECT * FROM recruiter WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`
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
    selectRecruiterModel : (idRec,cb)=>{
    db.query(`SELECT * FROM recruiter WHERE id_recruiter = ${idRec}`, (err, result, field)=>{
            cb(result)
        })
    },
    deleteRecruiterIDModel : (idRec,cb)=>{
    db.query(`DELETE FROM recruiter WHERE id_recruiter = ${idRec}`, (err, result, field)=>{
        cb(result)
        })
    },
    putRecruiterModel : (idRec, data, cb)=>{
        db.query(`UPDATE recruiter SET ${data}
        WHERE id_recruiter = ${idRec}`, (err, result,fields) =>{
            cb(result)
        })
    },
    pathRecruiterModel : (idRec, data, cb)=>{
        db.query(`UPDATE recruiter SET ${data} WHERE id_recruiter = ${idRec}`, (err, result,field)=>{
cb(result)
        })
    }
}
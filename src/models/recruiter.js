const { request, response } = require('express')
const db = require('../helpers/db')

module.exports ={
    
    postRecruiterModel : (setData) => {
        return new Promise((resolve, reject)=>{
            db.query('INSERT INTO recruiter SET ? ',setData,(error, result)=>{
                if(!error){
                    const newResult ={
                   id: result.insertId,
                   ...setData
                   }
                   delete newResult.password
                   resolve(newResult)
                }else  if(error.code == 'ER_DUP_ENTRY' || error.errorno == 1062)
                {
                    console.log('Here you can handle duplication')
                  
                }else{
                    reject(new Error(error))
                }
            })
        })
       
    },
    checkRecruiterModel: (email) => {
        return new Promise((resolve, reject)=>{
            db.query('SELECT id_recruiter, email, password, name,role, company,no_hp FROM recruiter WHERE email = ?',email,(error, result) =>{
                if(!error){
                    resolve(result)
                }else{
                    reject(new Error(error))
                }
            })
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
        db.query(`UPDATE recruiter SET ${data} WHERE id_recruiter = ${idRec}`, (err, result,fields) =>{
            cb(result)
        })
    },
    pathRecruiterModel : (idRec, data, cb)=>{
        db.query(`UPDATE recruiter SET ${data} WHERE id_recruiter = ${idRec}`, (err, result,field)=>{
cb(result)
        })
    }
}
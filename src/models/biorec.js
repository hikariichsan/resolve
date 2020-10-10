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
          checkIdRecruiterModel: (id_recruiter) => {
            return new Promise((resolve, reject) => {
              db.query('SELECT id_recruiter FROM bio_recuiter WHERE id_recruiter = ?', id_recruiter, (err, result) => {
                if (!err) {
                  resolve(result)
                } else {
                  reject(new Error(err))
                }
              })
            })
          },
    getBioRecModel : (searchKey,searchValue,limit,offset)=>{
        return new Promise((resolve, reject)=>{
        const query =`SELECT * FROM bio_recuiter WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`
        db.query(query,(err,result,_fields)=>{
            if(!err){
                resolve(result)
            }else{
                reject(new Error(err))
            }
        })
        })
    },
    
    selectBioRecModel : (idBioRec)=>{
        return new Promise((resolve, reject)=>{
    db.query(`SELECT * FROM bio_recuiter WHERE id_recruiter = ${idBioRec}`, (err, result, _field)=>{
        if(!err){
            resolve(result)
        }else{
            reject(new Error(err))
        }
    })
        })
    },
    deleteBioRecIDModel : (idBioRec)=>{
        return new Promise((resolve, reject)=>{
    db.query(`DELETE FROM bio_recuiter WHERE id_bio_rec = ${idBioRec}`, (err, result, _field)=>{
        if(!err){
            resolve(result)
        }else{
            reject(new Error(err))
        }
    })
        })
    },
    putBioRecModel : (idBioRec,data)=>{
        return new Promise((resolve, reject)=>{
        db.query(`UPDATE bio_recuiter SET ${data}
        WHERE id_bio_rec = ${idBioRec}`, (err, result,_fields) =>{
            if(!err){
                resolve(result)
            }else{
                reject(new Error(err))
            }
        })
        })
    },
    pathBioRecModel : (idBioRec, data)=>{
        return new Promise((resolve, reject)=>{
        db.query(`UPDATE bio_recuiter SET ${data} WHERE id_bio_rec = ${idBioRec}`, (err, result,_field)=>{
            if(!err){
                resolve(result)
            }else{
                reject(new Error(err))
            }
        })
        })
    }
}
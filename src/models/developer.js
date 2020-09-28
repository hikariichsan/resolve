const { response } = require('express')
const db = require('../helpers/db')

module.exports ={
    postDeveloperModel : (setData) => {
        return new Promise((resolve, reject)=>{
            db.query('INSERT INTO developer SET ? ',setData,(error, result)=>{
                if(!error){
                    const newResult ={
                   id: result.insertId,
                   ...setData
                   }
                   delete newResult.password
                   resolve(newResult)
                }else if(error.code == 'ER_DUP_ENTRY' || error.errorno == 1062)
                {
                    console.log('Here you can handle duplication')

                }else{
                    reject(new Error(error))
                }
            })
        })
       
    },
    checkDeveloperModel: (email) => {
        return new Promise((resolve, reject)=>{
            db.query('SELECT id_dev, email, password, name,role,no_hp FROM developer WHERE email = ?',email,(error, result) =>{
                if(!error){
                    resolve(result)
                }else{
                    reject(new Error(error))
                }
            })
        })
    },
    getDataDeveloperModel : (searchKey,searchValue,limit,offset, cb)=>{
        const query =`SELECT * FROM developer WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`
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
    selectDeveloperModel : (idDev,cb)=>{
    db.query(`SELECT * FROM developer WHERE id_dev = ${idDev}`, (err, result, field)=>{
            cb(result)
        })
    },
    deleteDeveloperIDModel : (idDev,cb)=>{
    db.query(`DELETE FROM developer WHERE id_dev = ${idDev}`, (err, result, field)=>{
        cb(result)
        })
    },
    putDeveloperModel : (idDev, name, email, password, no_hp, cb)=>{
        db.query(`UPDATE developer SET name='${name}', email='${email}', password='${password}', no_hp='${no_hp}'
        WHERE id_dev = ${idDev}`, (err, result,fields) =>{
            cb(result)
        })
    },
    pathDeveloperModel : (idDev, data, cb)=>{
        db.query(`UPDATE developer SET ${data} WHERE id_dev = ${idDev}`, (err, result,field)=>{
cb(result)
        })
    }
}
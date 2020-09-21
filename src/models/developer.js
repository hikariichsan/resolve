const db = require('../helpers/db')

module.exports ={
    createDeveloperModel : (arr, cb) =>{
        const query =`INSERT INTO developer (name, email, password, no_hp) VALUES('${arr[0]}','${arr[1]}','${arr[2]}','${arr[3]}')`
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
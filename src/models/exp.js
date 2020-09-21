const db = require('../helpers/db')

module.exports ={
    createexpModel : (arr, cb) =>{
        const query =`INSERT INTO exp_dev ( name_company,position,description,start,end, id_bio_dev ) VALUES('${arr[0]}', '${arr[1]}','${arr[2]}',${arr[3]},${arr[4]},${arr[5]})`
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
    getexpModel : (searchKey,searchValue,limit,offset, cb)=>{
        const query =`SELECT * FROM exp_dev WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`
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
    selectexpModel : (idexp,cb)=>{
    db.query(`SELECT * FROM exp_dev WHERE id_exp = ${idexp}`, (err, result, field)=>{
            cb(result)
        })
    },
    deleteexpIDModel : (idexp,cb)=>{
    db.query(`DELETE FROM exp_dev WHERE id_exp = ${idexp}`, (err, result, field)=>{
        cb(result)
        })
    },
    putexpModel : (idexp, data, cb)=>{
        db.query(`UPDATE exp_dev SET ${data}
        WHERE id_exp = ${idexp}`, (err, result,fields) =>{
            cb(result)
        })
    },
    patchexpModel : (idexp, data, cb)=>{
        db.query(`UPDATE exp_dev SET ${data} WHERE id_exp = ${idexp}`, (err, result,field)=>{
cb(result)
        })
    }
}
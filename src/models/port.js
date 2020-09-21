const db = require('../helpers/db')

module.exports ={
    createPortModel : (arr, cb) =>{
        const query =`INSERT INTO port_dev ( name_app, description, link_repo, link_publish, workplace_related, base_type, photo, id_bio_dev ) VALUES('${arr[0]}','${arr[1]}','${arr[2]}','${arr[3]}','${arr[4]}',${arr[5]},'${arr[6]}', ${arr[7]})`
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
    getPortModel : (searchKey,searchValue,limit,offset, cb)=>{
        const query =`SELECT * FROM port_dev WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`
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
    selectPortModel : (idPort,cb)=>{
    db.query(`SELECT * FROM port_dev WHERE id_port = ${idPort}`, (err, result, field)=>{
            cb(result)
        })
    },
    deletePortModel : (idPort,cb)=>{
    db.query(`DELETE FROM port_dev WHERE id_port = ${idPort}`, (err, result, field)=>{
        cb(result)
        })
    },
    putPortModel : (idPort, data, cb)=>{
        db.query(`UPDATE port_dev SET ${data}
        WHERE id_port = ${idPort}`, (err, result,fields) =>{
            cb(result)
        })
    },
    patchPortModel : (idPort, data, cb)=>{
        db.query(`UPDATE port_dev SET ${data} WHERE id_port = ${idPort}`, (err, result,field)=>{
cb(result)
        })
    }
}
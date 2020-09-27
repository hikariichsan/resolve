const db = require('../helpers/db')

module.exports ={
    createPortModel : (setData) =>{
        return new Promise((resolve, reject)=>{
            const query = 'INSERT INTO port_dev SET ?'
            db.query(query, setData, (err, result, _fields)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
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
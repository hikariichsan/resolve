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
    getPortModel : (searchKey,searchValue,limit,offset)=>{
        return new Promise((resolve,reject)=>{
            const query =`SELECT * FROM port_dev WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`
            db.query(query,(err,result,_fields)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        

        })
    
           
    },
    selectPortModel : (idPort) => {
        return new Promise((resolve, reject) => {
          db.query(`SELECT * FROM port_dev WHERE id_port = ${idPort}`, (err, result, _field) => {
            if (!err) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          })
        })
      },
    deletePortModel : (idPort) => {
        return new Promise((resolve, reject) => {
          db.query(`DELETE FROM port_dev WHERE id_port = ${idPort}`, (err, result, _field) => {
            if (!err) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          })
        })
      },
    putPortModel : (arr, idPort) => {
        return new Promise((resolve, reject) => {
          db.query(`UPDATE port_dev SET name_app='${arr[0]}', description='${arr[1]}', link_repo='${arr[2]}', link_publish='${arr[3]}', workplace_related='${arr[4]}',id_bio_dev=${arr[5]},base_type=${arr[6]},image='${arr[7]}'
             WHERE id_port = ${idPort}`, (err, result, _fields) => {
            if (!err) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          })
        })
      },
    patchPortModel : (data, idPort) => {
        return new Promise((resolve, reject) => {
          db.query(`UPDATE port_dev SET ${data} WHERE id_port = ${idPort}`, (err, result, _field) => {
            if (!err) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          })
        })
      }
}
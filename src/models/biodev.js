const db = require('../helpers/db')

module.exports ={
    createBioDevModel : (setData) =>{
        return new Promise((resolve, reject)=>{
            const query = 'INSERT INTO bio_dev SET ?'
            db.query(query, setData, (err, result, _fields)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
      },
    getBioDevModel : (searchKey,sort,order,searchValue,limit,offset)=>{
        return new Promise((resolve, reject)=>{
        let sort_order = ''
        if (sort != null){
            if (order != null){
                sort_order = `ORDER BY ${sort} ${order}`
            }else{
                sort_order = 'ORDER BY name ASC'
            }
        }
        const query =`SELECT d.*, GROUP_CONCAT(s.name_skill) AS skill FROM bio_dev d LEFT JOIN skill_dev s ON d.id_bio_dev = s.id_bio_dev 
         WHERE ${searchKey} LIKE '%${searchValue}%' GROUP BY(d.id_bio_dev) ${sort_order} LIMIT ${limit} OFFSET ${offset}`
        db.query(query,(err,result,_fields)=>{
            if(!err){
                resolve(result)
            }else{
                reject(new Error(err))
            }
        })
        })
    },
    getBioDevByIDModel: (id) =>{
        return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM bio_dev WHERE id_bio_dev = ${id}`, (err, result, _field)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    selectBioDevModel : (idBioDev)=>{
        return new Promise((resolve, reject)=>{
    db.query(`SELECT * FROM bio_dev WHERE id_bio_dev = ${idBioDev}`, (err, result, _field)=>{
        if(!err){
            resolve(result)
        }else{
            reject(new Error(err))
        }
    })
        })
    },
    deleteBioDevIDModel : (idBioDev)=>{
        return new Promise((resolve, reject)=>{
    db.query(`DELETE FROM bio_dev WHERE id_bio_dev = ${idBioDev}`, (err, result, _field)=>{
        if(!err){
            resolve(result)
        }else{
            reject(new Error(err))
        }
    })
        })
    },
    putBioDevModel : (idBioDev,data)=>{
        return new Promise((resolve, reject)=>{
        db.query(`UPDATE bio_dev SET ${data}
        WHERE id_bio_dev = ${idBioDev}`, (err, result,_fields) =>{
            if(!err){
                resolve(result)
            }else{
                reject(new Error(err))
            }
        })
        })
    },
    pathBioDevModel : (idBioDev, data)=>{
        return new Promise((resolve, reject)=>{
        db.query(`UPDATE bio_dev SET ${data} WHERE id_bio_dev = ${idBioDev}`, (err, result,_field)=>{
            if(!err){
                resolve(result)
            }else{
                reject(new Error(err))
            }
        })
        })
    }
}
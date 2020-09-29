const db = require('../helpers/db')

module.exports ={
    createexpModel : (arr) =>{
        return new Promise((resolve,reject)=>{
            const query =`INSERT INTO exp_dev ( name_company,position,description,start,end, id_bio_dev ) VALUES('${arr[0]}', '${arr[1]}','${arr[2]}',${arr[3]},${arr[4]},${arr[5]})`
            db.query(query, (err, result,_fields)=>{
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
        })
        })
    },
    getexpModel : (searchKey,searchValue,limit,offset)=>{
        return new Promise((resolve,reject)=>{
        const query =`SELECT * FROM exp_dev WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`
        db.query(query,(err,result,_fields)=>{
            if (!err) {
                resolve(result)
            } else {
                reject(new Error(err))
            }
    })
        })
    },
    selectexpModel : (idexp,cb)=>{
        return new Promise((resolve,reject)=>{
    db.query(`SELECT * FROM exp_dev WHERE id_exp = ${idexp}`, (err, result, _field)=>{
        if (!err) {
            resolve(result)
        } else {
            reject(new Error(err))
        }
})
        })
    },
    deleteexpIDModel : (idexp)=>{
        return new Promise((resolve,reject)=>{
    db.query(`DELETE FROM exp_dev WHERE id_exp = ${idexp}`, (err, result, _field)=>{
        if (!err) {
            resolve(result)
        } else {
            reject(new Error(err))
        }
})
        })
    },
    putexpModel : (idexp, data)=>{
        return new Promise((resolve,reject)=>{
        db.query(`UPDATE exp_dev SET ${data}
        WHERE id_exp = ${idexp}`, (err, result,fields) =>{
            if (!err) {
                resolve(result)
            } else {
                reject(new Error(err))
            }
    })
        })
    },
    patchexpModel : (idexp, data)=>{
        return new Promise((resolve,reject)=>{
        db.query(`UPDATE exp_dev SET ${data} WHERE id_exp = ${idexp}`, (err, result,field)=>{
            if (!err) {
                resolve(result)
            } else {
                reject(new Error(err))
            }
    })
        })
    }
}
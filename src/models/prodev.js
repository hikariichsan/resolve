const db = require('../helpers/db')

module.exports ={
    createProdevModel : (arr) =>{
        return new Promise((resolve,reject)=>{
            const query =`INSERT INTO project_developer ( name_detail, project_job, location, price, message, id_project, id_dev, sts_confirm, confirm_date, description ) VALUES('${arr[0]}','${arr[1]}','${arr[2]}',${arr[3]},'${arr[4]}',${arr[5]},${arr[6]}, ${arr[7]},${arr[8]},'${arr[9]}')`
            db.query(query, (err, result,_fields)=>{
            if (!err) {
                resolve(result)
            } else {
                reject(new Error(err))
            }
        })
       
        })
    },
    getProdevModel : (searchKey,searchValue,limit,offset)=>{
        return new Promise((resolve,reject)=>{
        const query =`SELECT * FROM project_developer WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`
        db.query(query,(err,result,_fields)=>{
            if (!err) {
                resolve(result)
            } else {
                reject(new Error(err))
            }
                })
        })
    },
    selectProdevModel : (idProdev)=>{
        return new Promise((resolve,reject)=>{
    db.query(`SELECT * FROM project_developer WHERE id_prodev = ${idProdev}`, (err, result, _field)=>{
        if (!err) {
            resolve(result)
        } else {
            reject(new Error(err))
        }
            })
        })
    },
    deleteProdevModel : (idProdev)=>{
        return new Promise((resolve,reject)=>{
    db.query(`DELETE FROM project_developer WHERE id_prodev = ${idProdev}`, (err, result, _field)=>{
        if (!err) {
            resolve(result)
        } else {
            reject(new Error(err))
        }
            })
        })
    },
    putProdevModel : (idProdev, data)=>{
        return new Promise((resolve,reject)=>{
        db.query(`UPDATE project_developer SET ${data}
        WHERE id_prodev = ${idProdev}`, (err, result,_fields) =>{
            if (!err) {
                resolve(result)
            } else {
                reject(new Error(err))
            }
                })
        })
    },
    patchProdevModel : (idProdev, data)=>{
        return new Promise((resolve,reject)=>{
        db.query(`UPDATE project_developer SET ${idProdev} WHERE id_prodev = ${data}`, (err, result,_field)=>{
            if (!err) {
                resolve(result)
            } else {
                console.log(err);
                reject(new Error(err))
            }
                })
        })
    }
}
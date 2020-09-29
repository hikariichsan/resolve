const db = require('../helpers/db')

module.exports ={
    createProjectModel : (setData) =>{
      return new Promise((resolve, reject)=>{
          const query = 'INSERT INTO project SET ?'
          db.query(query, setData, (err, result, _fields)=>{
              if(!err){
                  resolve(result)
              }else{
                  reject(new Error(err))
              }
          })
      })
    },
    getProjectModel : (searchKey,searchValue,limit,offset)=>{
        return new Promise((resolve, reject)=>{
        const query =`SELECT * FROM project WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`
        db.query(query,(err,result,_fields)=>{
            if(!err){
                resolve(result)
            }else{
                reject(new Error(err))
            }
        })
        })
    },
    selectProjectModel : (idProject)=>{
        return new Promise((resolve, reject)=>{
    db.query(`SELECT * FROM project WHERE id_project = ${idProject}`, (err, result, _field)=>{
        if(!err){
            resolve(result)
        }else{
            reject(new Error(err))
        }
    })
        })
    },
    deleteProjectIDModel : (idProject)=>{
        return new Promise((resolve, reject)=>{
    db.query(`DELETE FROM project WHERE id_project = ${idProject}`, (err, result, _field)=>{
        if(!err){
            resolve(result)
        }else{
            reject(new Error(err))
        }
    })
        })
    },
    putProjectModel : (idProject, data)=>{
        return new Promise((resolve, reject)=>{
        db.query(`UPDATE project SET ${data}
        WHERE id_project = ${idProject}`, (err, result,_fields) =>{
            if(!err){
                resolve(result)
            }else{
                reject(new Error(err))
            }
        })
        })
    },
    patchProjectModel : (idProject, data)=>{
        return new Promise((resolve, reject)=>{
        db.query(`UPDATE project SET ${data} WHERE id_project = ${idProject}`, (err, result,_field)=>{
            if(!err){
                resolve(result)
            }else{
                reject(new Error(err))
            }
        })
        })
    }
}
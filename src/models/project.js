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
    getProjectByIdModel: (idProject) => {
        return new Promise((resolve, reject) => {
          db.query(`SELECT project.*, GROUP_CONCAT(bio_dev.name) AS bio_dev FROM project LEFT JOIN hire ON project.id_project = hire.idProject LEFT JOIN bio_dev ON hire.idBioDev = bio_dev.id_bio_dev WHERE project.id_recruiter = ${idProject} GROUP BY id_project`, (err, result, _field) => {
            if (!err) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          })
        })
      },
    selectProjectModel : (idProject)=>{
        return new Promise((resolve, reject)=>{
    db.query(`SELECT * FROM project WHERE id_recruiter = ${idProject}`, (err, result, _field)=>{
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
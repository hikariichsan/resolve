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
    getProjectModel : (searchKey,searchValue,limit,offset, cb)=>{
        const query =`SELECT * FROM project WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`
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
    selectProjectModel : (idProject,cb)=>{
    db.query(`SELECT * FROM project WHERE id_project = ${idProject}`, (err, result, field)=>{
            cb(result)
        })
    },
    deleteProjectIDModel : (idProject,cb)=>{
    db.query(`DELETE FROM project WHERE id_project = ${idProject}`, (err, result, field)=>{
        cb(result)
        })
    },
    putProjectModel : (idProject, data, cb)=>{
        db.query(`UPDATE project SET ${data}
        WHERE id_project = ${idProject}`, (err, result,fields) =>{
            cb(result)
        })
    },
    patchProjectModel : (idProject, data, cb)=>{
        db.query(`UPDATE project SET ${data} WHERE id_project = ${idProject}`, (err, result,field)=>{
cb(result)
        })
    }
}
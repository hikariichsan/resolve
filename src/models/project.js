const db = require('../helpers/db')

module.exports ={
    createProjectModel : (arr, cb) =>{
        const query =`INSERT INTO project ( name_project,location,description,deadline_month,image, id_recruiter ) VALUES('${arr[0]}','${arr[1]}','${arr[2]}', ${arr[3]},'${arr[4]}', ${arr[5]})`
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
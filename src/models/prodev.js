const db = require('../helpers/db')

module.exports ={
    createProdevModel : (arr, cb) =>{
        const query =`INSERT INTO project_developer ( name_detail, project_job, location, price, message, id_project, id_dev, sts_confirm, confirm_date, description ) VALUES('${arr[0]}','${arr[1]}','${arr[2]}',${arr[3]},'${arr[4]}',${arr[5]},${arr[6]}, ${arr[7]},${arr[8]},'${arr[9]}')`
        db.query(query, (err, result,fields)=>{
            console.log(err);
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
    getProdevModel : (searchKey,searchValue,limit,offset, cb)=>{
        const query =`SELECT * FROM project_developer WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`
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
    selectProdevModel : (idProdev,cb)=>{
    db.query(`SELECT * FROM project_developer WHERE id_prodev = ${idProdev}`, (err, result, field)=>{
            cb(result)
        })
    },
    deleteProdevModel : (idProdev,cb)=>{
    db.query(`DELETE FROM project_developer WHERE id_prodev = ${idProdev}`, (err, result, field)=>{
        cb(result)
        })
    },
    putProdevModel : (idProdev, data, cb)=>{
        db.query(`UPDATE project_developer SET ${data}
        WHERE id_prodev = ${idProdev}`, (err, result,fields) =>{
            cb(result)
        })
    },
    patchProdevModel : (idProdev, data, cb)=>{
        db.query(`UPDATE project_developer SET ${data} WHERE id_prodev = ${idProdev}`, (err, result,field)=>{
cb(result)
        })
    }
}
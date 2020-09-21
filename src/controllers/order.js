const db = require('../helpers/db')

module.exports = {
    
        order : (req,res)=>{

            let {order} = req.query
            let {sort} = req.query
          
                db.query(`SELECT bio_dev.id_bio_dev,name,status_job,job_desk,city, skill_dev.name_skill FROM bio_dev LEFT JOIN skill_dev ON bio_dev.id_bio_dev = skill_dev.id_bio_dev  ORDER BY ${order} ${sort}`, (err, result, field)=>{
                    if (result.length){  
                        res.send({
                            success: true,
                            message:`data have been found`,
                            data: result
                        })
                    }else{
                        res.send({
                            success:false,
                            message: `data not found`
                        })
                        
                    }
                })
            }
}

    
               

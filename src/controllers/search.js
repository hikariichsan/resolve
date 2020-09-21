const db = require('../helpers/db')
const { getSearchModel,getDataSearchModel} = require('../models/search')

module.exports = {
    
    getSearch : (req, res)=>{
        let {page, limit, search } = req.query
    
        let searchKey = ''
        let searchValue = ''
    
        if(typeof search == 'object'){
            searchKey = Object.keys(search)[0]
            searchValue = Object.values(search)[0]
        }else{
            searchKey = 'name' 
            searchValue = search||''
        }
        if(!limit){
            limit = 10
        }else{
            limit = parseInt(limit)
        }
        if(!page){
            page = 1
        }else{
            page = parseInt(page)
        }
    
    const offset = (page-1)*limit

    getSearchModel( searchKey,searchValue,limit,offset,result => {
        if(result.length){
                        res.status(201).send({
                            success:true,
                            message:'List skill',
                            data: result
                        })
                    }else{
                        res.send({
                            success: true,
                            message: 'There is no item list'
                        })
                    }
    })
    
   
    },
    getDataSearch : (req,res)=>{
            const id = req.params.id
            getDataSearchModel (id,result=>{
                if (result.length){
                    res.send({
                        success: true,
                        message:`data Bio Developer id ${id}`,
                        data: result[0]
                    })
                }else{
                    res.send({
                        success:false,
                        message: `data Bio Developer ${id} not found`
                    })
                    
                }
            })
        },
        
}

    
               

const { Router } = require('express')
const {getSearch,getDataSearch} = require('../controllers/search')
const {order} = require('../controllers/order')

const router = Router()

router.get('/', getSearch)
router.get('/data/:id', getDataSearch)
router.get('/order', order)


module.exports= router
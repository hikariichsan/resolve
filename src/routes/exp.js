const { Router } = require('express')
const {createexp, getexp,getIDexp, deleteexp, putexp, patchexp} = require('../controllers/exp')
const { authorizationDev, authAll} = require('../middleware/auth')

const router = Router()

router.post('/',authorizationDev, createexp)
router.get('/',authAll, getexp)
router.get('/:id',authAll, getIDexp)
router.put('/:id',authorizationDev, putexp)
router.delete('/:id',authorizationDev, deleteexp)
router.patch('/:id',authorizationDev, patchexp)

module.exports= router
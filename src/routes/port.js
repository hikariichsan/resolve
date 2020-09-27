const { Router } = require('express')
const {createport, getport, deleteport, putport, patchport} = require('../controllers/port')
const uploadImage = require('../middleware/multer')

const router = Router()

router.post('/', uploadImage,createport)
router.get('/', getport)
router.put('/:id', putport)
router.delete('/:id', deleteport)
router.patch('/:id', patchport)

module.exports= router
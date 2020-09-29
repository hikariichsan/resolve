const { Router } = require('express')
const {createBioRec, getBioRec, deleteBioRec, putBioRec, patchBioRec} = require('../controllers/biorec')
const uploadImage = require('../middleware/multer')
const {authorization} = require('../middleware/auth')

const router = Router()

router.post('/',authorization,uploadImage, createBioRec)
router.get('/',authorization, getBioRec)
router.put('/:id',authorization,uploadImage, putBioRec)
router.delete('/:id',authorization, deleteBioRec)
router.patch('/:id',authorization,uploadImage, patchBioRec)

module.exports= router
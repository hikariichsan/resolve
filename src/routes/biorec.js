const { Router } = require('express')
const {createBioRec, getBioRec,getBioRecID, deleteBioRec, putBioRec, patchBioRec} = require('../controllers/biorec')
const uploadImage = require('../middleware/multer')
const {authorization} = require('../middleware/auth')

const router = Router()

router.post('/',authorization,uploadImage, createBioRec)
router.get('/',authorization, getBioRec)
router.get('/:id',authorization, getBioRecID)
router.put('/:id',authorization,uploadImage, putBioRec)
router.delete('/:id',authorization, deleteBioRec)
router.patch('/:id',authorization,uploadImage, patchBioRec)

module.exports= router
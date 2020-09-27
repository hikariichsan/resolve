const { Router } = require('express')
const {createBioRec, getBioRec, deleteBioRec, putBioRec, patchBioRec} = require('../controllers/biorec')
const uploadImage = require('../middleware/multer')

const router = Router()

router.post('/',uploadImage, createBioRec)
router.get('/', getBioRec)
router.put('/:id', putBioRec)
router.delete('/:id', deleteBioRec)
router.patch('/:id', patchBioRec)

module.exports= router
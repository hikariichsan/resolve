const { Router } = require('express')
const {createBioDev, getBioDev, deleteBioDev, putBioDev, patchBioDev} = require('../controllers/biodev')
const uploadImage = require('../middleware/multer')

const router = Router()

router.post('/',uploadImage, createBioDev)
router.get('/', getBioDev)
router.put('/:id', putBioDev)
router.delete('/:id', deleteBioDev)
router.patch('/:id', patchBioDev)

module.exports= router
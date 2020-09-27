const { Router } = require('express')
const {createBioDev, getBioDev,getBioDevByID, deleteBioDev, putBioDev, patchBioDev} = require('../controllers/biodev')
const uploadImage = require('../middleware/multer')
const {authorizationDev,authAll} = require('../middleware/auth')

const router = Router()

router.post('/',authorizationDev,uploadImage, createBioDev)
router.get('/',authAll, getBioDev)
router.get('/:id',authAll, getBioDevByID)
router.put('/:id',authorizationDev, putBioDev)
router.delete('/:id',authorizationDev, deleteBioDev)
router.patch('/:id',authorizationDev, patchBioDev)

module.exports= router
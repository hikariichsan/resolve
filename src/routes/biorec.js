const { Router } = require('express')
const {createBioRec, getBioRec, deleteBioRec, putBioRec, patchBioRec} = require('../controllers/biorec')

const router = Router()

router.post('/', createBioRec)
router.get('/', getBioRec)
router.put('/:id', putBioRec)
router.delete('/:id', deleteBioRec)
router.patch('/:id', patchBioRec)

module.exports= router
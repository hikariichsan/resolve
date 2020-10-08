const { Router } = require('express')
const {createProdev, getProdev,getIDProdev, deleteProdev, putProdev, patchProdev} = require('../controllers/prodev')
const {authorization,authAll} = require('../middleware/auth')
const router = Router()

router.post('/',authorization, createProdev)
router.get('/',authAll, getProdev)
router.get('/:id',authAll, getIDProdev)
router.put('/:id',authorization, putProdev)
router.delete('/:id',authorization, deleteProdev)
router.patch('/:id',authAll, patchProdev)

module.exports= router
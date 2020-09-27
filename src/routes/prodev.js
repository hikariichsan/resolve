const { Router } = require('express')
const {createProdev, getProdev, deleteProdev, putProdev, patchProdev} = require('../controllers/prodev')
const {authorization} = require('../middleware/auth')
const router = Router()

router.post('/',authorization, createProdev)
router.get('/',authorization, getProdev)
router.put('/:id',authorization, putProdev)
router.delete('/:id',authorization, deleteProdev)
router.patch('/:id',authorization, patchProdev)

module.exports= router
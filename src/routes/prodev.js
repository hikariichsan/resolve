const { Router } = require('express')
const {createProdev, getProdev, deleteProdev, putProdev, patchProdev} = require('../controllers/prodev')

const router = Router()

router.post('/', createProdev)
router.get('/', getProdev)
router.put('/:id', putProdev)
router.delete('/:id', deleteProdev)
router.patch('/:id', patchProdev)

module.exports= router
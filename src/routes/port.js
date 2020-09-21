const { Router } = require('express')
const {createport, getport, deleteport, putport, patchport} = require('../controllers/port')

const router = Router()

router.post('/', createport)
router.get('/', getport)
router.put('/:id', putport)
router.delete('/:id', deleteport)
router.patch('/:id', patchport)

module.exports= router
const { Router } = require('express')
const {createexp, getexp, deleteexp, putexp, patchexp} = require('../controllers/exp')

const router = Router()

router.post('/', createexp)
router.get('/', getexp)
router.put('/:id', putexp)
router.delete('/:id', deleteexp)
router.patch('/:id', patchexp)

module.exports= router
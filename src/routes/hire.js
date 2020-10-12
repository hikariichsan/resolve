  
const { Router } = require('express')

const router = Router()
const { getDataHire, getDataHireById, createHire, updateHire, updatePatchHire, deleteHire } = require('../controllers/hire')
const { authorization, authAll } = require('../middleware/auth')

router.post('/', authorization, createHire)
router.get('/', authAll, getDataHire)
router.get('/:id', authAll, getDataHireById)
router.put('/:id',authorization, updateHire)
router.patch('/:id', authorization, updatePatchHire)
router.delete('/:id',authorization, deleteHire)

module.exports = router
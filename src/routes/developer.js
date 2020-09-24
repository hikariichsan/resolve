const { Router } = require('express')
const {registerDeveloper,getDataDeveloper, deleteDeveloper, putDeveloper, patchDeveloper} = require('../controllers/developer')

const router = Router()

router.post('/register', registerDeveloper)
router.get('/', getDataDeveloper)
router.put('/:id', putDeveloper)
router.delete('/:id', deleteDeveloper)
router.patch('/:id', patchDeveloper)

module.exports= router
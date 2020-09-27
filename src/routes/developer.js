const { Router } = require('express')
const {registerDeveloper,loginDeveloper,getDataDeveloper, deleteDeveloper, putDeveloper, patchDeveloper} = require('../controllers/developer')

const router = Router()

router.post('/register', registerDeveloper)
router.post('/login', loginDeveloper)
router.get('/', getDataDeveloper)
router.put('/:id', putDeveloper)
router.delete('/:id', deleteDeveloper)
router.patch('/:id', patchDeveloper)

module.exports= router
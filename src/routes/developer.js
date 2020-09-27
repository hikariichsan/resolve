const { Router } = require('express')
const {registerDeveloper,loginDeveloper,getDataDeveloper, deleteDeveloper, putDeveloper, patchDeveloper} = require('../controllers/developer')
const {authorizationDev} = require('../middleware/auth')
const router = Router()

router.post('/register', registerDeveloper)
router.post('/login', loginDeveloper)
router.get('/', getDataDeveloper)
router.put('/:id',authorizationDev, putDeveloper)
router.delete('/:id',authorizationDev, deleteDeveloper)
router.patch('/:id',authorizationDev, patchDeveloper)

module.exports= router
const { Router } = require('express')
const {registerRecruiter,loginRecruiter, getDataRecruiter,getDataIDRecruiter, deleteRecruiter, putRecruiter, patchRecruiter} = require('../controllers/recruiter')
const {authorization} = require('../middleware/auth')

const router = Router()


router.post('/register', registerRecruiter)
router.post('/login', loginRecruiter)
router.get('/',authorization,getDataRecruiter)
router.get('/:id',authorization,getDataIDRecruiter)
router.put('/:id',authorization, putRecruiter)
router.delete('/:id',authorization, deleteRecruiter)
router.patch('/:id',authorization, patchRecruiter)

module.exports= router
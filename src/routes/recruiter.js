const { Router } = require('express')
const {registerRecruiter,loginRecruiter, getDataRecruiter, deleteRecruiter, putRecruiter, patchRecruiter} = require('../controllers/recruiter')
const {authorization} = require('../middleware/auth')

const router = Router()


router.post('/register', registerRecruiter)
router.post('/login', loginRecruiter)
router.get('/',getDataRecruiter)
router.put('/:id',authorization, putRecruiter)
router.delete('/:id',authorization, deleteRecruiter)
router.patch('/:id',authorization, patchRecruiter)

module.exports= router
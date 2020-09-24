const { Router } = require('express')
const {registerRecruiter,loginRecruiter, getDataRecruiter, deleteRecruiter, putRecruiter, patchRecruiter} = require('../controllers/recruiter')

const router = Router()


router.post('/register', registerRecruiter)
router.post('/login', loginRecruiter)
router.get('/', getDataRecruiter)
router.put('/:id', putRecruiter)
router.delete('/:id', deleteRecruiter)
router.patch('/:id', patchRecruiter)

module.exports= router
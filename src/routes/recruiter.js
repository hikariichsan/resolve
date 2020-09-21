const { Router } = require('express')
const {createDataRecruiter, getDataRecruiter, deleteRecruiter, putRecruiter, patchRecruiter} = require('../controllers/recruiter')

const router = Router()

router.post('/', createDataRecruiter)
router.get('/', getDataRecruiter)
router.put('/:id', putRecruiter)
router.delete('/:id', deleteRecruiter)
router.patch('/:id', patchRecruiter)

module.exports= router
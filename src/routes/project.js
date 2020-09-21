const { Router } = require('express')
const {createProject, getProject, deleteProject, putProject, patchProject} = require('../controllers/project')

const router = Router()

router.post('/', createProject)
router.get('/', getProject)
router.put('/:id', putProject)
router.delete('/:id', deleteProject)
router.patch('/:id', patchProject)

module.exports= router
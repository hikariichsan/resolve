const { Router } = require('express')
const {createSkill, getSkill, deleteSkill, putSkill, patchSkill} = require('../controllers/skill')

const router = Router()

router.post('/', createSkill)
router.get('/', getSkill)
router.put('/:id', putSkill)
router.delete('/:id', deleteSkill)
router.patch('/:id', patchSkill)

module.exports= router
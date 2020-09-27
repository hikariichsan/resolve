const { Router } = require('express')
const {createSkill, getSkill, deleteSkill, putSkill, patchSkill} = require('../controllers/skill')
const { authorizationDev, authAll} = require('../middleware/auth')

const router = Router()

router.post('/',authorizationDev, createSkill)
router.get('/',authAll, getSkill)
router.put('/:id',authorizationDev, putSkill)
router.delete('/:id',authorizationDev, deleteSkill)
router.patch('/:id',authorizationDev, patchSkill)

module.exports= router
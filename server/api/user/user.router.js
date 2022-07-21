const {
    controller_add,
    controller_get,
    controller_get_by_id,
    controller_update,
    controller_delete,
    controller_login
} = require('./user.controller')
const router = require('express').Router()
const checkToken = require('../../auth/token_validation')

router.post('/register', controller_add)
router.post('/login', controller_login)

router.route('/')
    .get(checkToken, controller_get)
    .patch(checkToken, controller_update)
    .delete(checkToken, controller_delete)

router.route('/:id')
    .get(checkToken, controller_get_by_id)

module.exports = router

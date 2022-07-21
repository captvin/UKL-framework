const {
    controller_add,
    controller_get,
    controller_get_by_id,
    controller_update,
    controller_delete,
    controller_login
} = require('./petugas.controller')
const router = require('express').Router()
const checkToken = require('../../auth/token_validation')

router.route('/')
    .get( controller_get)
    .patch( controller_update)
    .delete(controller_delete)

router.route('/:id')
    .get(checkToken, controller_get_by_id)

module.exports = router

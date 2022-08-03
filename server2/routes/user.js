const Router = require('express').Router()

const {
    get,
    getById,
    getWithPembayaran,
    insert,
    update,
    destroy,
    resultHandler
} = require('../controllers/user')
const schemaValidation = require('../schema_validations/petugas.schema')

Router
    .get('/', get)
    .get('/:id', getById)
    .post('/', schemaValidation, insert)
    .patch('/:id', update)
    .delete('/:id', destroy)

Router
    .use('/', resultHandler)

module.exports = { Router, route: '/user' }
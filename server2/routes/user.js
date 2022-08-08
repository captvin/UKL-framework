const Router = require('express').Router()

const {
    get,
    getById,
    insert,
    update,
    destroy,
    login,
    resultHandler
} = require('../controllers/user')
const schemaValidation = require('../schema_validations/schema-user')

Router
    .get('/', get)
    .get('/:id', getById)
    .post('/', schemaValidation, insert)
    .patch('/:id', update)
    .delete('/:id', destroy)
    .post('/login', login)

Router
    .use('/', resultHandler)

module.exports = { Router, route: '/user' }
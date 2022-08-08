const Router = require('express').Router()
const Auth = require('../middlewares/auth')

const {
    get,
    getById,
    insert,
    update,
    destroy,
    resultHandler
} = require('../controllers/paket')
const schemaValidation = require('../schema_validations/schema-paket')

Router
    .get('/', get)
    .get('/:id', getById)
    .post('/', insert, schemaValidation)
    .patch('/:id', update)
    .delete('/:id', destroy)
    

Router
    .use('/', resultHandler)

module.exports = { Router, route: '/paket' }
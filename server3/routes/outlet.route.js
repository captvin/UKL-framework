const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
const LogRequest = require('@middlewares/log-request')

const { findAll, findById, create, update, remove } = require('@controllers/outlet.controller')
const { UpdateOutletSchema, CreateOutletSchema } = require('@validations/outlet.schema')

const { LoggerMiddleware } = new LogRequest('OUTLET_ROUTE')

Router
    .use(LoggerMiddleware, AuthGuard)
    .post('/', CreateOutletSchema, create)
    .patch('/:id', UpdateOutletSchema, update)
    .get('/', findAll)
    .get('/:id', findById)
    .delete('/:id', remove)

module.exports = { Router, route: '/outlet' }
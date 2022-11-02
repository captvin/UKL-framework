const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
const LogRequest = require('@middlewares/log-request')

const { findAll, findById, create, update, remove } = require('@controllers/paket.controller')
const { UpdatePaketSchema, CreatePaketSchema } = require('@validations/paket.schema')

const { LoggerMiddleware } = new LogRequest('PAKET_ROUTE')

Router
    .use(LoggerMiddleware, AuthGuard)
    .post('/', CreatePaketSchema, create)
    .patch('/:id', UpdatePaketSchema, update)
    .get('/', findAll)
    .get('/:id', findById)
    .delete('/:id', remove)

module.exports = { Router, route: '/paket' }
const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
const LogRequest = require('@middlewares/log-request')

const { findAll, findById, create, update, remove } = require('@controllers/detail.controller')
const { UpdateDetailSchema, CreateDetailSchema } = require('@validations/detail.schema')

const { LoggerMiddleware } = new LogRequest('DETAIL_ROUTE')

Router
    .use(LoggerMiddleware, AuthGuard)
    .post('/', CreateDetailSchema, create)
    .patch('/:id', UpdateDetailSchema, update)
    .get('/', findAll)
    .get('/:id', findById)
    .delete('/:id', remove)

module.exports = { Router, route: '/detail' }
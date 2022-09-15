const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
const LogRequest = require('@middlewares/log-request')

const { findAll, findById, create, update, remove } = require('@controllers/user.controller')
const { UpdateUserSchema, CreateUserSchema } = require('@validations/user.schema')

const { LoggerMiddleware } = new LogRequest('USER_ROUTE')

Router
    .use(LoggerMiddleware, AuthGuard)
    .get('/', findAll)
    .get('/:id', findById)
    .post('/', CreateUserSchema, create)
    .patch('/:id', UpdateUserSchema, update)
    .delete('/:id', remove)

module.exports = { Router, route: '/user' }
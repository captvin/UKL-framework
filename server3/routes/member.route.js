const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
const LogRequest = require('@middlewares/log-request')

const { findAll, findById, create, update, remove } = require('@controllers/member.controller')
const { UpdateMemberSchema, CreateMemberSchema } = require('@validations/member.schema')

const { LoggerMiddleware } = new LogRequest('MEMBER_ROUTE')

Router
    .use(LoggerMiddleware, AuthGuard)
    .get('/', findAll)
    .get('/:id', findById)
    .post('/', CreateMemberSchema, create)
    .patch('/:id', UpdateMemberSchema, update)
    .delete('/:id', remove)

module.exports = { Router, route: '/member' }
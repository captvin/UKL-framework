const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
const LogRequest = require('@middlewares/log-request')

const { findAll, findById, create, update, remove } = require('@controllers/kelas.controller')
const { UpdateKelasSchema, CreateKelasSchema } = require('@validations/kelas.schema')

const { LoggerMiddleware } = new LogRequest('KELAS_ROUTE')

Router
    .use(LoggerMiddleware, AuthGuard)
    .post('/', CreateKelasSchema, create)
    .patch('/:id', UpdateKelasSchema, update)
    .get('/', findAll)
    .get('/:id', findById)
    .delete('/:id', remove)

module.exports = { Router, route: '/kelas' }
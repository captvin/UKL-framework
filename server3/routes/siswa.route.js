const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
const LogRequest = require('@middlewares/log-request')

const { findAll, findById, create, update, remove } = require('@controllers/siswa.controller')
const { UpdateSiswaSchema, CreateSiswaSchema } = require('@validations/siswa.schema')

const { LoggerMiddleware } = new LogRequest('SISWA_ROUTE')

Router
    .use(LoggerMiddleware, AuthGuard)
    .get('/', findAll)
    .get('/:id', findById)
    .post('/', CreateSiswaSchema, create)
    .patch('/:id', UpdateSiswaSchema, update)
    .delete('/:id', remove)

module.exports = { Router, route: '/siswa' }
const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
const LogRequest = require('@middlewares/log-request')
const { findAll, findById, create, update, remove } = require('@controllers/pembayaran.controller')
const { UpdatePembayaranSchema, CreatePembayaranSchema } = require('@validations/pembayaran.schema')

const { LoggerMiddleware } = new LogRequest('PEMBAYARAN_ROUTE')

Router
    .use(LoggerMiddleware, AuthGuard)
    .get('/', findAll)
    .get('/:id', findById)
    .post('/', CreatePembayaranSchema, create)
    .patch('/:id', UpdatePembayaranSchema, update)
    .delete('/:id', remove)

module.exports = { Router, route: '/pembayaran' }
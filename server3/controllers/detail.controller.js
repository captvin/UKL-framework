const { detail} = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const detailSchema = require('../validations/detail.schema')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', detail)) {
        return next(Forbidden())
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const options = {
        offset: (page - 1) * limit,
        limit,
        order: [
            ['createdAt', 'ASC']
        ],
        where: {}
    }

    const { id_paket } = req.query

    if (id_paket) {
        options.where['id_paket'] = id_paket
    }

    const result = await detail.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', detail)) {
        return next(Forbidden())
    }
    const relations = []
    if (req.query.getDetail === 'true') {
        relations.push('transaksi')
    }
    const detail = await detail.findByPk(req.params.id, { include: relations })
    result
        ? res.send(detail)
        : next(NotFound())
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', detail)) {
        return next(Forbidden())
    }
    // const id_paket = req.body.id_paket
    // const total = await paket.findByPk(req.body.id_paket)
    const { body } = req
    const result = await detail.create(body)
    res.json(result)
}

async function update(req, res, next) {
    if (req.user.abilities.cannot('update', detail)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { body } = req
    const result = await detail.update(body, { where: { id } })
    result[0]
        ? res.json({ message: 'Successfully updated' })
        : next(NotFound())
}

async function remove(req, res, next) {
    if (req.user.abilities.cannot('delete', detail)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const result = await detail.destroy({ where: { id } })
    result === 1
        ? res.json({ message: 'Successfully deleted' })
        : next(NotFound())
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}
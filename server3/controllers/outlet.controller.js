const { outlet } = require('@models')
const { NotFound, Forbidden } = require('http-errors')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', outlet)) {
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

    const { alamat } = req.query

    if (alamat) {
        options.where['alamat'] = alamat
    }

    const result = await outlet.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', outlet)) {
        return next(Forbidden())
    }
    const relations = []
    if (req.query.getOutlet === 'true') {
        relations.push('user')
    }
    const outlet = await outlet.findByPk(req.params.id, { include: relations })
    result
        ? res.send(outlet)
        : next(NotFound())
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', outlet)) {
        return next(Forbidden())
    }
    const { body } = req
    const result = await outlet.create(body)
    res.json(result)
}

async function update(req, res, next) {
    if (req.user.abilities.cannot('update', outlet)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { body } = req
    const result = await outlet.update(body, { where: { id } })
    result[0]
        ? res.json({ message: 'Successfully updated' })
        : next(NotFound())
}

async function remove(req, res, next) {
    if (req.user.abilities.cannot('delete', outlet)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const result = await outlet.destroy({ where: { id } })
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
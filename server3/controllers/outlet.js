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

    const { nama } = req.query

    if (nama) {
        options.where['nama'] = nama
    }

    const result = await outlet.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', outlet)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { getUser } = req.query
    const options = {
        include: []
    }
    if (getUser == 'true') options.include.push('user')
    const result = await outlet.findByPk(id, options)
    result
        ? res.json(result)
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
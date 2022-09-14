const { User } = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const { Op } = require('sequelize')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', User)) {
        return next(Forbidden())
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 15

    const options = {
        offset: (page - 1) * limit,
        limit,
        order: [
            ['createdAt', 'ASC']
        ],
        where: {}
    }

    const { name } = req.query

    if (name) {
        options.where['name'] = {
            [Op.like]: `%${name}%`
        }
    }

    const result = await User.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', User)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { getPembayaran, getKelas } = req.query
    const option = {
        include: []
    }
    if (getPembayaran == 'true') option.include.push('pembayaran')
    if (getKelas == 'true') option.include.push('kelas')
    const result = await User.findByPk(id, option)
    result
        ? res.json(result)
        : next(NotFound())
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', User)) {
        return next(Forbidden())
    }
    const { body } = req
    const result = await User.create(body)
    res.json(result)
}

async function update(req, res, next) {
    if (req.user.abilities.cannot('update', User)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { body } = req
    const result = await User.update(body, { where: { id } })
    result[0]
        ? res.json({ message: 'Successfully updated' })
        : next(NotFound())
}

async function remove(req, res, next) {
    if (req.user.abilities.cannot('delete', User)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const result = await User.destroy({ where: { id } })
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
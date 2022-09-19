const { user } = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const { Op } = require('sequelize')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', user)) {
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

    const result = await user.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', user)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { getTransaksi, getKelas } = req.query
    const option = {
        include: []
    }
    if (getPembayaran == 'true') option.include.push('pembayaran')
    if (getKelas == 'true') option.include.push('kelas')
    const result = await user.findByPk(id, option)
    result
        ? res.json(result)
        : next(NotFound())
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', user)) {
        return next(Forbidden())
    }
    try{
        const { body } = req
        const result = await user.create(body)
        res.json(result)
    } catch (err) {
        console.log(err)
    }
    
} 

async function update(req, res, next) {
    if (req.user.abilities.cannot('update', user)) {
        return next(Forbidden())
    }

        const { id } = req.params
        const { body } = req
        const result = await user.update(body, { where: { id } })
        result[0]
        ? res.json({ message: 'Successfully updated' })
        : next(NotFound())
    
    
}

async function remove(req, res, next) {
    if (req.user.abilities.cannot('delete', user)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const result = await user.destroy({ where: { id } })
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
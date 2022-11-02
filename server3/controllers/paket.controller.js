const { paket } = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const { Op } = require('sequelize')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', paket)) {
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

    const { jenis } = req.query

    if (jenis) {
        options.where['jenis'] = {
            [Op.like]: `%${jenis}%`
        }
    }

    const result = await paket.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', paket)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const getDetail = req.query
    const option = {
        include: []
    }
    if (getDetail == 'true') option.include.push('detail')
    const result = await paket.findByPk(id, option)
    result
        ? res.json(result)
        : next(NotFound())
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', paket)) {
        return next(Forbidden())
    }
    const { body } = req
    const jenis = req.body.jenis
    const already =await paket.findOne({where: {jenis}})
    if (already) {
        return res.send({message: "Paket already exists"})
    }
    else{
        const result = await paket.create(body)
        res.send(result)
    }
    
    
} 

async function update(req, res, next) {
    if (req.user.abilities.cannot('update', paket)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { body } = req
    const jenis = req.body.jenis
    const already =await paket.findOne({where: {jenis}})
    if (already) {
        return res.send({message: "Paket already exists"})
    }
    else{
        const result = await paket.update(body, { where: { id } })
        result[0]
            ? res.json({ message: 'Successfully updated' })
            : next(NotFound())
    }
    
}

async function remove(req, res, next) {
    if (req.user.abilities.cannot('delete', paket)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const result = await paket.destroy({ where: { id } })
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
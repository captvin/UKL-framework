const { member } = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const { Op } = require('sequelize')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', member)) {
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

    const { gender } = req.query

    if (gender) {
        options.where['gender'] = {
            [Op.like]: `%${gender}%`
        }
    }

    const result = await member.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', member)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const getTransaksi = req.query
    const option = {
        include: []
    }
    if (getTransaksi == 'true') option.include.push('transaksi')
    const result = await member.findByPk(id, option)
    result
        ? res.json(result)
        : next(NotFound())
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', member)) {
        return next(Forbidden())
    }
    const { body } = req
    const nama = req.body.nama
    const already =await member.findOne({where: {nama}})
    if (already) {
        return res.send({message: "Name already to use"})
    }
    else{
        const result = await member.create(body)
        res.send(result)
    }
    
    
} 

async function update(req, res, next) {
    if (req.user.abilities.cannot('update', member)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { body } = req
    const nama = req.body.nama
    const already =await member.findOne({where: {nama}})
    if (already) {
        return res.send({message: "Name already to use"})
    }
    else{
        const result = await member.update(body, { where: { id } })
        result[0]
            ? res.json({ message: 'Successfully updated' })
            : next(NotFound())
    }
    
}

async function remove(req, res, next) {
    if (req.user.abilities.cannot('delete', member)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const result = await member.destroy({ where: { id } })
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
const { user } = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const { Op } = require('sequelize')
const { hashPass } = require('@utils/hashPass')

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

    const { role, username, name } = req.query
    if (name) {
        options.where['role'] = role
    }
    if (username) {
        options.where['username'] = { [Op.like]: `%${username}%` }
    }
    if (name) {
        options.where['name'] = { [Op.like]: `%${name}%` }
    }

    const result = await user.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', user)) {
        return next(Forbidden())
    }
    const relations = []
    if (req.query.getTransaksi === 'true') {
        relations.push('transaksi')
    }
    const user = await user.findByPk(req.params.id, { include: relations })
    user
        ? res.send(user)
        : next(NotFound())
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', user)) {
        return next(Forbidden())
    }
    const { body } = req
    body.password = await hashPass(body.password)
    const username = req.body.username
    const already =await user.findOne({where: {username}})
    if (already) {
        return res.send({message: "Username already to use"})
    }
    else{
        const result = await user.create(body)
        res.send(result)
    }
    
    
} 

async function update(req, res, next) {
    if (req.user.abilities.cannot('update', user)) {
        return next(Forbidden())
    }

        const { id } = req.params
        const { body } = req
        const data = await user.findOne({where : {id}})
        body.password = (data.password)
        // body.password = await hashPass(body.password)
        const username = req.body.username
        const already =await user.findOne({where: {username}})
        if (already) {
            return res.send({message: "Username already to use"})
        }
        else{
            const result = await user.update(body, { where: { id } })
            result[0]
            ? res.json({ message: 'Successfully updated' })
            : next(NotFound())
        }
       
}

async function changePass(req, res, next) {
    const { abilities } = req.user
    let user = await user.findByPk(req.params.id)
    if (!user) {
        return next(NotFound())
    } else if (abilities.cannot('update', user)) {
        return next(Forbidden())
    }

    const password = await hashPass(req.body.password)
    await user.update({ password })
    return res.send({
        message: "Successfully changed user's password"
    })
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
    remove,
    changePass
}
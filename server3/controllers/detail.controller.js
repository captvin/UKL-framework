const { detail, transaksi, paket, user, member } = require('@models')
const { NotFound, Forbidden } = require('http-errors')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', transaksi)) {
        return next(Forbidden())
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 15

    const options = {
        offset: (page - 1) * limit,
        limit,
        order: [['createdAt', 'ASC']],
        include: [],
        where: {}
    }

    const { tahun, bulan } = req.query

    tahun
        ? options.where.tahun = tahun
        : bulan ? options.where.bulan = bulan
            : null

    const result = await transaksi.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', transaksi)) {
        return next(Forbidden())
    }
    const result = await transaksi.findByPk(req.params.id)
    result
        ? res.json(result)
        : next(NotFound())
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', transaksi)) {
        return next(Forbidden())
    }
    const { body } = req
    const result = await transaksi.create(body)
    res.json(result)
}

async function update(req, res, next) {
    let trans = await transaksi.findByPk(req.params.id)
    if (!trans) {
        return next(NotFound())
    } else if (req.user.abilities.cannot('update', transaksi)) {
        return next(Forbidden())
    }

    const result = await transaksi.update(req.body)
    return res.send({
        message: "Successfully updated transaksi",
        fields: req.body,
        result
    })
}

async function remove(req, res, next) {
    let trans = await transaksi.findByPk(req.params.id)
    if (!trans) {
        return next(NotFound())
    } else if (req.user.abilities.cannot('delete', transaksi)) {
        return next(Forbidden())
    }

    try {
        const result = await transaksi.destroy()
        return res.send({
            message: "Successfully deleted transaksi",
            data: result
        })
    } catch (error) {
        if (error.original.errno == 1451) {
            return next(Forbidden(
                "Delete action for Spp causing related Pembayaran records gone!"
            ))
        }
    }
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}
const  paket  = require('../models')
const model = require('../models/index')

module.exports = {

    get: async function (req, res, next) {
        try {
            const result = await paket.findAll({
            })
            next(result)
        }
        catch (err) {
            next(err)
        }
    },

    getById: async function (req, res, next) {
        try {
            const result = await paket.findByPk(req.params.id, {
                
            }) || []
            next(result)
        }
        catch (err) {
            next(err)
        }
    },

    insert: async function (req, res, next) {
        try {
            const result = await paket.create(req.body);
            next(result)
        } catch (err) {
            next(err)
        }
    },

    update: async function (req, res, next) {
        try {
            const { id } = req.params
            const result = await paket.update(req.body, { where: { id } })
            next(result)
        }
        catch (err) {
            next(err)
        }
    },

    destroy: async function (req, res, next) {
        try {
            const { id } = req.params
            const result = await paket.destroy({ where: { id } })
            next([result])
        }
        catch (err) {
            next(err)
        }
    },

   


    resultHandler: function (prev, req, res, next) {
        if (prev === 0 || prev[0] === 0) {
            const error = [new Error('Tidak ada perubahan'), 501]
            return next(error)
        }
        else if (prev?.length === 0) {
            const error = [new Error('Hasil tidak ditemukan'), 404]
            return next(error)
        }
        else if (prev[0] === 1 || prev === 1) {
            return res.send({
                status: 200,
                msg: req.method === 'PATCH' ? "Sukses mengubah data" : "Sukses menghapus data"
            })
        }
        return res.json(
            {
                status: prev.status || 200,
                msg: prev.message || 'OK',
                data: prev.data || prev
            }
        )
    }
}
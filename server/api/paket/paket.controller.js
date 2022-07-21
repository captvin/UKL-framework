const {
    add,
    get,
    get_by_id,
    update,
    del
} = require('./paket.service')
const { service_callback, response_format } = require('../_utils')

module.exports = {

    controller_add: function (req, res) {
        var { jenis, harga,} = req.body
        const data = { jenis,harga}
        add(data, (err, result) => service_callback(err, result, res))
    }
    ,

    controller_get: function (req, res) {
        get((err, result) => service_callback(err, result, res))
    }
    ,

    controller_get_id: function (req, res) {
        get_by_id(req.params.id, (err, result) => service_callback(err, result, res))
    }
    ,

    controller_update: function (req, res) {
        var { id, jenis, harga} = req.body
        const data = { id, jenis, harga }
        update(data, (err, result) => {
            if (!result[0]) {
                return response_format(res, 0, `Couldn't find paket with id ${id}`).status(404)
            }
            else return service_callback(err, result, res)
        })
    }
    ,

    controller_delete: function (req, res) {
        del(req.body.id, (err, result) => {
            if (!result) {
                return response_format(res, 0, `Couldn't find paket with id ${req.body.id}`).status(404)
            }
            else return service_callback(err, result, res)
        })
    }

}
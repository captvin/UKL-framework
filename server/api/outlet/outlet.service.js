const model = require('../../models/Outlet')

module.exports = {

    add: function (data, callback) {
        model.create(data)
            .then(result => callback(null, result))
            .catch(error => callback(error))
    }
    ,

    get: function (callback) {
        model.findAll()
            .then(result => callback(null, result))
            .catch(error => callback(error))
    }
    ,

    get_by_id: function (id, callback) {
        model.findByPk(id)
            .then(result => callback(null, result))
            .catch(error => callback(error))
    }
    ,

    update: async function (data, callback) {
        model.update(data, { where: { id: data.id } })
            .then(result => callback(null, result))
            .catch(error => callback(error))
    }
    ,

    del: async function (id, callback) {
        model.destroy({ where: { id } })
            .then(result => callback(null, result))
            .catch(error => callback(error))
    }

}
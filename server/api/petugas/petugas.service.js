const model = require('../../models/User')

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

    update: function (data, callback) {
        model.update(data, { where: { id: data.id } })
            .then(result => callback(null, result))
            .catch(error => callback(error))
    }
    ,

    del: function (id, callback) {
        model.destroy({ where: { id }, returning: true })
            .then(result => callback(null, result))
            .catch(error => callback(error))
    }
    ,

    get_user_by_username: function (username, callback) {
        model.findOne({ where: { username } })
            .then(result => callback(null, result))
            .catch(error => callback(error))
    }
}
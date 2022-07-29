const {
    add,
    get,
    get_by_id,
    update,
    del,
    get_user_by_username
} = require('./user.service')

const{send}=require('../../OTP/email')


const bcrypt = require('bcryptjs')

const { sign } = require('jsonwebtoken')
const { service_callback, response_format } = require('../_utils')

require('dotenv').config()

module.exports = {

    controller_add: function (req, res) {
        var { nama_user,tlp, alamat,role, username,email, password } = req.body
        var tlpn= tlp+'@c.us'
        // var data_wa={tlpn, username}
        var data_user = { nama_user, role, username,tlp,email,alamat, password }
    
        const salt = bcrypt.genSaltSync(10);

        data_user.password = bcrypt.hashSync(data_user.password, salt)
        send(tlpn, username)
        add(data_user, (err, result) => service_callback(err, result, res))
    }
    ,

    controller_get: function (req, res) {
        get((err, result) => service_callback(err, result, res))
    }
    ,

    controller_get_by_id: function (req, res) {
        get_by_id(req.params.id, (err, result) => service_callback(err, result, res))
    }
    ,

    controller_update: function (req, res) {
        var { id, nama, role, username } = req.body
        const data = { id, nama, role, username }
        update(data, (err, result) => {
            if (!result[0]) return response_format(res, 0, `Couldn't find petugas with id ${id}`)
            else return service_callback(err, result, res)
        })
    }
    ,

    controller_delete: function (req, res) {
        del(req.body.id, (err, result) => {
            if (!result) {
                return response_format(res, 0, `Couldn't find petugas with id ${req.body.id}`).status(404)
            }
            else return service_callback(err, result, res)
        })
    }
    ,

    
    controller_login: function (req, res) {
        get_user_by_username(req.body.username, (err, results) => {
            if (err) console.log(err)
            else if (!results) {
                return response_format(res, 0, "Invalid username!").status(501)
            }

            const password_matched = bcrypt.compareSync(req.body.password, results.password)

            if (password_matched) {
                results.password = undefined
                const jsonwebtoken = sign(
                    { results },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: "3d" }
                )
                return response_format(res, 1, "Login successful!", { account: results, token: jsonwebtoken })
            }

            else {
                return response_format(res, 0, "Wrong password!",).status(403)
            }

        })
    }

}

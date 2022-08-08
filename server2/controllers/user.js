const  user  = require('../models')
const model = require('../models/index')

module.exports = {

    get: async function (req, res, next) {
        try {
            const result = await user.findAll({
                include: [
                    "outlet",
                    {
                        model:model.outlet,
                        as : "outlet",
                    }
                ]
            })
            next(result)
        }
        catch (err) {
            next(err)
        }
    },

    getById: async function (req, res, next) {
        try {
            const result = await user.findByPk(req.params.id, {
                include: [
                    "outlet",
                    {
                        model:model.outlet,
                        as : "outlet",
                    }
                ]
            }) || []
            next(result)
        }
        catch (err) {
            next(err)
        }
    },

    insert: async function (req, res, next) {
        try {
            const result = await user.create(req.body);
            next(result)
        } catch (err) {
            next(err)
        }
    },

    update: async function (req, res, next) {
        try {
            const { id } = req.params
            const result = await user.update(req.body, { where: { id } })
            next(result)
        }
        catch (err) {
            next(err)
        }
    },

    destroy: async function (req, res, next) {
        try {
            const { id } = req.params
            const result = await user.destroy({ where: { id } })
            next([result])
        }
        catch (err) {
            next(err)
        }
    },

    login: async function (req,res,next){
        get_user_by_email(req.body.email, (err, results) => {
            if (err) console.log(err)
            else if (!results) {
                return response_format(res, 0, "Invalid email!").status(501)
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
    },

    // getWithPembayaran: async function (req, res, next) {
    //     try {
    //         const { id } = req.params
    //         const result = await Petugas.findAll({ include: ['pembayaran'], where: { id } })
    //         next(result)
    //     }
    //     catch (err) {
    //         next(err)
    //     }
    // },

    resultHandler: function (prev, req, res, next) {
        if (prev === 0 || prev[0] === 0) {
            const error = [new Error('Tidak ada perubahan'), 501]
            return next(error)
        }
        else if (prev?.length === 0) {
            const error = [new Error('Hasil tidak ditemukan'), 404]
            return next(error)
        }
        else if (prev?.parent?.code === 'ER_DUP_ENTRY') {
            prev.message = "Username sudah digunakan"
            return next([prev, 409])
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
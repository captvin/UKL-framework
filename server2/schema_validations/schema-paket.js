const { checkSchema, validationResult } = require('express-validator')

module.exports = [
    checkSchema({
        id: {
            isEmpty: true,
        },
        jenis: {
            notEmpty: {
                bail: true,
                errorMessage: "Jenis paket tidak boleh kosong!"
            }
        },
        harga: {
            notEmpty: {
                bail: true,
                errorMessage: "Harga tidak boleh kosong!"
            },
        },
    }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        else {
            next()
        }
    }
]
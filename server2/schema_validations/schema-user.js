const { checkSchema, validationResult } = require('express-validator')

module.exports = [
    checkSchema({
        id: {
            isEmpty: true,
        },
        username: {
            notEmpty: {
                bail: true,
                errorMessage: "Username tidak boleh kosong!"
            }
        },
        password: {
            notEmpty: {
                bail: true,
                errorMessage: "Password tidak boleh kosong!"
            },
            isStrongPassword: {
                errorMessage: "Password harus lebih dari 8 karakter dan terdapat minimal 1 uppercase, 1 angka, dan 1 simbol!"
            }
        },
        namaPetugas: {
            notEmpty: {
                bail: true,
                errorMessage: "Nama tidak boleh kosong!"
            }
        },
        level: {
            notEmpty: {
                bail: true,
                errorMessage: "Level petugas tidak boleh kosong!"
            },
            isIn: {
                options: [["owner", "superadmin", "admin"]],
                errorMessage: "Level hanya dapat bernilai 'owner', 'superadmin', atau 'admin'!"
            }
        }
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
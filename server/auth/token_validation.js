const jwt = require('jsonwebtoken')

require('dotenv').config()
var { JWT_SECRET_KEY } = process.env

function check_token(req, res, next) {
    let token = req.get('authorization')

    if (token) {
        let wow = token.slice(7) // slicing "Bearer "
        jwt.verify(wow, JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.json({
                    success: 0,
                    message: "Login first!"
                })
            }

            else {
                let user = decoded.result
                next()
            }
        })
    }

    else {
        res.json({
            success: 0,
            message: "Access Denied: Unauthorized user!"
        })
    }
}

module.exports = check_token
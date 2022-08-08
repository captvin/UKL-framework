const jwt = require("jsonwebtoken")
require('dotenv').config()
const { JWT_SECRET_KEY } = process.env

const auth = (req, res, next) => {
    let token = req.get("authorization").slice(7)
    if (token == null) {
        res
            .status(401)
            .json({ message: "Unauthorized user" })
    } else {
        jwt.verify(token, JWT_SECRET_KEY, (error, user) => {
            if (error) {
                res
                    .status(401)
                    .json({
                        message: "Invalid token",
                    })
            } else {
                console.log(user);
                next()
            }
        })
    }
}

module.exports = auth
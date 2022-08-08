module.exports = function (err, req, res, next) {
    res.status(err[1])
    res.json({
        errors: [
            {
                status: err[1],
                msg: err[0].message,
                stackTrace: process.env.NODE_ENV ? undefined : err[0].stack
            }
        ]
    })
}
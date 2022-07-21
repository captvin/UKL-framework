const glob = require('glob')
const path = require('path')
const router = require('express').Router()

glob.sync(
    './api/*/*.router.js'
)
    .forEach(file => {
        let module = path.basename(file, '.router.js')
        let module_dir = `${path.parse(file).dir}/${path.parse(file).name}`

        router.use(`/${module}`, require(`${module_dir}`))
    })

module.exports = router
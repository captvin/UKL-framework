const express = require('express')
const router = require('./router/home') // <--
const app = express()

app.use('/', router) // <--

app.listen(3000, function () {
    console.log('aplikasi berjalan pada port 3000')
})
const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
    res.send('Selamat datang di Perpustakaan')
})

module.exports = router
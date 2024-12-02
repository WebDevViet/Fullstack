const express = require('express')
const router = express.Router()

router.use([require('./cookie'), require('./auth')])
module.exports = router

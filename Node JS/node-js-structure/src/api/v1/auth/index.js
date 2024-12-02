const express = require('express')
const router = express.Router()

router.get('/auth', (req, res, next) => {
  res.send('<h1>Auth</h1>')
})

module.exports = router

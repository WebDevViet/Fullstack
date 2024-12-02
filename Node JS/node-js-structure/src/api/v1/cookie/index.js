const express = require('express')
const router = express.Router()

router.get('/get-cookies', (req, res, next) => {
  console.log('🚀 ~ router.get ~ req.signedCookies:', req.signedCookies.name)
  res.json(req.signedCookies)
})

router.get('/set-cookies', (req, res, next) => {
  res.cookie('name', { a: 'a', r: 'r' }, { maxAge: 900000, signed: true })
  res.send('<h1>Cookies Set</h1>')
})

router.get('/delete-cookies', (req, res, next) => {
  res.clearCookie('name')
  res.send('<h1>Cookies Deleted</h1>')
})

module.exports = router

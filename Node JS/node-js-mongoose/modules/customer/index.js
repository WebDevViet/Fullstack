import { Router } from 'express'
const router = Router()

router.post('/customers', function (req, res, next) {
  res.render('index', { title: 'Customer' })
})

export default router

import { Router } from 'express'
import modules from '../modules'
const router = Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.use(modules)

export default router

import { Router } from 'express'
import { getProfileController, getProductsController, loginController, refreshTokenController } from './controller.js'

const router = Router()

const handleRes = (controller) => async (req, res) => {
  const resData = await controller(req)
  res.status(resData.status).send(resData.response)
}

router.post('/login', handleRes(loginController))

router.post('/refresh-token', handleRes(refreshTokenController))

router.get('/profile', handleRes(getProfileController))

router.get('/products', handleRes(getProductsController))

export default router

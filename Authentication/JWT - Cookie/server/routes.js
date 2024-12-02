import { Router } from 'express'
import { getProfileController, getProductsController, loginController, refreshTokenController } from './controller.js'
import { handleReqRes } from './utils/handleReqRes.js'
const router = Router()

router.post('/login', handleReqRes(loginController))
router.post('/refresh-token', handleReqRes(refreshTokenController))
router.get('/logout', handleReqRes(getProductsController))

router.get('/profile', handleReqRes(getProfileController))
router.get('/products', handleReqRes(getProductsController))

export default router

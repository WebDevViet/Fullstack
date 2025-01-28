import CustomRouter from './helper/customRouter.js'

import {
  getProductsController,
  getProfileController,
  loginController,
  logoutController,
  refreshTokenController
} from './controller.js'

import { accessTokenMiddleware, refreshTokenMiddleware, unsealTokenMiddleware } from './middlewares/index.js'

const router = new CustomRouter()

router.post('/login', loginController)

router.use(unsealTokenMiddleware)

router.use(accessTokenMiddleware)
router.use('/refresh-token', refreshTokenMiddleware)

router.get('/logout', logoutController)
router.post('/refresh-token', refreshTokenController)

router.get('/profile', getProfileController)
router.get('/products', getProductsController)

export default router.export()

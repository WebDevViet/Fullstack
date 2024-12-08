// import { Router } from 'express'

// import {
//   getProductsController,
//   getProfileController,
//   loginController,
//   logoutController,
//   refreshTokenController
// } from './controller.js'

// import { accessTokenMiddleware, refreshTokenMiddleware, unsealTokenMiddleware } from './middlewares/index.js'

// import resHandler from './helper/resHandler.js'

// const router = Router()

// router.post('/login', resHandler(loginController))

// router.use(unsealTokenMiddleware)

// router.use(accessTokenMiddleware)
// router.use('/refresh-token', refreshTokenMiddleware)

// router.get('/logout', resHandler(logoutController))
// router.post('/refresh-token', resHandler(refreshTokenController))

// router.get('/profile', resHandler(getProfileController))
// router.get('/products', resHandler(getProductsController))

// export default router

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

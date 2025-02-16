import { Router } from 'express'
const router = Router()

import apiAuth from './auth/authRoutes.ts'
import apiUsers from './users/usersRoutes.ts'
import apiMedias from './medias/mediasRouters.ts'

router.use('/auth', apiAuth)
router.use('/users', apiUsers)
router.use('/medias', apiMedias)

export default router

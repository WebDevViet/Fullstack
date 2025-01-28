import { Router } from 'express'
const router = Router()

import apiAuth from './auth/authRoutes.ts'
import apiUsers from './users/usersRoutes.ts'

router.use('/auth', apiAuth)
router.use('/users', apiUsers)

export default router

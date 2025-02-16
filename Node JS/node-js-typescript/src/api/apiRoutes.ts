import { Router } from 'express'
const router = Router()

import apiAuth from './auth/authRoutes.ts'
import apiUsers from './users/usersRoutes.ts'
import apiFiles from './files/filesRouters.ts'

router.use('/auth', apiAuth)
router.use('/users', apiUsers)
router.use('/files', apiFiles)

export default router

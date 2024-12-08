import { Router } from 'express'
import customer from './customer'
import file from './file'

const router = Router()

router.use('/api', [customer, file])

export default router

import { Router } from 'express'
import mediasControllers from './mediasControllers.ts'
import { reqHandler } from '~/global/utils/reqHandler.ts'

const router = Router()

router.post('/upload-image', reqHandler(mediasControllers.uploadImage))

export default router

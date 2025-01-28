import { Router } from 'express'
import imgMiddleware from './imgMiddleware'
import imgController from './imgController'

const router = Router()

const { uploadImg, uploadListImg } = imgController

router.post('/img', imgMiddleware, uploadImg)
router.post('/imgs', imgMiddleware, uploadListImg)

export default router

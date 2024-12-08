import CustomRouter from '../../helper/customRouter'
import fileMiddleware from './fileMiddleware'
import fileController from './fileController'

const router = new CustomRouter()

const { uploadSingleFile, uploadMultipleFiles } = fileController

router.use(fileMiddleware)
router.post('/file', uploadSingleFile)
router.post('/files', uploadMultipleFiles)

export default router.export()

import { Router } from 'express'
import blogMiddleware from './blogMiddleware'
import blogController from './blogController'

const router = Router()

router.get('/blogs', blogController.get)

router.post('/users/:userId/blogs', blogMiddleware.create, blogController.create)
router.post('/users/:userId/blogs/bulk', blogMiddleware.createBulk, blogController.createBulk)

router.patch('/users/:userId/blogs/:blogId', blogMiddleware.update, blogController.update)

router.delete('/users/:userId/blogs/bulk', blogMiddleware.deleteBulk, blogController.deleteBulk)
router.delete('/users/:userId/blogs/:blogId', blogMiddleware.delete, blogController.delete)

export default router

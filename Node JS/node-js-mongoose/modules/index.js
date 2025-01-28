import { Router } from 'express'
import img from './img'
import user from './user'
import blog from './blog'
import group from './group'

const router = Router()

router.use('/api', [img, user, blog, group])

// host/api/img
// host/api/users
// host/api/blogs
// host/api/groups

export default router

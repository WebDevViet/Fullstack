import { Router } from 'express'
import groupMiddleware from './groupMiddleware'
import groupController from './groupController'

const router = Router()

router.get('/groups', groupController.get)

router.post('/users/:userId/groups', groupMiddleware.create, groupController.create)

router.patch('/groups/:groupId/users/:userId', groupMiddleware.addUser, groupController.addUser)

router.delete('/groups/:groupId/users/:userId', groupMiddleware.removeUser, groupController.removeUser)

export default router

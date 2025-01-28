import createHttpError from 'http-errors'
import { STATUS } from '../../constants'
import groupService from './groupService'

const groupController = {
  get: async (req, res, next) => {
    try {
      const groups = await groupService.get(req.query)
      res.status(STATUS.OK).json(groups)
    } catch (error) {
      return next(createHttpError(STATUS.INTERNAL_SERVER_ERROR, { message: error.message }))
    }
  },
  create: async (req, res, next) => {
    try {
      const insertedGroup = await groupService.create({ groupData: req.body, userId: req.params.userId })

      res.status(STATUS.CREATED).json(insertedGroup)
    } catch (error) {
      return next(createHttpError(STATUS.INTERNAL_SERVER_ERROR, { message: error.message }))
    }
  },
  addUser: async (req, res, next) => {
    try {
      const addedUser = await groupService.addUser({ userId: req.params.userId, groupId: req.params.groupId })

      res.status(STATUS.CREATED).json(addedUser)
    } catch (error) {
      return next(createHttpError(STATUS.INTERNAL_SERVER_ERROR, { message: error.message }))
    }
  },
  removeUser: async (req, res, next) => {
    try {
      const removedUser = await groupService.removeUser({ userId: req.params.userId, groupId: req.params.groupId })

      res.status(STATUS.NO_CONTENT).json(removedUser)
    } catch (error) {
      return next(createHttpError(STATUS.INTERNAL_SERVER_ERROR, { message: error.message }))
    }
  }
}

export default groupController

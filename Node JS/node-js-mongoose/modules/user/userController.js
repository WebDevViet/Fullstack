import createHttpError from 'http-errors'
import imgService from '../img/imgService'
import userService from './userService'
import { STATUS } from '../../constants'

const userController = {
  get: async (req, res, next) => {
    try {
      const users = await userService.get(req.query)
      res.status(STATUS.OK).json(users)
    } catch (error) {
      return next(createHttpError(STATUS.INTERNAL_SERVER_ERROR, { message: error.message }))
    }
  },
  create: async (req, res, next) => {
    try {
      let image = ''

      if (req.files && Object.keys(req.files).length > 0) {
        const { response } = await imgService.uploadImg(req?.files?.image)
        image = response.location
      }

      const insertedUser = await userService.create({ ...req.body, image })

      res.status(STATUS.CREATED).json(insertedUser)
    } catch (error) {
      return next(createHttpError(STATUS.INTERNAL_SERVER_ERROR, { message: error.message }))
    }
  },
  createBulk: async (req, res, next) => {
    try {
      const insertedUsers = await userService.createBulk(req.body)

      res.status(STATUS.CREATED).json(insertedUsers)
    } catch (error) {
      return next(createHttpError(STATUS.INTERNAL_SERVER_ERROR, { message: error.message }))
    }
  },
  update: async (req, res, next) => {
    try {
      const updatedUser = await userService.update({ _id: req.params.userId, ...req.body })

      res.status(STATUS.NO_CONTENT).json(updatedUser)
    } catch (error) {
      return next(createHttpError(STATUS.INTERNAL_SERVER_ERROR, { message: error.message }))
    }
  },
  delete: async (req, res, next) => {
    try {
      const deletedUser = await userService.delete(req.params.userId)

      res.status(STATUS.NO_CONTENT).json(deletedUser)
    } catch (error) {
      return next(createHttpError(STATUS.INTERNAL_SERVER_ERROR, { message: error.message }))
    }
  },
  restore: async (req, res, next) => {
    try {
      const restoredUser = await userService.restore(req.params.userId)

      res.status(STATUS.NO_CONTENT).json(restoredUser)
    } catch (error) {
      return next(createHttpError(STATUS.INTERNAL_SERVER_ERROR, { message: error.message }))
    }
  },
  deleteBulk: async (req, res, next) => {
    try {
      const deletedUsers = await userService.deleteBulk(req.body)

      res.status(STATUS.NO_CONTENT).json(deletedUsers)
    } catch (error) {
      return next(createHttpError(STATUS.INTERNAL_SERVER_ERROR, { message: error.message }))
    }
  }
}

export default userController

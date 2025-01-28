import createHttpError from 'http-errors'
import { STATUS } from '../../constants'
import blogService from './blogService'

const blogController = {
  get: async (req, res, next) => {
    try {
      const blogs = await blogService.get(req.query)
      res.status(STATUS.OK).json(blogs)
    } catch (error) {
      return next(createHttpError(STATUS.INTERNAL_SERVER_ERROR, { message: error.message }))
    }
  },
  create: async (req, res, next) => {
    try {
      const insertedBlog = await blogService.create({ blogData: req.body, userId: req.params.userId })

      res.status(STATUS.CREATED).json(insertedBlog)
    } catch (error) {
      return next(createHttpError(STATUS.INTERNAL_SERVER_ERROR, { message: error.message }))
    }
  },
  createBulk: async (req, res, next) => {
    try {
      const insertedBlogs = await blogService.createBulk({ blogData: req.body, userId: req.params.userId })

      res.status(STATUS.CREATED).json(insertedBlogs)
    } catch (error) {
      return next(createHttpError(STATUS.INTERNAL_SERVER_ERROR, { message: error.message }))
    }
  },
  update: async (req, res, next) => {
    try {
      const updatedBlog = await blogService.update({
        blogId: req.params.blogId,
        userId: req.params.userId,
        blogData: req.body
      })

      res.status(STATUS.NO_CONTENT).json(updatedBlog)
    } catch (error) {
      return next(createHttpError(STATUS.INTERNAL_SERVER_ERROR, { message: error.message }))
    }
  },
  delete: async (req, res, next) => {
    try {
      const deletedBlog = await blogService.delete({ blogId: req.params.blogId, userId: req.params.userId })

      res.status(STATUS.NO_CONTENT).json(deletedBlog)
    } catch (error) {
      return next(createHttpError(STATUS.INTERNAL_SERVER_ERROR, { message: error.message }))
    }
  },
  deleteBulk: async (req, res, next) => {
    try {
      const deletedBlogs = await blogService.deleteBulk({ blogIds: req.body, userId: req.params.userId })

      res.status(STATUS.NO_CONTENT).json(deletedBlogs)
    } catch (error) {
      return next(createHttpError(STATUS.INTERNAL_SERVER_ERROR, { message: error.message }))
    }
  }
}

export default blogController

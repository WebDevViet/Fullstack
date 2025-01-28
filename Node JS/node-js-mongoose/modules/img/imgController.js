import { STATUS } from '../../constants'
import imgService from './imgService'

const imgController = {
  uploadImg: async (req, res, next) => {
    try {
      const resData = await imgService.uploadImg(req?.files?.image)
      res.status(resData.status).json(resData.response)
    } catch (error) {
      next(createHttpError(STATUS.INTERNAL_SERVER_ERROR, error))
    }
  },
  uploadListImg: async (req, res, next) => {
    try {
      let resData = null

      if (Array.isArray(req?.files?.image)) {
        resData = await imgService.uploadListImg(req?.files?.image)
      } else {
        resData = await imgService.uploadImg(req?.files?.image)
      }

      res.status(resData.status).json(resData.response)
    } catch (error) {
      next(createHttpError(STATUS.INTERNAL_SERVER_ERROR, error))
    }
  }
}

export default imgController

import { configSetCookie } from '../config.js'
import { STATUS } from '../constants.js'
import IronHandler from '../utils/ironHandler.js'

const responseHandler = (controller) => async (req, res, next) => {
  try {
    const resData = await controller(req, res, next)

    if (resData.token) {
      const ironHandler = new IronHandler()
      const tokenSealed = await ironHandler.seal(resData.token)

      res.cookie('token', tokenSealed, configSetCookie)
    }
    res.status(resData.status).json(resData.response)
  } catch (error) {
    console.log('🚀 ~ resHandler ~ error:', error)
    if (!error.status) return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
    res.status(error.status).json(error.response)
  }
}

export default responseHandler

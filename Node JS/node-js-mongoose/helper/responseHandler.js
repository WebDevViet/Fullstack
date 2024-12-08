import { STATUS } from '../constants.js'

const responseHandler = (controller) => async (req, res, next) => {
  try {
    const resData = await controller(req, res, next)
    if (!resData?.status) throw { error: 'resData error', resData }
    res.status(resData.status).json(resData.response)
  } catch (error) {
    console.error('🚀 ~ responseHandler ~ error:', error)
    if (!error.status) return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
    res.status(error.status).json(error.response)
  }
}

export default responseHandler

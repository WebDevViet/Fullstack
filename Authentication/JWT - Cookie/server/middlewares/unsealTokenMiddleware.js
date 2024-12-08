import IronHandler from '../utils/ironHandler.js'

export const unsealTokenMiddleware = async (req, res, next) => {
  try {
    const ironHandler = new IronHandler()
    req.token = await ironHandler.unseal(req.cookies?.token)
    return next()
  } catch (error) {
    return res.status(error.status).json(error.response)
  }
}

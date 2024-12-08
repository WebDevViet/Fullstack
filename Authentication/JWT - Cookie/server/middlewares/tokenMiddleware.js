import { STATUS, TOKEN_TYPE } from '../constants.js'
import TokenHandler from '../helper/jwt.js'
import BlackListToken from '../models/blackListToken.js'

const validateToken = async (token, tokenType) => {
  const tokenValidator = new TokenHandler(tokenType)
  const tokenPayload = await tokenValidator.verify(token)

  const revokedToken = await BlackListToken.findOne({ token })
  if (revokedToken) {
    throw {
      status: STATUS.UNAUTHORIZED,
      response: { message: 'Token has been revoked. Please log in again.' }
    }
  }

  return tokenPayload
}

export const accessTokenMiddleware = async (req, res, next) => {
  if (req.path === '/refresh-token') {
    return next()
  }

  const token = req?.token?.accessToken

  try {
    req.tokenPayload = await validateToken(token, TOKEN_TYPE.ACCESS_TOKEN)
    next()
  } catch (error) {
    return res.status(error.status).json(error.response)
  }
}

export const refreshTokenMiddleware = async (req, res, next) => {
  const token = req?.token?.refreshToken

  try {
    req.tokenPayload = await validateToken(token, TOKEN_TYPE.REFRESH_TOKEN)
    next()
  } catch (error) {
    return res.status(error.status).json(error.response)
  }
}

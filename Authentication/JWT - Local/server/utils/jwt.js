import jwt from 'jsonwebtoken'
import config from '../config.js'
import { STATUS, tokenType } from '../constants.js'

const typeAccessToken = tokenType.accessToken

export const signToken = (payload, token_life) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.jwt_secret_key, { expiresIn: token_life }, (error, token) => {
      if (error) {
        return reject(error)
      }
      resolve(token)
    })
  })
}

export const verifyToken = (token, tokenType = typeAccessToken) => {
  try {
    return jwt.verify(token, config.jwt_secret_key)
  } catch (error) {
    const isTokenExp = error.name === 'TokenExpiredError'
    throw {
      status: STATUS.UNAUTHORIZED,
      response: {
        message: `${tokenType} ${isTokenExp ? 'hết hạn' : 'không hợp lệ'}`,
        name: `${isTokenExp ? 'EXPIRED' : 'INVALID'}_${tokenType}`
      }
    }
  }
}

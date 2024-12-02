import jwt from 'jsonwebtoken'
import { STATUS, TOKEN_TYPE } from '../constants.js'

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export const signToken = (payload, expiresIn, options = {}) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET_KEY, { expiresIn, ...options }, (error, token) => {
      if (error) {
        return reject({
          status: STATUS.INTERNAL_SERVER_ERROR,
          response: { message: 'Internal server error' }
        })
      }
      resolve(token)
    })
  })
}

export const verifyToken = (token, options = {}, tokenType = TOKEN_TYPE.ACCESS_TOKEN) => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY, options) // chạy đồng bộ
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

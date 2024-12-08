import jwt from 'jsonwebtoken'
import { STATUS, TOKEN_TYPE } from '../constants.js'
import { configJWT } from '../config.js'

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export default class TokenHandler {
  constructor(tokenType = TOKEN_TYPE.ACCESS_TOKEN) {
    this.tokenType = tokenType

    // Lấy các thông số audience và issuer từ config hoặc để mặc định là rỗng
    const { audience = '', issuer = '' } = configJWT
    this.options = { audience, issuer }
  }

  /**
   * Tạo một token
   * @param {Object} payload - Dữ liệu cần mã hóa trong token
   * @param {string | number} expiresIn - Thời gian hết hạn của token (ví dụ: "1h" hoặc 3600)
   * @param {Object} options - Các tùy chọn bổ sung cho jwt.sign
   * @returns {Promise<string>} - Token đã được ký
   */
  async sign(payload, expiresIn, options = {}) {
    if (!payload || typeof payload !== 'object') {
      throw {
        status: STATUS.BAD_REQUEST,
        response: { message: 'Payload must be an object' }
      }
    }

    return new Promise((resolve, reject) => {
      jwt.sign(payload, JWT_SECRET_KEY, { expiresIn, ...this.options, ...options }, (error, token) => {
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

  /**
   * Xác thực token
   * @param {string} token - Token cần xác thực
   * @returns {Promise<Object>} - Dữ liệu giải mã từ token
   */
  async verify(token) {
    if (!token) {
      throw {
        status: STATUS.BAD_REQUEST,
        response: { message: 'Token is required' }
      }
    }

    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET_KEY, this.options, (error, decoded) => {
        if (error) {
          const isTokenExp = error.name === 'TokenExpiredError'
          return reject({
            status: STATUS.UNAUTHORIZED,
            response: {
              message: `${isTokenExp ? 'Expired' : 'Invalid'} ${this.tokenType.toLocaleLowerCase()}`,
              name: `${isTokenExp ? 'EXPIRED' : 'INVALID'}_${this.tokenType}`
            }
          })
        }

        // Kiểm tra tokenType trong payload có trùng với tokenType của class không
        if (decoded.tokenType !== this.tokenType) {
          return reject({
            status: STATUS.UNAUTHORIZED,
            response: { message: 'Invalid token type' }
          })
        }

        resolve(decoded)
      })
    })
  }
}

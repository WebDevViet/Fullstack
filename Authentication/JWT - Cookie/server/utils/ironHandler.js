import Iron from '@hapi/iron'
import { STATUS } from '../constants.js'

class IronHandler {
  constructor() {
    this.secretKey = process.env.IRON_SECRET_KEY
    this.options = Iron.defaults
  }

  async seal(token) {
    try {
      if (!token || typeof token !== 'object') {
        throw new Error('Token must be a valid object')
      }
      return await Iron.seal(token, this.secretKey, this.options)
    } catch (error) {
      console.log('🚀 ~ IronHandler ~ seal ~ error:', error.message)
      throw {
        status: STATUS.INTERNAL_SERVER_ERROR,
        response: { message: 'Internal server error' }
      }
    }
  }

  async unseal(sealedToken) {
    try {
      if (!sealedToken || typeof sealedToken !== 'string') {
        throw new Error('Invalid token')
      }
      return await Iron.unseal(sealedToken, this.secretKey, this.options)
    } catch (error) {
      console.log('🚀 ~ IronHandler ~ unseal ~ error:', error.message)
      throw {
        status: STATUS.INTERNAL_SERVER_ERROR,
        response: { message: error.message || 'Internal server error' }
      }
    }
  }
}

export default IronHandler

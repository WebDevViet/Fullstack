import User from '../models/user.js'
import { configJWT } from '../config.js'
import { verifyToken } from './jwt.js'
import { STATUS } from '../constants.js'

const { audience, issuer } = configJWT

const verifyUserByToken = async (token, tokenType) => {
  const { sub: userID } = verifyToken(token, { audience, issuer }, tokenType)
  const user = await User.findById(userID).lean().exec()

  if (!user) {
    throw {
      status: STATUS.NOT_FOUND,
      response: { message: 'Không tồn tại user' }
    }
  }

  return user
}

export default verifyUserByToken

import bcrypt from 'bcrypt'

import Product from './models/product.js'
import User from './models/user.js'
import BlackListToken from './models/blackListToken.js'

import { configJWT } from './config.js'
import { STATUS, TOKEN_TYPE } from './constants.js'
import TokenHandler from './helper/jwt.js'
import { UAParser } from 'ua-parser-js'

const tokenHandler = new TokenHandler()

const { audience, issuer } = configJWT
const options = { audience, issuer }
export const loginController = async (req) => {
  const body = req.body
  const { email, password } = body

  if (!email || !password) {
    throw {
      status: STATUS.BAD_REQUEST,
      response: { message: 'Email and password are required' }
    }
  }

  const user = await User.findOne({ email }).exec()

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw {
      status: STATUS.UNAUTHORIZED,
      response: {
        message: 'Email or password is incorrect'
      }
    }
  }

  const userAgent = UAParser(req.headers['user-agent'])
  options.subject = `${user.name} / ${userAgent.os.name}`

  const accessToken$ = tokenHandler.sign(
    {
      userId: user._id,
      username: user.name,
      tokenType: TOKEN_TYPE.ACCESS_TOKEN
    },
    configJWT.JWT_EXP_ACCESS_TOKEN,
    options
  )
  const refreshToken$ = tokenHandler.sign(
    {
      userId: user._id,
      username: user.name,
      tokenType: TOKEN_TYPE.REFRESH_TOKEN
    },
    configJWT.JWT_EXP_REFRESH_TOKEN,
    options
  )
  const [accessToken, refreshToken] = await Promise.all([accessToken$, refreshToken$])

  return {
    status: STATUS.OK,
    response: {
      message: 'Login success'
    },
    token: {
      accessToken,
      refreshToken
    }
  }
}

export const refreshTokenController = async (req) => {
  const { userId, username, sub } = req?.tokenPayload
  options.subject = sub

  const accessToken$ = tokenHandler.sign(
    {
      userId,
      username,
      tokenType: TOKEN_TYPE.ACCESS_TOKEN
    },
    configJWT.JWT_EXP_ACCESS_TOKEN,
    options
  )

  const refreshToken$ = tokenHandler.sign(
    {
      userId,
      username,
      tokenType: TOKEN_TYPE.REFRESH_TOKEN
    },
    configJWT.JWT_EXP_REFRESH_TOKEN,
    options
  )

  const [accessToken, refreshToken] = await Promise.all([accessToken$, refreshToken$])

  const refreshTokenOld = req?.token?.refreshToken
  await BlackListToken.create({ token: refreshTokenOld, type: TOKEN_TYPE.REFRESH_TOKEN })

  return {
    status: STATUS.OK,
    response: {
      message: 'Refresh Token success'
    },
    token: {
      accessToken,
      refreshToken
    }
  }
}

export const getProfileController = async (req) => {
  const { userId } = req?.tokenPayload
  const user = await User.findById(userId).lean().exec()

  if (!user) {
    throw {
      status: STATUS.NOT_FOUND,
      response: { message: 'User not found' }
    }
  }

  delete user.password

  return {
    status: STATUS.OK,
    response: { message: 'Get profile success', data: user }
  }
}

export const getProductsController = async () => {
  const products = await Product.find({}).exec()

  if (!products) {
    throw {
      status: STATUS.NOT_FOUND,
      response: { message: 'Products not found' }
    }
  }

  return {
    status: STATUS.OK,
    response: { message: 'Get products success', data: products }
  }
}

export const logoutController = async (req, res) => {
  const { accessToken, refreshToken } = req?.token

  try {
    const refreshTokenVerifier = new TokenHandler(TOKEN_TYPE.REFRESH_TOKEN)
    await Promise.all([
      BlackListToken.create({ token: accessToken, type: TOKEN_TYPE.ACCESS_TOKEN }),
      refreshTokenVerifier.verify(refreshToken)
    ])
    await BlackListToken.create({ token: refreshToken, type: TOKEN_TYPE.REFRESH_TOKEN })
  } catch (error) {
    if (error.response.name !== `EXPIRED_${TOKEN_TYPE.REFRESH_TOKEN}`) {
      throw error
    }
  } finally {
    res.clearCookie('token')
  }

  return {
    status: STATUS.OK,
    response: { message: 'Logout success' }
  }
}

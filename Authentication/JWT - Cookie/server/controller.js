import fs from 'fs'
import bcrypt from 'bcrypt'

import User from './models/user.js'
import Token from './models/token.js'
import Product from './models/product.js'

import { configJWT } from './config.js'
import { STATUS, TOKEN_TYPE } from './constants.js'
import { signToken } from './helper/jwt.js'
import verifyUserByToken from './helper/verifyToken.js'

const { audience, issuer } = configJWT
const options = { audience, issuer }
export const loginController = async (req) => {
  const body = req.body
  const { email, password } = body

  if (!email || !password) {
    throw {
      status: STATUS.BAD_REQUEST,
      response: { message: 'Email và mật khẩu là bắt buộc.' }
    }
  }

  const user = await User.findOne({ email }).exec()

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw {
      status: STATUS.UNAUTHORIZED,
      response: {
        message: 'Email hoặc mật khẩu chưa chính xác!'
      }
    }
  }

  options.subject = user._id.toString()

  const accessToken$ = signToken(
    {
      username: user.name,
      tokenType: TOKEN_TYPE.ACCESS_TOKEN
    },
    configJWT.JWT_EXP_ACCESS_TOKEN,
    options
  )
  const refreshToken$ = signToken(
    {
      username: user.name,
      tokenType: TOKEN_TYPE.REFRESH_TOKEN
    },
    configJWT.JWT_EXP_REFRESH_TOKEN,
    options
  )
  const [access_token, refresh_token] = await Promise.all([accessToken$, refreshToken$])
  // stateless => token được lưu ở client thôi
  return {
    status: STATUS.OK,
    response: {
      message: 'Đăng nhập thành công'
    },
    token: {
      access_token,
      refresh_token
    }
  }
}

export const refreshTokenController = async (req) => {
  const refresh_token = req.cookies?.token?.refresh_token

  if (!refresh_token) {
    throw {
      status: STATUS.BAD_REQUEST,
      response: { message: 'Token không hợp lệ' }
    }
  }

  const user = await verifyUserByToken(refresh_token, TOKEN_TYPE.REFRESH_TOKEN)

  options.subject = user._id.toString()
  const access_token = await signToken(
    {
      username: user.name,
      tokenType: TOKEN_TYPE.ACCESS_TOKEN
    },
    configJWT.JWT_EXP_ACCESS_TOKEN,
    options
  )

  return {
    status: STATUS.OK,
    response: {
      message: 'Refresh Token thành công'
    },
    token: {
      access_token,
      refresh_token
    }
  }
}

export const getProfileController = async (req) => {
  const access_token = req.cookies?.token?.access_token

  if (!access_token) {
    throw {
      status: STATUS.BAD_REQUEST,
      response: { message: 'Token không hợp lệ' }
    }
  }

  const user = await verifyUserByToken(access_token, TOKEN_TYPE.ACCESS_TOKEN)
  delete user.password

  return {
    status: STATUS.OK,
    response: { message: 'Lấy thông tin profile thành công', data: user }
  }
}

export const getProductsController = async (req) => {
  const access_token = req.cookies?.token?.access_token

  if (!access_token) {
    throw {
      status: STATUS.BAD_REQUEST,
      response: { message: 'Token không hợp lệ' }
    }
  }

  await verifyUserByToken(access_token, TOKEN_TYPE.ACCESS_TOKEN)

  const products = await Product.find({}).exec()

  if (!products) {
    throw {
      status: STATUS.NOT_FOUND,
      response: { message: 'Không tìm thấy sản phẩm' }
    }
  }

  return {
    status: STATUS.OK,
    response: { message: 'Lấy dang sách sản phẩm thành công', data: products }
  }
}

export const logoutController = async (req, res) => {}

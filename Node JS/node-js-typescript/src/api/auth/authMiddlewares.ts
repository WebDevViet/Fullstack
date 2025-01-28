import { Joi, validateBody } from 'express-joi-validations'
import createHttpError from 'http-errors'
import { ObjectId } from 'mongodb'
import mongoDB from '~/config/database/mongoDB.ts'
import { UserVerifyStatus } from '~/global/constants/enum.ts'
import { verifyToken } from '~/global/helpers/handleJWT.ts'
import type { AccessTokenPayload } from '~/global/types/JWT.ts'
import { bearerTokenRegex, jwtRegex } from '~/global/utils/regex.ts'
import { validateAsyncBody, validateAsyncHeaders } from '~/global/utils/validate.ts'
import { userValid } from '../users/schemas/usersSchemas.ts'
import usersServices from '../users/usersServices.ts'
import { AUTH_MESSAGES } from './constants/authMessages.ts'

class TokenValidate {
  authorization = Joi.string()
    .required()
    .regex(bearerTokenRegex)
    .messages({ 'string.pattern.base': '{{#label}} is invalid' })
    .label('Access token')

  refreshToken = Joi.string()
    .required()
    .regex(jwtRegex)
    .external(async (token) => {
      try {
        const [refreshToken] = await Promise.all([
          mongoDB.refreshTokens.findOne({ token }),
          verifyToken({ token, secretKey: process.env.REFRESH_TOKEN_SECRET_KEY })
        ])

        if (!refreshToken) {
          throw new Error('used or does not exist') // {{#label}} used or does not exist
        }

        return token
      } catch (error: any) {
        throw createHttpError.Unauthorized(error.message)
      }
    })
    .label('Refresh token')
    .messages({ 'string.pattern.base': '{{#label}} is invalid' })

  forgotPasswordToken = Joi.string()
    .required()
    .regex(jwtRegex)
    .external(async (token) => {
      try {
        const { userId } = await verifyToken({
          token,
          secretKey: process.env.FORGOT_PASSWORD_TOKEN_SECRET_KEY
        })

        const user = await usersServices.getUserById(userId)

        if (!user) {
          throw createHttpError.NotFound(AUTH_MESSAGES.USER_NOT_FOUND)
        }

        if (user.forgot_password_token !== token) {
          throw new Error('is invalid') // {{#label}} is invalid
        }

        return new ObjectId(userId)
      } catch (error: any) {
        if (error instanceof createHttpError.HttpError) throw error
        throw createHttpError.Unauthorized(error.message)
      }
    })
    .label('Forgot password token')
    .messages({ 'string.pattern.base': '{{#label}} is invalid' })
}

class AuthValidate extends TokenValidate {
  // Authorization
  accessToken = validateAsyncHeaders(
    Joi.object({
      authorization: this.authorization.external(async (token: string) => {
        token = token.replace('Bearer ', '')
        try {
          const { userId } = await verifyToken<AccessTokenPayload>({
            token,
            secretKey: process.env.ACCESS_TOKEN_SECRET_KEY
          })
          return new ObjectId(userId)
        } catch (error: any) {
          throw createHttpError.Unauthorized(error.message)
        }
      })
    }).options({ stripUnknown: true }),
    { valueField: 'authorization', nameAssignment: 'userId' }
  )

  // Register
  register = validateBody(
    Joi.object({
      name: userValid.extract('name'),
      email: userValid.extract('email'),
      password: userValid.extract('password'),
      confirmPassword: userValid.extract('confirmPassword'),
      dateOfBirth: userValid.extract('dateOfBirth')
    }).options({ presence: 'required', abortEarly: false })
  )

  // Login
  login = validateBody(
    Joi.object({ email: userValid.extract('email'), password: userValid.extract('password') }).options({
      presence: 'required',
      abortEarly: false
    })
  )

  // Logout
  logout = validateAsyncBody(Joi.object({ refreshToken: this.refreshToken }))

  // Email
  verifyEmail = validateAsyncBody(
    Joi.object({
      emailVerificationToken: Joi.string()
        .required()
        .regex(jwtRegex)
        .external(async (token) => {
          try {
            await verifyToken({
              token,
              secretKey: process.env.EMAIL_VERIFICATION_TOKEN_SECRET_KEY
            })

            return token
          } catch (error: any) {
            throw createHttpError.Unauthorized(error.message)
          }
        })
        .label('Email verification token')
        .messages({ 'string.pattern.base': '{{#label}} is invalid' })
    })
  )

  verifiedUser = validateAsyncHeaders(
    Joi.object({
      authorization: this.authorization.external(async (token: string) => {
        token = token.replace('Bearer ', '')
        try {
          const { userId, userVerifyStatus } = await verifyToken<AccessTokenPayload>({
            token,
            secretKey: process.env.ACCESS_TOKEN_SECRET_KEY
          })

          if (userVerifyStatus !== UserVerifyStatus.Verified) {
            throw createHttpError.Forbidden(AUTH_MESSAGES.USER_NOT_VERIFIED)
          }

          return new ObjectId(userId)
        } catch (error: any) {
          if (error instanceof createHttpError.HttpError) throw error
          throw createHttpError.Unauthorized(error.message)
        }
      })
    }).options({ stripUnknown: true }),
    { valueField: 'authorization', nameAssignment: 'userId' }
  )

  // Password
  forgotPassword = validateAsyncBody(
    Joi.object({
      email: Joi.string().required().email().label('Email').messages({ 'string.pattern.base': '{{#label}} is invalid' })
    })
  )

  verifyForgotPasswordToken = validateAsyncBody(Joi.object({ forgotPasswordToken: this.forgotPasswordToken }))

  resetPassword = validateAsyncBody(
    Joi.object({
      forgotPasswordToken: this.forgotPasswordToken,
      password: userValid.extract('password'),
      confirmPassword: userValid.extract('confirmPassword')
    }),
    { valueField: 'forgotPasswordToken', nameAssignment: 'userId' }
  )
}

const authValidates = new AuthValidate()
export default authValidates

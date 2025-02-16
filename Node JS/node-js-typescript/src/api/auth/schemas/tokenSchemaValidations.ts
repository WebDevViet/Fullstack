import createHttpError from 'http-errors'
import { z } from 'zod'
import mongoDB from '~/config/database/mongoDB.ts'
import { verifyToken } from '~/global/helpers/handleJWT.ts'
import { BEARER_TOKEN_REGEX, JWT_REGEX } from '~/global/constants/regex.ts'
import { AUTH_MESSAGES } from '../constants/authMessages.ts'

export default class TokenSchemaValidations {
  authorization = z
    .string()
    .regex(BEARER_TOKEN_REGEX, { message: AUTH_MESSAGES.AUTHORIZATION_INVALID })
    .transform((value) => value.replace('Bearer ', ''))

  refreshToken = z
    .string()
    .regex(JWT_REGEX, { message: AUTH_MESSAGES.REFRESH_TOKEN_INVALID })
    .refine(async (token) => {
      const [refreshToken] = await Promise.all([
        mongoDB.refreshTokens.findOne({ token }),
        verifyToken({ token, secretKey: process.env.REFRESH_TOKEN_SECRET_KEY, label: 'Refresh token' })
      ])

      if (!refreshToken) {
        throw createHttpError.NotFound(AUTH_MESSAGES.REFRESH_TOKEN_USED_OR_NOT_EXIST)
      }

      return true
    })

  emailVerificationToken = z
    .string()
    .regex(JWT_REGEX, { message: AUTH_MESSAGES.EMAIL_VERIFICATION_TOKEN_INVALID })
    .refine(async (token) => {
      await verifyToken({
        token,
        secretKey: process.env.EMAIL_VERIFICATION_TOKEN_SECRET_KEY,
        label: 'Email verification token'
      })

      return true
    })

  forgotPasswordToken = z.string().regex(JWT_REGEX, { message: AUTH_MESSAGES.FORGOT_PASSWORD_TOKEN_INVALID })
}

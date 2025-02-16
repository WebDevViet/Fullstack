import type { Request } from 'express'
import createHttpError from 'http-errors'
import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '~/global/constants/enum.ts'
import { verifyToken } from '~/global/helpers/handleJWT.ts'
import type { AccessTokenPayload } from '~/global/types/JWT.ts'
import { validateBody, validateHeaders } from '~/global/utils/validate.ts'
import usersServices from '../users/usersServices.ts'
import { AUTH_MESSAGES } from './constants/authMessages.ts'
import AuthSchemaValidations, { type AuthSchemaTypes } from './schemas/authSchemaValidations.ts'
import { USERS_MESSAGES } from '../users/constants/usersMessages.ts'

class AuthMiddlewares extends AuthSchemaValidations {
  accessToken = validateHeaders<AuthSchemaTypes['accessTokenSchema']>(
    this.accessTokenSchema,
    async ({ authorization: token }, req) => {
      const { userId } = await verifyToken<AccessTokenPayload>({
        token,
        secretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
        label: 'Access token'
      })

      req.userId = new ObjectId(userId)
    }
  )

  verifiedUser = validateHeaders<AuthSchemaTypes['accessTokenSchema']>(
    this.accessTokenSchema,
    async ({ authorization: token }, req) => {
      const { userId, userVerifyStatus } = await verifyToken<AccessTokenPayload>({
        token,
        secretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
        label: 'Access token'
      })

      if (userVerifyStatus !== UserVerifyStatus.Verified) {
        throw createHttpError.Unauthorized(AUTH_MESSAGES.USER_NOT_VERIFIED)
      }

      req.userId = new ObjectId(userId)
    }
  )

  register = validateBody(this.registerSchema)

  login = validateBody(this.loginSchema)

  logout = validateBody(this.logoutSchema)

  verifyEmail = validateBody(this.verifyEmailSchema)

  forgotPassword = validateBody(this.forgotPasswordSchema)

  forgotPasswordTokenMiddleware = async (
    { forgotPasswordToken: token }: { forgotPasswordToken: string },
    req: Request
  ) => {
    const { userId } = await verifyToken({
      token,
      secretKey: process.env.FORGOT_PASSWORD_TOKEN_SECRET_KEY,
      label: 'Forgot password token'
    })

    const user = await usersServices.getUserById(userId)
    if (!user) {
      throw createHttpError.NotFound(USERS_MESSAGES.USER_NOT_FOUND)
    }

    if (user.forgot_password_token !== token) {
      throw createHttpError.Unauthorized(AUTH_MESSAGES.FORGOT_PASSWORD_TOKEN_INVALID)
    }

    req.userId = new ObjectId(userId)
  }

  verifyForgotPasswordToken = validateBody(this.verifyForgotPasswordTokenSchema, this.forgotPasswordTokenMiddleware)

  resetPassword = validateBody(this.resetPasswordSchema, this.forgotPasswordTokenMiddleware)

  changePassword = validateBody(this.changePasswordSchema)
}

export default new AuthMiddlewares()

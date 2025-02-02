import bcrypt from 'bcrypt'
import createHttpError from 'http-errors'
import { ObjectId } from 'mongodb'
import mongoDB from '~/config/database/mongoDB.ts'
import { TokenType, UserVerifyStatus } from '~/global/constants/enum.ts'
import { signToken } from '~/global/helpers/handleJWT.ts'
import User from '../users/schemas/usersSchemas.ts'
import usersServices from '../users/usersServices.ts'
import { AUTH_MESSAGES } from './constants/authMessages.ts'
import RefreshToken from './schemas/refreshTokenSchemas.ts'
import type { LoginBody, RegisterBodyValid } from './types/authRequests.ts'

class AuthServices {
  private signEmailVerificationToken(userId: ObjectId) {
    return signToken({
      payload: {
        userId,
        tokenType: TokenType.EmailVerificationToken
      },
      secretKey: process.env.EMAIL_VERIFICATION_TOKEN_SECRET_KEY,
      options: { expiresIn: process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES_IN }
    })
  }

  private signForgotPasswordToken(userId: ObjectId) {
    return signToken({
      payload: {
        userId,
        tokenType: TokenType.ForgotPasswordToken
      },
      secretKey: process.env.FORGOT_PASSWORD_TOKEN_SECRET_KEY,
      options: { expiresIn: process.env.FORGOT_PASSWORD_TOKEN_EXPIRES_IN }
    })
  }

  private signAccessToken({ userId, userVerifyStatus }: { userId: ObjectId; userVerifyStatus: UserVerifyStatus }) {
    return signToken({
      payload: {
        userId,
        tokenType: TokenType.AccessToken,
        userVerifyStatus
      },
      secretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    })
  }

  private signRefreshToken(userId: ObjectId) {
    return signToken({
      payload: {
        userId,
        tokenType: TokenType.RefreshToken
      },
      secretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
    })
  }

  private signAccessAndRefreshToken({
    userId,
    userVerifyStatus
  }: {
    userId: ObjectId
    userVerifyStatus: UserVerifyStatus
  }) {
    return Promise.all([
      this.signAccessToken({
        userId,
        userVerifyStatus
      }),
      this.signRefreshToken(userId)
    ])
  }

  private async signAndStoreToken({
    userId,
    userVerifyStatus
  }: {
    userId: ObjectId
    userVerifyStatus: UserVerifyStatus
  }) {
    const [accessToken, refreshToken] = await this.signAccessAndRefreshToken({
      userId,
      userVerifyStatus
    })
    await mongoDB.refreshTokens.insertOne(new RefreshToken({ userId, token: refreshToken }))
    return { accessToken, refreshToken }
  }

  async register({ name, email, password, dateOfBirth }: RegisterBodyValid) {
    const user = await usersServices.getUserByEmail(email)

    if (user) throw createHttpError.Conflict(AUTH_MESSAGES.EMAIL_ALREADY_EXIST)

    const userId = new ObjectId()

    const [token, emailVerificationToken] = await Promise.all([
      this.signAndStoreToken({ userId, userVerifyStatus: UserVerifyStatus.Unverified }),
      this.signEmailVerificationToken(userId)
    ])

    await mongoDB.users.insertOne(
      new User({
        id: userId,
        name,
        email,
        password,
        emailVerificationToken,
        dateOfBirth: dateOfBirth
      })
    )

    // send email

    return token
  }

  async login({ email, password }: LoginBody) {
    const user = await mongoDB.users.findOne({ email })

    if (!user) {
      throw createHttpError.Unauthorized(AUTH_MESSAGES.INCORRECT_EMAIL_OR_PASSWORD)
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw createHttpError.Unauthorized(AUTH_MESSAGES.INCORRECT_EMAIL_OR_PASSWORD)
    }

    return this.signAndStoreToken({ userId: user._id, userVerifyStatus: user.verify })
  }

  async logout(refreshToken: string) {
    await mongoDB.refreshTokens.deleteOne({ token: refreshToken })
  }

  async verifyEmail(userId: ObjectId) {
    const user = await usersServices.getUserById(userId)

    if (!user) {
      throw createHttpError.NotFound(AUTH_MESSAGES.USER_NOT_FOUND)
    }

    if (user.verify === UserVerifyStatus.Verified) {
      throw createHttpError.Conflict(AUTH_MESSAGES.EMAIL_ALREADY_VERIFIED)
    }

    const [token] = await Promise.all([
      this.signAndStoreToken({ userId, userVerifyStatus: UserVerifyStatus.Verified }),
      mongoDB.users.updateOne(
        { _id: userId },
        {
          $set: {
            verify: UserVerifyStatus.Verified,
            email_verification_token: ''
          },
          $currentDate: { updated_at: true }
        }
      )
    ])

    return token
  }

  async resendVerificationEmail(userId: ObjectId) {
    const user = await usersServices.getUserById(userId)

    if (!user) {
      throw createHttpError.NotFound(AUTH_MESSAGES.USER_NOT_FOUND)
    }

    if (user.verify === UserVerifyStatus.Verified) {
      throw createHttpError.Conflict(AUTH_MESSAGES.EMAIL_ALREADY_VERIFIED)
    }

    const email_verification_token = await this.signEmailVerificationToken(userId)

    await mongoDB.users.updateOne(
      { _id: userId },
      {
        $set: { email_verification_token },
        $currentDate: { updated_at: true }
      }
    )

    // send email
  }

  async forgotPassword(email: string) {
    const user = await usersServices.getUserByEmail(email)

    if (!user) {
      throw createHttpError.NotFound(AUTH_MESSAGES.USER_NOT_FOUND)
    }

    const forgot_password_token = await this.signForgotPasswordToken(user._id)

    await mongoDB.users.updateOne(
      { _id: user._id },
      {
        $set: { forgot_password_token },
        $currentDate: { updated_at: true }
      }
    )

    // send email
  }

  async resetPassword(userId: ObjectId, password: string) {
    await mongoDB.users.updateOne(
      { _id: userId },
      {
        $set: {
          password: bcrypt.hashSync(password, 10),
          forgot_password_token: ''
        },
        $currentDate: { updated_at: true }
      }
    )
  }
}

export default new AuthServices()

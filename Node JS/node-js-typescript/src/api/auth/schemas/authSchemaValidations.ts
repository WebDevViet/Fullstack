import { z } from 'zod'
import userZod from '~/api/users/schemas/userZod.ts'
import TokenSchemaValidations from './tokenSchemaValidations.ts'
import type { BaseSchemaType } from '~/global/helpers/types/typeRequest.ts'
import { AUTH_MESSAGES } from '../constants/authMessages.ts'

export default class AuthSchemaValidations extends TokenSchemaValidations {
  accessTokenSchema = z.object({ authorization: this.authorization })

  verifyEmailSchema = z.object({ emailVerificationToken: this.emailVerificationToken })

  registerSchema = userZod
    .pick({ name: true, email: true, password: true, confirmPassword: true, dateOfBirth: true })
    .refine(({ confirmPassword, password }) => confirmPassword === password, {
      message: AUTH_MESSAGES.PASSWORD_NOT_MATCH,
      path: ['confirmPassword']
    })

  loginSchema = userZod.pick({ email: true, password: true })

  logoutSchema = z.object({ refreshToken: this.refreshToken })

  forgotPasswordSchema = z.object({ email: userZod.shape.email })

  verifyForgotPasswordTokenSchema = z.object({ forgotPasswordToken: this.forgotPasswordToken })

  resetPasswordSchema = z
    .object({
      forgotPasswordToken: this.forgotPasswordToken,
      password: userZod.shape.password,
      confirmPassword: userZod.shape.confirmPassword
    })
    .refine(({ confirmPassword, password }) => confirmPassword === password, {
      message: AUTH_MESSAGES.PASSWORD_NOT_MATCH,
      path: ['confirmPassword']
    })

  changePasswordSchema = z
    .object({
      oldPassword: userZod.shape.password,
      newPassword: userZod.shape.password,
      confirmNewPassword: userZod.shape.confirmPassword
    })
    .refine(({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword, {
      message: AUTH_MESSAGES.PASSWORD_NOT_MATCH,
      path: ['confirmNewPassword']
    })
}

export type AuthSchemaTypes = BaseSchemaType<AuthSchemaValidations, TokenSchemaValidations>

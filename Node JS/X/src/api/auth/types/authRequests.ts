import type { AuthenticatedRequest, ValidatedRequest } from '~/global/helpers/types/typeRequest.ts'
import type { UserId } from '~/global/types/common.ts'
import type { Request } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'

// Register
export interface RegisterBody {
  name: string
  email: string
  password: string
  confirmPassword: string
  dateOfBirth: string
}

export interface RegisterBodyValid {
  name: string
  email: string
  password: string
  confirmPassword: string
  dateOfBirth: Date
}

export type RegisterRequest = Request<ParamsDictionary, any, RegisterBody> & ValidatedRequest<RegisterBodyValid>

// Login
export interface LoginBody {
  email: string
  password: string
}

export type LoginRequest = Request<ParamsDictionary, any, LoginBody>

// Logout
export interface LogoutBody {
  refreshToken: string
}

export type LogoutRequest = Request<ParamsDictionary, any, LogoutBody>

// Verify email
export interface VerifyEmailBody {
  emailVerificationToken: string
}
export type VerifyEmailRequest = AuthenticatedRequest<VerifyEmailBody>

// Resend verify email
export type ResendVerifyEmailRequest = AuthenticatedRequest

// Forgot password
export interface ForgotPasswordBody {
  email: string
}

export type ForgotPasswordRequest = Request<ParamsDictionary, any, ForgotPasswordBody>

// Reset password
export interface ResetPasswordBody {
  forgotPasswordToken: string
  password: string
  confirmPassword: string
}

export type ResetPasswordRequest = Request<ParamsDictionary, any, ResetPasswordBody> & UserId

// OAuth Google
export interface OAuthGoogleQuery {
  code: string
}

export interface OauthGoogleUserInfo {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
}

export interface OAuthGoogleToken {
  access_token: string
  expires_in: number
  scope: string
  token_type: string
  id_token: string
}

export type OAuthGoogleRequest = Request<ParamsDictionary, any, any, OAuthGoogleQuery>

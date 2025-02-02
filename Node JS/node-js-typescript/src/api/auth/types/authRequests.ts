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
// verifiedUser

export type VerifiedUserRequest = AuthenticatedRequest

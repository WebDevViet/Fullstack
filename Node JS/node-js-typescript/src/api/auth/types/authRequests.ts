import type { ObjectId } from 'mongodb'
import type { AuthenticatedRequest, ValidatedRequest } from '~/global/helpers/types/typeRequest.ts'
import type { UserId } from '~/global/types/common.ts'

// Register
export interface RegisterBody {
  name: string
  email: string
  password: string
  confirmPassword: string
  dateOfBirth: Date
}

export type RegisterRequest = ValidatedRequest<RegisterBody>

// Login
export interface LoginBody {
  email: string
  password: string
}

export type LoginRequest = ValidatedRequest<LoginBody>

// Logout
export interface LogoutBody {
  refreshToken: string
}

export type LogoutRequest = AuthenticatedRequest<LogoutBody>

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

export type ForgotPasswordRequest = ValidatedRequest<ForgotPasswordBody>

// Reset password
export interface ResetPasswordBody {
  forgotPasswordToken: ObjectId
  password: string
  confirmPassword: string
}

export type ResetPasswordRequest = ValidatedRequest<ResetPasswordBody> & UserId

// verifiedUser

export type VerifiedUserRequest = AuthenticatedRequest

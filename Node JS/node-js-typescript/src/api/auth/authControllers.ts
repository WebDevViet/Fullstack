import type { Request, Response } from 'express'
import { HTTP_STATUS } from '~/global/constants/httpStatus.ts'
import authServices from './authServices.ts'
import { AUTH_MESSAGES } from './constants/authMessages.ts'
import type {
  ForgotPasswordRequest,
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
  ResendVerifyEmailRequest,
  ResetPasswordRequest,
  VerifyEmailRequest
} from './types/authRequests.ts'

const authControllers = {
  register: async (req: RegisterRequest, res: Response) => {
    const data = await authServices.register(req.validationValues.body)

    res.status(HTTP_STATUS.SUCCESS.CREATED).json({ data, message: AUTH_MESSAGES.REGISTER_SUCCESS })
  },

  login: async (req: LoginRequest, res: Response) => {
    const data = await authServices.login(req.body)

    res.status(HTTP_STATUS.SUCCESS.OK).json({ data, message: AUTH_MESSAGES.LOGIN_SUCCESS })
  },

  logout: async (req: LogoutRequest, res: Response) => {
    await authServices.logout(req.body.refreshToken)

    res.status(HTTP_STATUS.SUCCESS.OK).json({ message: AUTH_MESSAGES.LOGOUT_SUCCESS })
  },

  verifyEmail: async (req: VerifyEmailRequest, res: Response) => {
    const data = await authServices.verifyEmail(req.userId)

    res.status(HTTP_STATUS.SUCCESS.OK).json({ data, message: AUTH_MESSAGES.VERIFY_EMAIL_SUCCESS })
  },

  resendVerificationEmail: async (req: ResendVerifyEmailRequest, res: Response) => {
    await authServices.resendVerificationEmail(req.userId)

    res.status(HTTP_STATUS.SUCCESS.OK).json({ message: AUTH_MESSAGES.RESEND_VERIFY_EMAIL_SUCCESS })
  },

  forgotPassword: async (req: ForgotPasswordRequest, res: Response) => {
    await authServices.forgotPassword(req.body.email)

    res.status(HTTP_STATUS.SUCCESS.OK).json({ message: AUTH_MESSAGES.CHECK_EMAIL_TO_RESET_PASSWORD })
  },
  verifyForgotPasswordToken: async (_req: Request, res: Response) => {
    res.status(HTTP_STATUS.SUCCESS.OK).json({ message: AUTH_MESSAGES.VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS })
  },

  resetPassword: async (req: ResetPasswordRequest, res: Response) => {
    await authServices.resetPassword(req.userId, req.body.password)

    res.status(HTTP_STATUS.SUCCESS.OK).json({ message: AUTH_MESSAGES.RESET_PASSWORD_SUCCESS })
  }
}

export default authControllers

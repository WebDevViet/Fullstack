import type { Request, Response } from 'express'
import { HTTP_STATUS } from '~/global/constants/httpStatus.ts'
import authServices from './authServices.ts'
import type {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  LogoutRequest,
  OAuthGoogleRequest,
  RegisterRequest,
  ResendVerifyEmailRequest,
  ResetPasswordRequest,
  VerifyEmailRequest
} from './types/authReqRes.ts'

const authControllers = {
  register: async (req: RegisterRequest, res: Response) => {
    const data = await authServices.register(req.body)

    res.status(HTTP_STATUS.SUCCESS.CREATED).json({ data, message: 'Register successfully' })
  },

  login: async (req: LoginRequest, res: Response) => {
    const data = await authServices.login(req.body)

    res.status(HTTP_STATUS.SUCCESS.OK).json({ data, message: 'Login successfully' })
  },

  logout: async (req: LogoutRequest, res: Response) => {
    await authServices.logout(req.body.refreshToken)

    res.status(HTTP_STATUS.SUCCESS.OK).json({ message: 'Logout successfully' })
  },

  verifyEmail: async (req: VerifyEmailRequest, res: Response) => {
    const data = await authServices.verifyEmail(req.userId)

    res.status(HTTP_STATUS.SUCCESS.OK).json({ data, message: '"Verify email successfully"' })
  },

  resendVerificationEmail: async (req: ResendVerifyEmailRequest, res: Response) => {
    await authServices.resendVerificationEmail(req.userId)

    res.status(HTTP_STATUS.SUCCESS.OK).json({ message: 'Resend verify email successfully' })
  },

  forgotPassword: async (req: ForgotPasswordRequest, res: Response) => {
    await authServices.forgotPassword(req.body.email)

    res.status(HTTP_STATUS.SUCCESS.OK).json({ message: 'Please check your email to reset your password' })
  },
  verifyForgotPasswordToken: async (_req: Request, res: Response) => {
    res.status(HTTP_STATUS.SUCCESS.OK).json({ message: 'Verification forgot password token successfully' })
  },

  resetPassword: async (req: ResetPasswordRequest, res: Response) => {
    await authServices.resetPassword(req.userId, req.body.password)

    res.status(HTTP_STATUS.SUCCESS.OK).json({ message: 'Reset password successfully' })
  },

  changePassword: async (req: ChangePasswordRequest, res: Response) => {
    await authServices.changePassword(req.userId, req.body)

    res.json({ message: 'Change password successfully' })
  },

  oauthGoogle: async (req: OAuthGoogleRequest, res: Response) => {
    const { accessToken, refreshToken, newUser, verifyEmail } = await authServices.oauthGoogle(req.query.code)
    const urlRedirect = `${process.env.CLIENT_OAUTH_LOGIN_URL}?access-token=${accessToken}&refresh-token=${refreshToken}&new-user=${newUser}&verify-email=${verifyEmail}`
    res.redirect(urlRedirect)
  }
}

export default authControllers

import { Router } from 'express'
import { reqHandler } from '~/global/utils/reqHandler.ts'
import authControllers from './authControllers.ts'
import authValidates from './authMiddlewares.ts'

const router = Router()

/** Register a new user
 * @route POST /api/auth/register
 * @body { name: string, email: string, password: string, confirmPassword: string, dateOfBirth: ISO8601 }
 */
router.post('/register', authValidates.register, reqHandler(authControllers.register))

/** Login
 * @route POST /api/auth/login
 * @body { email: string, password: string }
 */
router.post('/login', authValidates.login, reqHandler(authControllers.login))

/** Logout
 * @route POST /api/auth/logout
 * @header { Authorization: Bearer <token> }
 * @body { refreshToken: string }
 */
router.post('/logout', authValidates.accessToken, authValidates.logout, reqHandler(authControllers.logout))

/** Refresh token
 * @route POST /api/auth/refresh-token
 * @header { Authorization: Bearer <token> }
 */
// router.post('/refresh-token', authValidate.accessToken, reqHandler(authController.refreshToken))

/** Verify email
 * @route POST /api/auth/verify-email
 * @header { Authorization: Bearer <token> }
 * @body { emailVerificationToken: string }
 */
router.post(
  '/verify-email',
  authValidates.accessToken,
  authValidates.verifyEmail,
  reqHandler(authControllers.verifyEmail)
)

/** Resend verification email
 * @route POST /api/auth/resend-verify-email
 * @header { Authorization: Bearer <token> }
 */
router.post('/resend-verify-email', authValidates.accessToken, reqHandler(authControllers.resendVerificationEmail))

/** Forgot password
 * @route POST /api/auth/forgot-password
 * @body { email: string }
 */
router.post('/forgot-password', authValidates.forgotPassword, reqHandler(authControllers.forgotPassword))

/** Verify forgot password token
 * @route POST /api/auth/verify-forgot-password-token
 * @body { forgotPasswordToken: string }
 */
router.post(
  '/verify-forgot-password-token',
  authValidates.verifyForgotPasswordToken,
  reqHandler(authControllers.verifyForgotPasswordToken)
)

/** Reset password
 * @route POST /api/auth/reset-password
 * @body { resetPasswordToken: string, password: string, confirmPassword: string }
 */
router.post('/reset-password', authValidates.resetPassword, reqHandler(authControllers.resetPassword))

export default router

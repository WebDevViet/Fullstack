import { Router } from 'express'
import { reqHandler } from '~/global/utils/reqHandler.ts'
import authMiddlewares from '../auth/authMiddlewares.ts'
import usersControllers from './usersControllers.ts'
import usersMiddlewares from './usersMiddlewares.ts'

const router = Router()

/** Get my profile
 * @route GET /api/users/me
 * @header { Authorization: Bearer <token> }
 */
router.get('/me', authMiddlewares.accessToken, reqHandler(usersControllers.getMyProfile))

/** Update my profile
 * @route PATCH /api/users/me
 * @header { Authorization: Bearer <token> }
 * @body {
    name?: string,
    dateOfBirth?: date ISO8601,
    username?: string
    bio?: string
    location?: string
    website?: string
  }
 */
router.patch(
  '/me',
  authMiddlewares.verifiedUser,
  usersMiddlewares.updateMyProfile,
  reqHandler(usersControllers.updateMyProfile)
)

/** Get user profile
 * @route GET /api/users/:username
 * @header { Authorization: Bearer <token> }
 */
router.get('/:username', usersMiddlewares.userProfile, reqHandler(usersControllers.getUserProfile))

/** Follow user
 * @route POST /api/users/follow-user
 * @header { Authorization: Bearer <token> }
 * @body { followedUserId: string }
 */
router.post(
  '/follow-user',
  authMiddlewares.verifiedUser,
  usersMiddlewares.followUser,
  reqHandler(usersControllers.followUser)
)

/** Unfollow user
 * @route DELETE /api/users/unfollow-user/:followedUserId
 * @header { Authorization: Bearer <token> }
 */
router.delete(
  '/unfollow-user/:followedUserId',
  authMiddlewares.verifiedUser,
  usersMiddlewares.unfollowUser,
  reqHandler(usersControllers.unfollowUser)
)

export default router

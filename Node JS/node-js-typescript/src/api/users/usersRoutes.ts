import { Router } from 'express'
import { reqHandler } from '~/global/utils/reqHandler.ts'
import authValidates from '../auth/authMiddlewares.ts'
import usersControllers from './usersControllers.ts'
import usersValidates from './usersMiddlewares.ts'

const router = Router()

/** Get my profile
 * @route GET /api/users/me
 * @header { Authorization: Bearer <token> }
 */
router.get('/me', authValidates.accessToken, reqHandler(usersControllers.getMyProfile))

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
  authValidates.verifiedUser,
  usersValidates.updateMyProfile,
  reqHandler(usersControllers.updateMyProfile)
)

/** Get user profile
 * @route GET /api/users/:username
 * @header { Authorization: Bearer <token> }
 */
router.get('/:username', reqHandler(usersControllers.getUserProfile))

/** Follow user
 * @route POST /api/users/follow-user
 * @header { Authorization: Bearer <token> }
 * @body { followedUserId: string }
 */
router.post(
  '/follow-user',
  authValidates.verifiedUser,
  usersValidates.followUser,
  reqHandler(usersControllers.followUser)
)

/** Unfollow user
 * @route POST /api/users/:username/unfollow
 * @header { Authorization: Bearer <token> }
 */
// router.post('/:username/unfollow', authValidates.accessToken, reqHandler(usersControllers.unfollowUser))

export default router

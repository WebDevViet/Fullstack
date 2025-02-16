import type { Response } from 'express'
import type {
  followUserRequest,
  GetMyProfileRequest,
  GetUserProfileRequest,
  UnfollowUserRequest,
  UpdateMyProfileRequest
} from './types/usersReqRes.ts'
import usersServices from './usersServices.ts'

const usersControllers = {
  getUserProfile: async (req: GetUserProfileRequest, res: Response) => {
    const user = await usersServices.getUserProfile(req.params.username)

    res.json({ data: user, message: 'Get user successfully' })
  },
  getMyProfile: async (req: GetMyProfileRequest, res: Response) => {
    const user = await usersServices.getMyProfile(req.userId)

    res.json({ data: user, message: 'Get profile successfully' })
  },

  updateMyProfile: async (req: UpdateMyProfileRequest, res: Response) => {
    const user = await usersServices.updateMyProfile(req.userId, req.body)

    res.json({ data: user, message: 'Update profile successfully' })
  },

  followUser: async (req: followUserRequest, res: Response) => {
    await usersServices.followUser(req.userId, req.body.followedUserId)

    res.json({ message: 'Follow user successfully' })
  },

  unfollowUser: async (req: UnfollowUserRequest, res: Response) => {
    await usersServices.unfollowUser(req.userId, req.params.followedUserId)

    res.json({ message: 'Unfollow user successfully' })
  }
}

export default usersControllers

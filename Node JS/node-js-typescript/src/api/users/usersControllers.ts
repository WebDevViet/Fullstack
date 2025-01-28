import type { Response } from 'express'
import { USERS_MESSAGES } from './constants/usersMessages.ts'
import type {
  followUserRequest,
  GetMyProfileRequest,
  GetUserProfileRequest,
  UpdateMyProfileRequest
} from './types/usersRequests.ts'
import usersServices from './usersServices.ts'

const usersControllers = {
  getUserProfile: async (req: GetUserProfileRequest, res: Response) => {
    const user = await usersServices.getUserProfile(req.params.username)

    res.json({ data: user, message: USERS_MESSAGES.GET_USER_SUCCESS })
  },
  getMyProfile: async (req: GetMyProfileRequest, res: Response) => {
    const user = await usersServices.getMyProfile(req.userId)

    res.json({ data: user, message: USERS_MESSAGES.GET_PROFILE_SUCCESS })
  },

  updateMyProfile: async (req: UpdateMyProfileRequest, res: Response) => {
    const user = await usersServices.updateMyProfile(req.userId, req.validationValues.body)

    res.json({ data: user, message: USERS_MESSAGES.UPDATE_PROFILE_SUCCESS })
  },

  followUser: async (req: followUserRequest, res: Response) => {
    await usersServices.followUser(req.userId, req.validationValues.body.followedUserId)

    res.json({ message: USERS_MESSAGES.FOLLOW_USER_SUCCESS })
  }
}

export default usersControllers

import { Joi } from 'express-joi-validations'
import createHttpError from 'http-errors'
import type { ObjectId } from 'mongodb'
import { validateAsyncBody, validateAsyncParams } from '~/global/utils/validate.ts'
import { USERS_MESSAGES } from './constants/usersMessages.ts'
import userValidation from './schemas/userValidation.ts'
import usersServices from './usersServices.ts'

class UsersValidate {
  updateMyProfile = validateAsyncBody(
    Joi.object({
      name: userValidation.extract('name'),
      dateOfBirth: userValidation.extract('dateOfBirth'),
      username: userValidation.extract('username').external(async (username: string) => {
        const user = await usersServices.getUserByUsername(username)
        if (user) throw createHttpError.Conflict(USERS_MESSAGES.USERNAME_ALREADY_EXISTS)
        return username
      }),
      bio: userValidation.extract('bio'),
      location: userValidation.extract('location'),
      website: userValidation.extract('website')
    }).options({ abortEarly: false })
  )

  followUser = validateAsyncBody(
    Joi.object({
      followedUserId: userValidation.extract('id').external(async (id: ObjectId) => {
        const user = await usersServices.getUserById(id)
        if (!user) throw createHttpError.NotFound(USERS_MESSAGES.USER_TO_FOLLOW_NOT_FOUND)
        return id
      })
    }).options({
      abortEarly: false
    })
  )

  unfollowUser = validateAsyncParams(
    Joi.object({
      followedUserId: userValidation.extract('id').external(async (id: ObjectId) => {
        const user = await usersServices.getUserById(id)
        if (!user) throw createHttpError.NotFound(USERS_MESSAGES.USER_TO_UNFOLLOW_NOT_FOUND)
        return id
      })
    }).options({
      abortEarly: false
    })
  )

  changePassword = validateAsyncBody(
    Joi.object({
      oldPassword: userValidation.extract('password').label('Old password'),
      newPassword: userValidation.extract('password').label('New password'),
      confirmNewPassword: userValidation
        .extract('confirmPassword')
        .equal(Joi.ref('newPassword'))
        .label('Confirm new password')
    }).options({ abortEarly: false })
  )
}

export default new UsersValidate()

import { Joi, validateBody } from 'express-joi-validations'
import createHttpError from 'http-errors'
import type { ObjectId } from 'mongodb'
import { validateAsyncBody } from '~/global/utils/validate.ts'
import { USERS_MESSAGES } from './constants/usersMessages.ts'
import { userValid } from './schemas/usersSchemas.ts'
import usersServices from './usersServices.ts'

class UsersValidate {
  updateMyProfile = validateBody(
    Joi.object({
      name: userValid.extract('name'),
      dateOfBirth: userValid.extract('dateOfBirth'),
      username: userValid.extract('username'),
      bio: userValid.extract('bio'),
      location: userValid.extract('location'),
      website: userValid.extract('website')
    }).options({ abortEarly: false })
  )

  followUser = validateAsyncBody(
    Joi.object({
      followedUserId: userValid.extract('id').external(async (id: ObjectId) => {
        const user = await usersServices.getUserById(id)
        if (!user) throw createHttpError.NotFound(USERS_MESSAGES.USER_TO_FOLLOW_NOT_FOUND)
        return id
      })
    }).options({
      abortEarly: false
    })
  )
}

export default new UsersValidate()

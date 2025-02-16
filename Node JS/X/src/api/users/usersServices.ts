import bcrypt from 'bcrypt'
import { camelCase, snakeCase } from 'change-case/keys'
import createHttpError from 'http-errors'
import { ObjectId, type Filter, type FindOneAndUpdateOptions, type FindOptions, type UpdateFilter } from 'mongodb'
import mongoDB from '~/config/database/mongoDB.ts'
import { AUTH_MESSAGES } from '../auth/constants/authMessages.ts'
import { USERS_MESSAGES } from './constants/usersMessages.ts'
import Follower from './schemas/followersSchemas.ts'
import type User from './schemas/usersSchemas.ts'
import type {
  ChangePasswordBody,
  MyProfileResult,
  UpdateMyProfileBody,
  UpdateMyProfileBodySnakeCase,
  UserProfileResult
} from './types/usersRequests.ts'

const projection = { password: 0, email_verification_token: 0, forgot_password_token: 0 }

class UsersServices {
  async findOneUser(filter: Filter<User>, options?: Omit<FindOptions, 'timeoutMode'>): Promise<User> | never {
    const user = await mongoDB.users.findOne(filter, options)

    if (!user) throw createHttpError.NotFound(AUTH_MESSAGES.USER_NOT_FOUND)

    return user
  }

  async findOneAndUpdateUser(
    filter: Filter<User>,
    update: UpdateFilter<User>,
    options?: FindOneAndUpdateOptions
  ): Promise<User> | never {
    const user = await mongoDB.users.findOneAndUpdate(filter, update, options ?? {})

    if (!user) throw createHttpError.NotFound(AUTH_MESSAGES.USER_NOT_FOUND)

    return user
  }

  async getUserById(userId: string | ObjectId) {
    userId = typeof userId === 'string' ? new ObjectId(userId) : userId
    return await mongoDB.users.findOne({ _id: userId })
  }

  async getUserByEmail(email: string) {
    return await mongoDB.users.findOne({ email })
  }

  async getUserByUsername(username: string) {
    return await mongoDB.users.findOne({ username })
  }

  async getUserProfile(username: string) {
    const user = await this.findOneUser(
      { username },
      { projection: { ...projection, verify: 0, created_at: 0, updated_at: 0 } }
    )

    return camelCase(user) as UserProfileResult
  }

  async getMyProfile(userId: ObjectId) {
    const user = await this.findOneUser({ _id: userId }, { projection })
    return camelCase(user) as MyProfileResult
  }

  async updateMyProfile(userId: ObjectId, userPayload: UpdateMyProfileBody) {
    const user = await this.findOneAndUpdateUser(
      { _id: userId },
      {
        $set: snakeCase(userPayload) as UpdateMyProfileBodySnakeCase,
        $currentDate: { updated_at: true }
      },
      { projection, returnDocument: 'after' }
    )

    return camelCase(user) as MyProfileResult
  }

  async followUser(userId: ObjectId, followedUserId: ObjectId) {
    const follower = await mongoDB.followers.findOne({ user_id: userId, followed_user_id: followedUserId })

    if (follower) throw createHttpError.Conflict(USERS_MESSAGES.USER_ALREADY_FOLLOWED)

    await mongoDB.followers.insertOne(new Follower({ userId, followedUserId }))
  }

  async unfollowUser(userId: ObjectId, followedUserId: ObjectId) {
    const follower = await mongoDB.followers.findOne({ user_id: userId, followed_user_id: followedUserId })

    if (!follower) throw createHttpError.BadRequest(USERS_MESSAGES.USER_NOT_FOLLOWED_YET)

    await mongoDB.followers.deleteOne({ user_id: userId, followed_user_id: followedUserId })
  }

  async changePassword(userId: ObjectId, { oldPassword, newPassword }: ChangePasswordBody) {
    const user = await this.findOneUser({ _id: userId })

    if (!user) throw createHttpError.NotFound(AUTH_MESSAGES.USER_NOT_FOUND)

    if (!bcrypt.compareSync(oldPassword, user.password))
      throw createHttpError.Unauthorized(USERS_MESSAGES.WRONG_PASSWORD)

    if (oldPassword === newPassword) throw createHttpError.BadRequest(USERS_MESSAGES.PASSWORD_NOT_CHANGED)

    await mongoDB.users.updateOne(
      { _id: userId },
      { $set: { password: bcrypt.hashSync(newPassword, 10) }, $currentDate: { updated_at: true } }
    )
  }
}

export default new UsersServices()

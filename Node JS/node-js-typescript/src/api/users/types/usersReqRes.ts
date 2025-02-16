import type { Request } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { UserId } from '~/global/types/common.ts'
import type { UserType } from '../schemas/usersSchemas.ts'
import type { UserSchemaTypes } from '../schemas/usersSchemaValidations.ts'

// Get user profile
export type GetUserProfileRequest = Request<UserSchemaTypes['userProfileSchema']>

export type UserProfileResult = Omit<
  Required<UserType>,
  'createdAt' | 'updatedAt' | 'verify' | 'emailVerificationToken' | 'forgotPasswordToken' | 'password'
>

// Get my profile
export type GetMyProfileRequest = UserId

export type MyProfileResult = Omit<Required<UserType>, 'emailVerificationToken' | 'forgotPasswordToken' | 'password'>

// Update my profile
export type UpdateMyProfileRequest = Request<ParamsDictionary, any, UserSchemaTypes['updateMyProfileSchema']> & UserId

// Follow user
export type followUserRequest = Request<ParamsDictionary, any, UserSchemaTypes['followedUserIdSchema']> & UserId

// Unfollow user
export type UnfollowUserRequest = Request<UserSchemaTypes['followedUserIdSchema']> & UserId

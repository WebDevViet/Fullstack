import type { AuthenticatedRequest } from '~/global/helpers/types/typeRequest.ts'
import type { Request } from 'express'
import type { ObjectId } from 'mongodb'

// Get user profile

export interface GetUserProfileParams {
  username: string
}

export type GetUserProfileRequest = Request<GetUserProfileParams>

export type UserProfileResult = Omit<MyProfileResult, 'createdAt' | 'updatedAt' | 'verify'>

// Get my profile
export type GetMyProfileRequest = AuthenticatedRequest

export interface MyProfileResult {
  id: ObjectId
  name: string
  email: string
  dateOfBirth: Date
  verify: number
  avatar: string
  username: string
  bio: string
  location: string
  website: string
  coverPhoto: string
  createdAt: Date
  updatedAt: Date
}

// Update my profile
export interface UpdateMyProfileBody {
  name?: string
  dateOfBirth?: Date
  username?: string
  bio?: string
  location?: string
  website?: string
}

export type UpdateMyProfileRequest = AuthenticatedRequest<UpdateMyProfileBody>

// Follow user

export interface followUserBody {
  followedUserId: ObjectId
}

export type followUserRequest = AuthenticatedRequest<followUserBody>

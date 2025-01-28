import bcrypt from 'bcrypt'
import { Joi } from 'express-joi-validations'
import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '~/global/constants/enum.ts'

export interface UserType {
  id?: ObjectId
  name: string
  email: string
  dateOfBirth: Date
  password: string

  verify?: UserVerifyStatus
  emailVerificationToken?: string
  forgotPasswordToken?: string

  avatar?: string
  username?: string
  bio?: string
  location?: string
  website?: string
  coverPhoto?: string

  createdAt?: Date
  updatedAt?: Date
}

export default class User {
  _id?: ObjectId
  name: string
  email: string
  date_of_birth: Date
  password: string

  verify: UserVerifyStatus
  email_verification_token: string
  forgot_password_token: string

  avatar: string
  username: string
  bio: string
  location: string
  website: string
  cover_photo: string

  created_at: Date
  updated_at: Date

  constructor(user: UserType) {
    this._id = user.id
    this.name = user.name
    this.email = user.email
    this.date_of_birth = user.dateOfBirth
    this.password = bcrypt.hashSync(user.password, 10)

    this.verify = user.verify || UserVerifyStatus.Unverified
    this.email_verification_token = user.emailVerificationToken || ''
    this.forgot_password_token = user.forgotPasswordToken || ''

    this.avatar = user.avatar || ''
    this.username = user.username || ''
    this.bio = user.bio || ''
    this.location = user.location || ''
    this.website = user.website || ''
    this.cover_photo = user.coverPhoto || ''

    const now = new Date()
    this.created_at = user.createdAt || now
    this.updated_at = user.updatedAt || now
  }
}

export const userValid = Joi.object({
  id: Joi.string()
    .trim()
    .custom((value: string, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error('any.invalid')
      }
      return new ObjectId(value)
    })
    .label('Id')
    .messages({ 'any.invalid': '{{#label}} is invalid' }),
  name: Joi.string().trim().min(1).max(50).label('Name'),
  email: Joi.string().trim().email().label('Email'),
  password: Joi.string()
    .min(8)
    .max(100)
    .pattern(/(?=.*[!@#$%^&*])/)
    .pattern(/(?=.*[a-z])(?=.*[A-Z])/)
    .pattern(/(?=.*\d)/)
    .label('Password')
    .messages({
      'string.pattern.base':
        '{{#label}} must be 8-100 characters long, include at least one special character (e.g., !, @, #, $), both uppercase and lowercase letters, and at least one digit.'
    }),
  confirmPassword: Joi.string()
    .equal(Joi.ref('password'))
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' }),
  dateOfBirth: Joi.date().iso().label('Date of Birth'),
  avatar: Joi.string().uri().label('Avatar'),
  username: Joi.string().trim().min(1).max(50).label('Username'),
  bio: Joi.string().trim().max(160).label('Bio'),
  location: Joi.string().trim().max(30).label('Location'),
  website: Joi.string().uri().label('Website'),
  coverPhoto: Joi.string().uri().label('Cover Photo')
})

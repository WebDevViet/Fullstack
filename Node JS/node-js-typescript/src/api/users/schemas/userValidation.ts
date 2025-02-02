import { Joi } from 'express-joi-validations'
import { ObjectId } from 'mongodb'
import { passwordRegex, usernameRegex } from '~/global/utils/regex.ts'

const userValidation = Joi.object({
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
  password: Joi.string().min(8).max(100).pattern(passwordRegex).label('Password').messages({
    'string.pattern.base':
      '{{#label}} must be 8-100 characters long, include at least one special character (e.g., !, @, #, $), both uppercase and lowercase letters, and at least one digit.'
  }),
  confirmPassword: Joi.string()
    .equal(Joi.ref('password'))
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' }),
  dateOfBirth: Joi.date().iso().label('Date of Birth'),
  avatar: Joi.string().uri().label('Avatar'),
  username: Joi.string()
    .trim()
    .min(4)
    .max(15)
    .regex(usernameRegex)
    .messages({
      'string.pattern.base':
        '{{#label}} must be 4-15 characters long, and can only contain letters, numbers, and underscores. It also cannot be entirely numbers.'
    })
    .label('Username'),
  bio: Joi.string().trim().max(160).label('Bio'),
  location: Joi.string().trim().max(30).label('Location'),
  website: Joi.string().uri().label('Website'),
  coverPhoto: Joi.string().uri().label('Cover Photo')
})

export default userValidation

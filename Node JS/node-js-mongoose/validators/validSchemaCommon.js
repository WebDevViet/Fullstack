import Joi, { number } from 'joi'
import mongoose from 'mongoose'

export const idMongoValidSchema = Joi.string()
  .custom((value, helpers) => {
    // Kiểm tra _id hợp lệ trong MongoDB
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid', { value })
    }
    return value
  })
  .messages({ 'any.invalid': 'id "{{#value}}" is not a valid' })

export const userId = Joi.object({ userId: idMongoValidSchema.required() })

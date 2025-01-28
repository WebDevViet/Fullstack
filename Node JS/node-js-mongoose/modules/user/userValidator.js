import Joi from 'joi'
import { idMongoValidSchema } from '../../validators/validSchemaCommon'

class UserValidSchema {
  user = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),
    phone: Joi.string()
      .pattern(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/)
      .messages({ 'string.pattern.base': '{{#label}} with value "{{#value}}" is not a valid phone number' }),
    email: Joi.string().trim().email().required(),
    image: Joi.string().trim(),
    address: Joi.object({
      zip_code: Joi.string().trim(),
      city: Joi.string().trim()
    }),
    blogs: Joi.array().items(idMongoValidSchema),
    groups: Joi.array().items(idMongoValidSchema)
  })

  userId = Joi.object({ userId: idMongoValidSchema.required() })

  create = this.user.required()
  createBulk = Joi.array().items(this.user).required()

  update = this.user.fork(['name', 'email'], (schema) => schema.optional())

  delete = this.userId
  restore = this.userId
  deleteBulk = Joi.array().items(idMongoValidSchema).required()
}

export default UserValidSchema

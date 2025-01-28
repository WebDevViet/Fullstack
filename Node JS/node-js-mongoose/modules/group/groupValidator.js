import Joi from 'joi'
import { idMongoValidSchema, userId } from '../../validators/validSchemaCommon'

class GroupValidSchema {
  id = idMongoValidSchema.required()

  group = Joi.object({
    name: Joi.string().trim().min(1).required(),
    users: Joi.array().items(this.id)
  })

  userId = userId
  create = this.group
  addUser = Joi.object({ userId: this.id, groupId: this.id })
  removeUser = this.addUser
}

export default GroupValidSchema

import { validator, validators } from '../../cores/validator'
import UserValidSchema from './userValidator'

const userValidator = new UserValidSchema()

const userMiddleware = {
  create: validator(userValidator.create),
  createBulk: validator(userValidator.createBulk),

  update: validators([
    { reqPart: 'params', validSchema: userValidator.userId },
    { reqPart: 'body', validSchema: userValidator.update }
  ]),

  delete: validator(userValidator.delete, 'params'),
  restore: validator(userValidator.restore, 'params'),
  deleteBulk: validator(userValidator.deleteBulk)
}

export default userMiddleware

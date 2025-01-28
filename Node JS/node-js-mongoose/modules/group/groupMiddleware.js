import { validator, validators } from '../../cores/validator'
import GroupValidSchema from './groupValidator'

const groupValidator = new GroupValidSchema()

const groupMiddleware = {
  create: validators([
    { reqPart: 'params', validSchema: groupValidator.userId },
    { reqPart: 'body', validSchema: groupValidator.create }
  ]),
  addUser: validator(groupValidator.addUser, 'params'),
  removeUser: validator(groupValidator.removeUser, 'params')
}

export default groupMiddleware

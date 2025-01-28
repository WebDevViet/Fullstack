import { validator, validators } from '../../cores/validator'
import BlogValidSchema from './blogValidator'

const blogValidator = new BlogValidSchema()

const blogMiddleware = {
  create: validators([
    { reqPart: 'params', validSchema: blogValidator.userId },
    { reqPart: 'body', validSchema: blogValidator.create }
  ]),
  createBulk: validators([
    { reqPart: 'params', validSchema: blogValidator.userId },
    { reqPart: 'body', validSchema: blogValidator.createBulk }
  ]),
  update: validators([
    { reqPart: 'params', validSchema: blogValidator.paramsUpdate },
    { reqPart: 'body', validSchema: blogValidator.update }
  ]),
  delete: validator(blogValidator.delete, 'params'),
  deleteBulk: validators([
    { reqPart: 'params', validSchema: blogValidator.userId },
    { reqPart: 'body', validSchema: blogValidator.deleteBulk }
  ])
}

export default blogMiddleware

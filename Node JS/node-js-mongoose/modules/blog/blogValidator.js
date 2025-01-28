import Joi from 'joi'
import { idMongoValidSchema } from '../../validators/validSchemaCommon'

class BlogValidSchema {
  id = idMongoValidSchema.required()

  userId = Joi.object({ userId: this.id })

  paramsUpdate = Joi.object({ userId: this.id, blogId: this.id })

  blog = Joi.object({
    title: Joi.string().trim().required(),
    content: Joi.string().trim().required()
  })

  create = this.blog
  createBulk = Joi.array().items(this.blog).required()

  update = this.blog.fork(['title', 'content'], (schema) => schema.optional())

  delete = this.paramsUpdate
  deleteBulk = Joi.array().items(this.id).required()
}

export default BlogValidSchema

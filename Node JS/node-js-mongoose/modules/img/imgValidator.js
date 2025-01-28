import Joi from 'joi'

export const uploadImgValidSchema = Joi.alternatives().try(
  Joi.object({
    name: Joi.string().required().messages({ 'string.empty': 'file name is not allowed to be empty' }),
    mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp')
  }).unknown(true),
  Joi.array().items(
    Joi.object({
      name: Joi.string().required().messages({ 'string.empty': '{{#label}} is not allowed to be empty' }),
      mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp')
    }).unknown(true)
  )
)

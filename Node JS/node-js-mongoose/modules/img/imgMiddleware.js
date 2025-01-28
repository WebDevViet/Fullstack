import createHttpError from 'http-errors'
import { STATUS } from '../../constants.js'
import { uploadImgValidSchema } from './imgValidator.js'

const imgMiddleware = (req, res, next) => {
  const fileImgs = req.files?.image
  if (!fileImgs) {
    return next(createHttpError(STATUS.BAD_REQUEST, { message: 'No files were uploaded.' }))
  }

  const { error } = uploadImgValidSchema.validate(fileImgs, { abortEarly: false })

  if (error) {
    return next(
      createHttpError(STATUS.UNSUPPORTED_MEDIA_TYPE, {
        message: error.message,
        details: error.details.map((e) => e.message)
      })
    )
  }

  next()
}

export default imgMiddleware

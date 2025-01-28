import createHttpError from 'http-errors'

const validatorMiddleware = (validator) => {
  return async function (req, res, next) {
    try {
      await validator.validateAsync(req.body)

      next()
    } catch (err) {
      //* Pass err to next
      //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
      if (err.isJoi) return next(createHttpError(422, { message: err.message }))
      next(createHttpError(500))
    }
  }
}

export default validatorMiddleware

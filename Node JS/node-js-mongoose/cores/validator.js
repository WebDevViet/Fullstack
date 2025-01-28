import createHttpError from 'http-errors'

export const validator = (validSchema, reqPart, options) => {
  return async function (req, res, next) {
    let reqData
    switch (reqPart) {
      case 'params':
        reqData = req.params
        break
      case 'query':
        reqData = req.query
        break
      default:
        reqData = req.body
        break
    }

    try {
      await validSchema.validateAsync(reqData, { abortEarly: false, ...options })
      next()
    } catch (error) {
      //* Pass error to next
      //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
      if (error.isJoi) return next(createHttpError(422, { message: error.message }))
      next(createHttpError(500, { message: error.message }))
    }
  }
}

export const validators = (validChecks) => {
  return async function (req, res, next) {
    try {
      if (Array.isArray(validChecks)) {
        await Promise.all(
          validChecks.map(({ validSchema, reqPart, options }) =>
            validSchema.validateAsync(req[reqPart], { abortEarly: false, ...options })
          )
        )
        next()
        return
      }

      throw new Error('Internal Server Error')
    } catch (error) {
      console.dir(error.message)
      //* Pass error to next
      //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
      if (error.isJoi) return next(createHttpError(422, { message: error.message }))
      next(createHttpError(500, { message: error.message }))
    }
  }
}

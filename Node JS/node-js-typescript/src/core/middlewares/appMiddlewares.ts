import type { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'express-joi-validations'
import createError, { type HttpError } from 'http-errors'
import { HTTP_STATUS } from '~/global/constants/httpStatus.ts'
import { MESSAGE_RESPONSE } from '~/global/constants/messageResponse.ts'
import formatJoiError from '~/global/helpers/formatJoiError.ts'
import formatMessageResponse from '~/global/helpers/formatMessageResponse.ts'

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  next(createError.NotFound())
}

export const errorHandler = (
  err: Error | ValidationError | HttpError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  if (createError.isHttpError(err)) {
    res.status(err.status).json({ error: { message: formatMessageResponse(err.message) } })
    return
  }

  if (err instanceof ValidationError) {
    res.status(HTTP_STATUS.CLIENT_ERROR.UNPROCESSABLE_ENTITY).json({ error: formatJoiError(err) })
    return
  }

  res.status(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({
    error: {
      message: err.message || MESSAGE_RESPONSE.INTERNAL_SERVER_ERROR,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  })
}

import type { NextFunction, Request, Response } from 'express'
import createError, { type HttpError } from 'http-errors'
import { ZodError } from 'zod'
import { HTTP_STATUS } from '~/global/constants/httpStatus.ts'
import formatZodError from '~/global/helpers/formatZodError.ts'

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  next(createError.NotFound())
}

export const errorHandler = (
  err: Error | HttpError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  if (createError.isHttpError(err)) {
    res.status(err.status).json({ error: { message: err.message } })
    return
  }

  if (err instanceof ZodError) {
    res.status(HTTP_STATUS.CLIENT_ERROR.UNPROCESSABLE_ENTITY).json({ error: formatZodError(err) })
    return
  }

  res.status(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({
    error: {
      message: err.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  })
}

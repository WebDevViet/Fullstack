import type { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { JsonWebTokenError } from 'jsonwebtoken'
import type { ParseParams, ZodTypeAny } from 'zod'

type ReqPart = 'params' | 'query' | 'body' | 'headers'

const validator =
  (reqPart: ReqPart) =>
  <T>(
    schemaToValidate: ZodTypeAny,
    funcMiddleware?: (arg: T, req: Request) => void | Promise<void>,
    parseParams?: Partial<ParseParams>
  ) =>
    async function (req: Request, _res: Response, next: NextFunction) {
      try {
        req[reqPart] = await schemaToValidate.parseAsync(req[reqPart], parseParams)

        if (funcMiddleware) await funcMiddleware(req[reqPart], req)

        next()
      } catch (error: any) {
        // catch logic error
        if (error instanceof createHttpError.HttpError) {
          next(error)
          return
        }

        // catch token error
        if (error instanceof JsonWebTokenError) {
          next(createHttpError.Unauthorized(error.message))
          return
        }

        // catch zod error and other
        next(error)
      }
    }

export const validateBody = validator('body')

export const validateQuery = validator('query')

export const validateParams = validator('params')

export const validateHeaders = validator('headers')

import type { Request, Response, NextFunction } from 'express'
import { pick } from 'radashi'

type SchemaFilter<T> = Array<keyof T>

export const filterBodyMiddleware =
  <T>(schemaFilter: SchemaFilter<T>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    req.body = pick(req.body, schemaFilter)
    next()
  }

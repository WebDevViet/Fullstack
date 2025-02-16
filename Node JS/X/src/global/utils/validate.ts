import type { NextFunction, Request, Response } from 'express'
import type { Joi } from 'express-joi-validations'

type ReqPart = 'params' | 'query' | 'body' | 'headers'
type AssignToReq = {
  valueField: string
  nameAssignment: string
}

class Validate {
  validator = ({
    validSchema,
    reqPart,
    options,
    assignToReq
  }: {
    validSchema: Joi.Schema
    reqPart: ReqPart
    options?: Joi.ValidationOptions
    assignToReq?: AssignToReq
  }) => {
    return async function (req: Request & { [key: string]: any }, _res: Response, next: NextFunction) {
      try {
        req.validationValues ??= {}
        const resultValidate = await validSchema.validateAsync(req[reqPart], { abortEarly: false, ...options })

        req.validationValues[reqPart] = resultValidate

        if (assignToReq) {
          req[assignToReq.nameAssignment] = resultValidate[assignToReq.valueField]
        }
        next()
      } catch (error) {
        next(error)
      }
    }
  }

  validateAsyncParams = (validSchema: Joi.Schema, assignToReq?: AssignToReq, options?: Joi.ValidationOptions) =>
    this.validator({ validSchema, reqPart: 'params', options, assignToReq })

  validateAsyncQuery = (validSchema: Joi.Schema, assignToReq?: AssignToReq, options?: Joi.ValidationOptions) =>
    this.validator({ validSchema, reqPart: 'query', options, assignToReq })

  validateAsyncBody = (validSchema: Joi.Schema, assignToReq?: AssignToReq, options?: Joi.ValidationOptions) =>
    this.validator({ validSchema, reqPart: 'body', options, assignToReq })

  validateAsyncHeaders = (validSchema: Joi.Schema, assignToReq?: AssignToReq, options?: Joi.ValidationOptions) =>
    this.validator({ validSchema, reqPart: 'headers', options, assignToReq })
}

export const { validateAsyncParams, validateAsyncQuery, validateAsyncBody, validateAsyncHeaders } = new Validate()

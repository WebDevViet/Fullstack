import type { Request } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { UserId } from '~/global/types/common.ts'
import type { Authorization } from '~/global/types/JWT.ts'

// type IsAny<T> = 0 extends 1 & T ? true : false | IsAny<T> extends true ? true : false

export type ValidatedRequest<
  ReqBody = undefined,
  ReqParams = undefined,
  ReqQuery = undefined,
  ReqHeaders = undefined
> = Request<
  ReqParams extends undefined ? ParamsDictionary : ReqParams,
  any,
  ReqBody extends undefined ? {} : ReqBody,
  ReqQuery extends undefined ? qs.ParsedQs : ReqQuery
> & {
  validationValues: {
    body: ReqBody
    params: ReqParams
    query: ReqQuery
    headers: ReqHeaders
  }
}

export type AuthenticatedRequest<
  ReqBody = undefined,
  ReqParams = undefined,
  ReqQuery = undefined,
  ReqHeaders = Authorization
> = UserId & ValidatedRequest<ReqBody, ReqParams, ReqQuery, ReqHeaders & Authorization>

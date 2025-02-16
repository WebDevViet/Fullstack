import jwt, { type SignOptions } from 'jsonwebtoken'
import type { TokenPayload } from '../types/JWT.ts'
import formatJWTMessage from './formatJWTMessage.ts'

export const signToken = ({
  payload,
  secretKey,
  options = {}
}: {
  payload: string | object | Buffer
  secretKey: string
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secretKey, options, (err, token) => {
      if (err) reject(err)
      resolve(token as string)
    })
  })
}

export const verifyToken = <T extends TokenPayload>({
  token,
  secretKey,
  label
}: {
  token: string
  secretKey: string
  label: string
}) => {
  return new Promise<T>((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) reject(formatJWTMessage(err, label))
      resolve(decoded as T)
    })
  })
}

import jwt, { type SignOptions } from 'jsonwebtoken'
import type { TokenPayload } from '../types/JWT.ts'

export const signToken = ({
  payload,
  secretKey = process.env.DEFAULT_SECRET_KEY,
  options = {}
}: {
  payload: string | object | Buffer
  secretKey?: string
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
  secretKey = process.env.DEFAULT_SECRET_KEY
}: {
  token: string
  secretKey?: string
}) => {
  return new Promise<T>((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) reject(err)
      resolve(decoded as T)
    })
  })
}

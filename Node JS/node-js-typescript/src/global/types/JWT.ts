import type { JwtPayload } from 'jsonwebtoken'
import type { TokenType, UserVerifyStatus } from '../constants/enum.ts'
import type { ObjectId } from 'mongodb'

export interface TokenPayload extends JwtPayload {
  userId: string
  tokenType: TokenType
}

export interface AccessTokenPayload extends TokenPayload {
  userVerifyStatus: UserVerifyStatus
}

export interface Authorization {
  authorization: ObjectId
}

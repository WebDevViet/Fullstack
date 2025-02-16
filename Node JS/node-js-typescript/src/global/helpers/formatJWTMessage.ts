import type { VerifyErrors } from 'jsonwebtoken'

const formatJWTMessage = (err: VerifyErrors, label: string) => {
  err.message = err.message.replace(/jwt/gi, label).trim()
  return err
}

export default formatJWTMessage

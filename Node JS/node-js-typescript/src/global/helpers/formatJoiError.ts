import type { ValidationError } from 'express-joi-validations'

const formatJoiError = (error: ValidationError) => {
  if (!error) {
    return null
  }

  const errors: Record<string, string> = {}

  for (const detail of error.details) {
    errors[detail.path[0]] = detail.message
  }

  return errors
}

export default formatJoiError

import { isObject, snake, camel } from 'radashi'

export const objSnake = (obj: Record<string, any>): any => {
  if (Array.isArray(obj)) {
    return obj.map((value) => objSnake(value))
  } else if (isObject(obj)) {
    return Object.keys(obj).reduce(
      (acc, key) => {
        const snakeKey = snake(key)
        acc[snakeKey] = objSnake(obj[key])
        return acc
      },
      {} as { [key: string]: any }
    )
  }
  return obj
}

export const objCamel = (obj: Record<string, any>): any => {
  if (Array.isArray(obj)) {
    return obj.map((value) => objCamel(value))
  } else if (isObject(obj)) {
    return Object.keys(obj).reduce(
      (acc, key) => {
        const camelKey = camel(key)
        acc[camelKey] = objCamel(obj[key])
        return acc
      },
      {} as { [key: string]: any }
    )
  }
  return obj
}

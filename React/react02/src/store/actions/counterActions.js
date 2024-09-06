export const increment = (payload = 1) => ({
  type: 'counter/increment',
  payload
})

export const decrement = (payload = 1) => ({
  type: 'counter/decrement',
  payload
})

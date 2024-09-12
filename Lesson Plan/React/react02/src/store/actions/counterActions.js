export const incrementCounter = (payload = 1) => ({
  type: 'counter/increment',
  payload
})

export const decrementCounter = (payload = 1) => ({
  type: 'counter/decrement',
  payload
})

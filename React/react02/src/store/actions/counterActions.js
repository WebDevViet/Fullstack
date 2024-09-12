export const incrementCounter = (payload = 1) => {
  return {
    type: 'counter/increment',
    payload
  }
}

export const decrementCounter = (payload = 1) => {
  return {
    type: 'counter/decrement',
    payload
  }
}

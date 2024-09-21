import { useDispatch, useSelector } from 'react-redux'

const Counter = () => {
  const count = useSelector((state) => state.counter.count)

  const dispatch = useDispatch()

  const increment = () => {
    dispatch({ type: 'count/increment' })
  }

  const decrement = () => {
    dispatch({ type: 'count/decrement' })
  }

  return (
    <>
      <h1>Counter {count}</h1>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </>
  )
}

export default Counter

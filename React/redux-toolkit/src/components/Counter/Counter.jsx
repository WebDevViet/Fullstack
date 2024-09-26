import { useDispatch, useSelector } from 'react-redux'
import { decrementCount, incrementCount, incrementByAmount } from '../../redux/slices/counterSlice'

const Counter = () => {
  const count = useSelector((state) => state.counter.value)

  const dispatch = useDispatch()

  const increment = () => {
    dispatch(incrementCount())
  }

  const decrement = () => {
    dispatch(decrementCount())
  }

  const incrementByValue = () => {
    dispatch(incrementByAmount(10))
  }

  return (
    <>
      <h1>Counter {count}</h1>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={incrementByValue}>10</button>
    </>
  )
}

export default Counter

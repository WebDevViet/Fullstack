import { useDispatch, useSelector } from 'react-redux'
import { decrementCount, incrementCount } from '../../redux/slices/counterSlice'

const Counter = () => {
  const count = useSelector((state) => state.counter.value)

  const dispatch = useDispatch()

  const increment = () => {
    dispatch(incrementCount())
  }

  const decrement = () => {
    dispatch(decrementCount())
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

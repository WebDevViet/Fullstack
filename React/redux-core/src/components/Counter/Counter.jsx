import { useDispatch, useSelector } from 'react-redux'
import { incrementCount, decrementCount } from '../../redux/actions/counterActions'

const Counter = () => {
  const count = useSelector((state) => state.counter.count)

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

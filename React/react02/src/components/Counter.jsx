import { decrement, increment } from '../store/actions/counterActions'
import { useDispatch, useSelector } from '../store/hook'

export default function Counter() {
  const counter = useSelector((state) => state.counter)

  const dispatch = useDispatch()

  const handleIncrement = () => {
    dispatch(increment(5))
  }

  const handleDecrement = () => {
    dispatch(decrement(5))
  }

  return (
    <>
      <h1>Counter {counter}</h1>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleIncrement}>+</button>
    </>
  )
}

/**
 * dispatch = setState
 * dispatch(action)
 * action: {type, payload}
 */

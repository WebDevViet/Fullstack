import { decrementCounter, incrementCounter } from '../store/actions/counterActions'
import { useDispatch, useSelector } from '../store/hook'

export default function Counter() {
  const counter = useSelector((state) => state.counter)

  const dispatch = useDispatch()

  const handleIncrement = () => {
    dispatch(incrementCounter(5))
  }

  const handleDecrement = () => {
    dispatch(decrementCounter(5))
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

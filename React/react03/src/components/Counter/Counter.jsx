import { useState } from 'react'
import Lorem from './Lorem'

const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Click me</button>

      <Lorem />
      <Lorem />
      <Lorem />
      <Lorem />
    </div>
  )
}

export default Counter

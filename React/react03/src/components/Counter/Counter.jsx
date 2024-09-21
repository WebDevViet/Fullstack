import { useState } from 'react'
import Lorem from './Lorem'

const Counter = () => {
  const [count, setCount] = useState(0)
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5])

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Click me</button>

      <div>
        {numbers?.map((number, index) => (
          <p key={index}>{number}</p>
        ))}
      </div>

      <Lorem />
    </div>
  )
}

export default Counter

// if (count === 5) {
//   // Lỗi render
//   setNumbers(null)
// }

// useEffect(() => {
//   if (count === 3) {
//     // Lỗi life cycle
//     setNumbers(null)
//   }
// })

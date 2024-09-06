import { useEffect, useRef, useState } from 'react'
import ChildCounter from './ChildCounter'

export default function MultiCounter() {
  const [counter, setCounter] = useState(0)

  const myCount = useRef(0)

  const increment = () => {
    setCounter(counter + 1)
    myCount.current++
  }

  const decrement = () => {
    setCounter(counter - 1)
    myCount.current--
  }

  const input = useRef(null)
  const childInput = useRef(null)

  useEffect(() => {
    childInput.current.focus()
  }, [])

  return (
    <div className='w-75 mx-auto py-3'>
      <h1>MultiCounter</h1>
      <h2>Counter 1: {counter}</h2>
      <h2>Counter 2: {myCount.current}</h2>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <hr />
      <input type='text' ref={input} />
      <hr />
      <ChildCounter ref={childInput} />
    </div>
  )
}

/** useRef
 * ko tự re-render
 * ko thay đổi giá trị theo thời gian (re-render)
 * thuộc tính ref đặt ở element là tính năng chọc thẳng vào DOM
 */

// Khi nào sử dụng Refs

/** Một vài trường hợp hữu ích để sử dụng refs:

 * Quản lý focus, text selection, hoặc media playback.
 * Trigger animation của một element khác.
 * Tích hợp những thư viện DOM từ bên thứ ba.
 */

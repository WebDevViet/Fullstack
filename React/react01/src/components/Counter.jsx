import { useState } from 'react'

export default function Counter() {
  const [counter, setCounter] = useState(0) // Chạy ở lần mounted

  const increment = () => {
    setCounter(counter + 1) // sẽ ko được chạy ngay mà sẽ chạy ở giai đoạn re-render
  }

  const decrement = () => {
    setCounter(counter - 1)
  }

  return (
    <div>
      <h1 className='text-center'>Counter</h1>
      <p> Number: {counter}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  )
}

/** State:
 * Thay đổi dữ liệu nội bộ trong component
 * Khi state thay đổi ==> component sẽ tự động re-render (gọi lại)
 * không được thay đổi trực tiếp state mà phải thông qua hàm setState
 * Khi cập nhật state (setState) => state sẽ không thay đổi luôn mà nó sẽ ưu tiên re-render
 */

/** Trong functional component => chỉ làm việc JSX, props
 * Muốn làm việc với state, lifeCycle => sử dụng react hook (phiên bản 16.8 trở lên)
 */

/** Hook là gì?
 * Hàm đặc biệt cho phép functional component sử dụng các tính năng của ReactJS, nói đơn giản là nó sẽ móc tới những tính năng mà react core cung cấp
 * Bắt đầu bằng từ khoá use
 * Chỉ sử dụng được ở trong scope Functional Component, hàm con hay ở trong return JSX sẽ ko sử dụng được
 * Cho phép chúng ta tự định nghĩa
 */

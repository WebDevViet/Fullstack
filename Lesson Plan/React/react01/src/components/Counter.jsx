export default function Counter() {
  return (
    <div>
      <h1>Counter: 0</h1>
      <button>+</button>
      <button>-</button>
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
 * Chỉ sử dụng được ở trong scope Functional Component, và hàm con hay ở trong return JSX cũng ko được
 * Cho phép chúng ta tự định nghĩa
 */

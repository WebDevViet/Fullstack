import { useState, useEffect } from 'react'

export default function API() {
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('loading...')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => alert(err))
      .finally(() => setStatus('idle'))
  }, [])

  return (
    <div className='w-75 mx-auto'>
      <h1 className='text-center'>API</h1>
      {status === 'loading...' && <p className='text-center'>{status}</p>}
      {todos?.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </div>
  )
}

/** useEffect(callback, dependencies?)
 * dependencies:
 *  - null | undefined  => khi component re-render thì cb trong useEffect sẽ tự động được gọi - componentDidUpdate
 *  - [] => cb trong useEffect chỉ được gọi duy nhất 1 lần khi component được render lần đầu tiên - componentDidMount
 *  - [variable1, variable2, ...] => khi 1 trong các dependencies(variable1, variable2,...) tham chiếu tới bị thay đổi thì cb trong useEffect sẽ được gọi
 */

/*
Thứ tự hoạt động của Hook useEffect 
1. State thay đổi
2. Component Re-render
3. Update UI
4. Cleanup (Nếu có)
5. Callback useEffect

Một số trường hợp phải giải phóng trong cleanup
- timer: setInterval, setTimeout
- storage: localStorage, sessionStorage, cookie, worker,...
- Nếu sử dụng design pattern observer ==> Cần unsubscribe
- event: removeEventListener
- HTTP Request, Response
- Document
*/

/** componentDidUpdate
 * Side effect là một khái niệm trong các ứng dụng nói chung, không chỉ riêng với React. Mỗi một công cụ sẽ có những cách khác nhau để xử lý các side effect. Vì vậy, việc hiểu rõ side effect là một điều quan trọng trong việc xây dựng các ứng dụng hiện đại. 

 * Nhiệm vụ của các component và React chủ yếu là tạo ra giao diện người dùng. React đảm bảo việc thay đổi các dữ liệu trên màn hình dựa vào dữ liệu và các tương tác với ứng dụng từ phía người dùng.

 * Tuy nhiên có rất nhiều những tương tác từ ứng dụng web tới nhiều thành phần khác nhau. Một vài ví dụ có thể kể ra là:

 * Xử lý HTTP request, response
 * Tương tác với Local Storage, Session Storage.
 * Xử lý timer (setTimeout, setInterval)
 * Thực hiện subscribes / unsubscribes các dịch vụ bên ngoài.
 * Tương tác trực tiếp với DOM

 * Những logic được thực thi bên ngoài phạm vi của component đều được gọi là các “side effect”. Các side effect có thể cập nhật lại giao diện ứng dụng ở một thời điểm khác nhau.

 * Xét một ví dụ đơn giản như sau:

 1. Người dùng tiến hành đăng nhập. Khi click vào button “Login”, tiến hành gửi thông tin user lên server.
 2. Nếu người dùng nhập chính xác, tiến hành điều hướng về trang chủ.
 3. Nếu người dùng nhập không chính xác, tiến hành hiển thị lỗi yêu cầu người dùng nhập lại.

 * Ở trong ví dụ trên, bước 1 là công việc của component. Tuy nhiên, bước 2 hoặc bước 3 sẽ được thực hiện dựa vào thông tin kết quả trả về. Đó có thể coi là các side effect, khi việc cập nhật giao diện ứng dụng sẽ phụ thuộc vào kết quả từ bên ngoài.

 ** Tóm lại: những tác vụ không tham gia vào quá trình render trực tiếp tới giao diện thì nó là sideEffect.
 */

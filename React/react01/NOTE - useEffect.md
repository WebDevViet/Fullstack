# useEffect

- `useEffect` được sử dụng trong functional component đóng vai trò như những life cycle bên class component.

- `useEffect` nhận vào 2 tham số là effect function và dependencies array

- Effect function sẽ chạy sau khi component được đưa vào DOM (mounted) - component render lần đầu tiên

**Chúng ta sẽ có 3 trường hợp là**

## 1. Không truyền dependency

```jsx
useEffect(() => {
  //...handle something
})
```

Trường hợp này nó đóng vai trò như một `componentDidUpdate`. Effect function sẽ chạy lại mỗi khi component re-render

## 2. Dependency là array rỗng `[]`

```jsx
useEffect(() => {
  //...handle something
}, [])
```

Trường hợp này nó đóng vai trò như một `componentDidMount`. Effect function chạy duy nhất 1 lần sau khi component render lần đầu.

## 3. Dependency có các item `[a, b, ...]`

```jsx
useEffect(() => {
  //...handle something
}, [a, b])
```

Trường hợp này nó đóng vai trò như một `componentDidUpdate` nhưng chỉ khi giá trị `a` hoặc `b` bị thay đổi tham chiếu (vùng nhớ) thì cái effect function nó mới được chạy lại

> [!TIP]
> Trong trường hợp `setState` trong `useEffect` mà cần dùng `state` trước đó và bị react cảnh báo phải đưa `state` vào dependency (thường là `state` thuộc kiểu dữ liệu tham chiếu), nhưng không muốn khai báo thêm item trong dependency thì hãy dùng `(prevState) ⇒ {}`

### Clean up function

`useEffect` còn có một clean up function dùng để chạy trước khi effect function chạy lại ở lần tiếp theo

Áp dụng điều này, chúng ta có thể sử dụng clean up function để huỷ đăng ký, huỷ gọi api trước khi component của chúng ta bị destroy. Giống `componentWillUnmount` bên class.

```jsx
useEffect(() => {
  //...handle something

  return () => {
    // clean up function
  }
}, [])
```

Một số trường hợp phải giải phóng trong cleanup

- timer: setInterval, setTimeout
- storage: localStorage, sessionStorage, cookie, worker,...
- Nếu sử dụng design pattern observer ==> Cần unsubscribe
- event: removeEventListener
- HTTP Request

//A => B => C => D
//Context
/\*

- Khởi tạo đối tượng Context==> Dùng hàm createContext
- Bọc Component Provider (Của Context) ==> Để gửi dữ liệu vào context
- Lấy dữ liệu từ Context: Dùng component Consumer hoặc hook useContext
  \*/

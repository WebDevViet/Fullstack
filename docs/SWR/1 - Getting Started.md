# Getting Started

## Cài Đặt

Bên trong thư mục dự án React của bạn, chạy lệnh sau để cài đặt thư viện:

- **Với pnpm:**
  ```bash
  pnpm add swr
  ```
- **Với npm hoặc yarn:**  
  (Tương tự, chỉ cần dùng câu lệnh cài đặt tương ứng)

## Bắt Đầu Nhanh

Đối với các API RESTful thông thường trả về dữ liệu JSON, trước tiên bạn cần tạo một hàm _fetcher_. Đây chỉ là một _wrapper_ đơn giản cho hàm `fetch` có sẵn của trình duyệt:

```js
const fetcher = (...args) => fetch(...args).then((res) => res.json())
```

💡 Nếu bạn muốn sử dụng API GraphQL hoặc các thư viện như Axios, bạn có thể tự tạo hàm fetcher riêng cho mình. (Xem thêm các ví dụ nếu cần.)

Sau đó, bạn có thể import hook `useSWR` và sử dụng nó trong bất kỳ component hàm nào:

```js
import useSWR from 'swr'

function Profile({ userId }) {
  const { data, error, isLoading } = useSWR(`/api/user/${userId}`, fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  // Render dữ liệu
  return <div>hello {data.name}!</div>
}
```

Thông thường, một yêu cầu có thể có ba trạng thái: **"đang tải"** (loading), **"sẵn sàng"** (ready) hoặc **"lỗi"** (error). Bạn có thể dựa vào giá trị của `data`, `error` và `isLoading` để biết được trạng thái hiện tại và hiển thị giao diện phù hợp.

---

## Tái Sử Dụng Code

Khi xây dựng một ứng dụng web, có thể bạn sẽ cần sử dụng lại cùng một dữ liệu ở nhiều nơi. Rất dễ dàng để tạo ra các hook dữ liệu có thể tái sử dụng trên nền tảng của SWR:

```js
function useUser(id) {
  const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher)
  return {
    user: data,
    isLoading,
    isError: error
  }
}
```

Và sử dụng hook ấy trong các component:

```js
function Avatar({ userId }) {
  const { user, isLoading, isError } = useUser(userId)
  if (isLoading) return <Spinner />
  if (isError) return <Error />
  return <img src={user.avatar} />
}
```

Bằng cách này, bạn không cần viết code xử lý việc gửi yêu cầu, cập nhật trạng thái loading hay sau đó hiển thị kết quả theo kiểu mệnh lệnh (imperative). Thay vào đó, bạn khai báo dữ liệu nào được sử dụng trong mỗi component, giúp code trở nên rõ ràng và dễ bảo trì hơn.

---

## Ví Dụ Ứng Dụng

Hãy cùng xem một ví dụ thực tế. Giả sử trang web của bạn hiển thị một thanh điều hướng (navbar) cùng nội dung chính, cả hai đều cần thông tin của người dùng.

**Cách làm truyền thống:**  
Bạn thường fetch dữ liệu một lần trong component cấp cao và truyền dữ liệu đó qua props cho các component con. Ví dụ:

```js
// Component của trang
function Page({ userId }) {
  const [user, setUser] = useState(null)

  // Fetch dữ liệu
  useEffect(() => {
    fetch(`/api/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
  }, [userId])

  // Nếu chưa có dữ liệu, hiển thị loading
  if (!user) return <Spinner />

  return (
    <div>
      <Navbar user={user} />
      <Content user={user} />
    </div>
  )
}

// Các component con
function Navbar({ user }) {
  return (
    <div>
      ...
      <Avatar user={user} />
    </div>
  )
}

function Content({ user }) {
  return <h1>Welcome back, {user.name}</h1>
}

function Avatar({ user }) {
  return <img src={user.avatar} alt={user.name} />
}
```

Trong trường hợp này, bạn phải duy trì việc fetch dữ liệu ở component cấp cao và truyền dữ liệu qua nhiều cấp component, làm cho việc quản lý và mở rộng code trở nên phức tạp hơn, nhất là khi có nhiều dữ liệu khác nhau được yêu cầu. Dù có thể dùng Context để tránh việc chuyền props quá nhiều, nhưng vấn đề vẫn tồn tại khi các component động cần những dữ liệu mà component gốc chưa biết.

**Giải pháp của SWR:**  
Với hook `useUser` vừa tạo, bạn có thể tái cấu trúc code như sau:

```js
// Component của trang
function Page({ userId }) {
  return (
    <div>
      <Navbar userId={userId} />
      <Content userId={userId} />
    </div>
  )
}

// Các component con
function Navbar({ userId }) {
  return (
    <div>
      ...
      <Avatar userId={userId} />
    </div>
  )
}

function Content({ userId }) {
  const { user, isLoading } = useUser(userId)
  if (isLoading) return <Spinner />
  return <h1>Welcome back, {user.name}</h1>
}

function Avatar({ userId }) {
  const { user, isLoading } = useUser(userId)
  if (isLoading) return <Spinner />
  return <img src={user.avatar} alt={user.name} />
}
```

Giờ đây, dữ liệu chỉ được fetch ở những component thực sự cần nó, giúp cho các component trở nên độc lập và dễ bảo trì hơn. Quan trọng nhất, dù nhiều component cùng sử dụng `useUser` với cùng một key, chỉ có **một yêu cầu** được gửi đến API nhờ hệ thống tự động loại bỏ yêu cầu trùng lặp, cache và chia sẻ dữ liệu.

Ngoài ra, ứng dụng của bạn có thể tự động làm mới (refetch) dữ liệu khi người dùng chuyển đổi giữa các tab hoặc khi kết nối mạng được khôi phục. Điều này giúp dữ liệu luôn cập nhật mới nhất cho người dùng.

---

**Cập nhật lần cuối:** February 13, 2025  
**API Powered by SWR**

---

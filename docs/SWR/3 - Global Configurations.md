# Cấu Hình Toàn Cục

SWR cho phép bạn cấu hình toàn cục cho tất cả các hook thông qua context `SWRConfig` – một cách để thiết lập các tùy chọn chung cho tất cả các hook của SWR.

Ví dụ cơ bản:

```jsx
<SWRConfig value={options}>
  <Component />
</SWRConfig>
```

Trong ví dụ này, tất cả các hook SWR bên trong `<SWRConfig>` sẽ sử dụng các tùy chọn đã được cung cấp trong `options`.

---

## Ví Dụ: Cấu Hình Toàn Cục

Giả sử bạn muốn tất cả các hook SWR sử dụng cùng một fetcher để tải dữ liệu JSON và tự động refresh mỗi 3 giây. Bạn có thể làm như sau:

```jsx
import useSWR, { SWRConfig } from 'swr'

function Dashboard() {
  const { data: events } = useSWR('/api/events')
  const { data: projects } = useSWR('/api/projects')
  const { data: user } = useSWR('/api/user', { refreshInterval: 0 }) // ghi đè tùy chọn
  // ...
}

function App() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json())
      }}
    >
      <Dashboard />
    </SWRConfig>
  )
}
```

Ở đây, mọi hook bên trong `<SWRConfig>` sẽ tự động dùng fetcher được cung cấp và tự làm mới dữ liệu sau mỗi 3000 mili giây (3 giây).

---

## Cấu Hình Lồng Nhau (Nesting Configurations)

`SWRConfig` cho phép lồng các cấu hình với nhau. Cấu hình từ context cha sẽ được gộp lại với cấu hình của context con.

Có hai cách để cung cấp cấu hình:

### 1. **Cấu hình dưới dạng đối tượng (Object Configuration):**

Các giá trị đơn giản (primitive) như số sẽ được ghi đè, trong khi những đối tượng có thể được hợp nhất.

**Ví dụ:**

```jsx
import { SWRConfig, useSWRConfig } from 'swr'

function App() {
  return (
    <SWRConfig
      value={{
        dedupingInterval: 100,
        refreshInterval: 100,
        fallback: { a: 1, b: 1 }
      }}
    >
      <SWRConfig
        value={{
          dedupingInterval: 200, // ghi đè giá trị của context cha vì đây là giá trị nguyên thủy
          fallback: { a: 2, c: 2 } // sẽ được hợp nhất với giá trị của context cha
        }}
      >
        <Page />
      </SWRConfig>
    </SWRConfig>
  )
}

function Page() {
  const config = useSWRConfig()
  // config sẽ là: { dedupingInterval: 200, refreshInterval: 100, fallback: { a: 2, b: 1, c: 2 } }
}
```

### 2. **Cấu hình dưới dạng hàm (Functional Configuration):**

Một hàm nhận vào cấu hình của context cha và trả về cấu hình mới để bạn tùy chỉnh.

**Ví dụ:**

```jsx
import { SWRConfig, useSWRConfig } from 'swr'

function App() {
  return (
    <SWRConfig
      value={{
        dedupingInterval: 100,
        refreshInterval: 100,
        fallback: { a: 1, b: 1 }
      }}
    >
      <SWRConfig
        value={(parent) => ({
          dedupingInterval: parent.dedupingInterval * 5,
          fallback: { a: 2, c: 2 }
        })}
      >
        <Page />
      </SWRConfig>
    </SWRConfig>
  )
}

function Page() {
  const config = useSWRConfig()
  // config sẽ là: { dedupingInterval: 500, fallback: { a: 2, c: 2 } }
}
```

---

## Extra APIs: Cache Provider

Ngoài các tùy chọn đã liệt kê, `SWRConfig` còn chấp nhận một hàm `provider` tùy chọn để định nghĩa cache riêng. Bạn có thể tham khảo mục Cache để biết thêm chi tiết.

Ví dụ sử dụng `provider`:

```jsx
<SWRConfig value={{ provider: () => new Map() }}>
  <Dashboard />
</SWRConfig>
```

Ở đây, cache mặc định được thiết lập thành một instance của `Map`.

---

## Truy Cập Cấu Hình Toàn Cục

Bạn có thể lấy các cấu hình toàn cục cũng như các hàm như `mutate` và `cache` bằng cách sử dụng hook `useSWRConfig`:

```jsx
import { useSWRConfig } from 'swr'

function Component() {
  const { refreshInterval, mutate, cache, ...restConfig } = useSWRConfig()
  // Sử dụng các cấu hình và hàm theo nhu cầu
}
```

Nếu không có `<SWRConfig>` nào, hook `useSWRConfig` sẽ trả về các cấu hình mặc định.

---

**Cập nhật lần cuối:** 23 tháng 6, 2023

**API Truy xuất Dữ liệu được hỗ trợ bởi Cấu hình Toàn Cục – SWR**

---

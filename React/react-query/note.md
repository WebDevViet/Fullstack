# REACT QUERY

GLOBAL STATE:

- Client State => redux, recoil, zustand, mobx, ...
- Server State => RTK query, react query, swr, ...

## React query là gì

> [!NOTE]
> React Query là một thư viện quản lý trạng thái được sử dụng để tương tác với dữ liệu bất đồng bộ trên máy chủ (server state) và lưu trữ dữ liệu trong cache trên máy khách (client state).

Ưu điểm:

- Cải thiện trải nghiệm người dùng.
- Dễ sử dụng.
- Cung cấp nhiều tùy chọn cấu hình.
- Dễ dàng debug.

### Các khái niệm cơ bản trong react query

- Query: Một query trong React Query là một yêu cầu lấy dữ liệu từ một nguồn nào đó (API, đường dẫn tới file JSON, hoặc bất kỳ nguồn dữ liệu bất đồng bộ nào khác).

- Query Cache: Query Cache trong React Query là một bộ nhớ cache được quản lý bởi React Query.

- Mutation: Mutation trong React Query là một cách để thay đổi dữ liệu trên máy chủ. Mutations được sử dụng để thêm, cập nhật hoặc xóa dữ liệu.

- Refetching: Refetching là quá trình gửi lại yêu cầu lấy dữ liệu từ máy chủ để cập nhật dữ liệu.

- Invalidating queries: Invalidating queries là quá trình xóa hoặc cập nhật các query trong cache của React Query.

## How to use

### Install & Config

1. Cài package

```bash
bun add @tanstack/react-query @tanstack/react-query-devtools
```

2. Thêm Provider

```jsx - main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import App from './App.jsx'
import './index.css'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  // Provide the client to your App
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <App />
    </StrictMode>
    <ReactQueryDevtools initialIsOpen={false} /> //default ReactQueryDevtools has prop position='bottom-right'
  </QueryClientProvider>
)
```

### Use in Component

```jsx
export const App = () => {
  const getData = async () => {
    const res = await fetch('server-api')
    return await res.json()
  }

  const { isLoading, isError, data } = useQuery({ queryKey: ['nameQuery'], queryFn: getData })
  //...
}
```

- Sau lần chạy đầu tiên => data trả về sẽ được lưu vào cache => những lần sau sẽ không còn loading nữa, vì UI sẽ được render từ dữ liệu lấy trong query cache.
- Mặc dù nó vẫn call lại api như bình thường nhưng đây là 1 tính năng mà useQuery dùng để cập nhật mới lại dữ liệu cho cache và ta vẫn có thể config được tính năng này tuỳ ý

### useQuery

```jsx useQuery in top level component
const {
  isLoading, // default: true | true ngay cả khi useQuery chưa call api
  isError,
  data,
  isFetching // isFetching = true khi đang fetching data
} = useQuery({
  queryKey: ['nameQuery'],
  queryFn: getData,
  // Error
  retry: 1, // default: 3 | số lần refetch khi bị lỗi
  retryDelay: 2000, // default: 1000 | time refetch giữa các lần bị lỗi
  retryOnMount: false, // default: true | Có refetch lỗi trước đó khi component được mount lại không
  // Refetch
  refetchOnWindowFocus: false, // default: true | có refetch khi cửa sổ được focus trở lại hay ko
  refetchInterval: 3000, // default: undefined | tự động refetch sau một khoảng thời gian
  refetchIntervalInBackground: 2000, // default: undefined | giống refetchInterval nhưng hoạt động được cả khi window ko được focus
  refetchOnReconnect: false, // default: true | tự động refetch khi có mạng trở lại
  refetchOnMount: false // default: true | có refetch khi component được mount lại hay ko (dù data đã có trong cache)
  // Cache Time
  cacheTime: 2000, // default: 5p | life time của một data được lưu trong cache khi ko còn được sử dụng (recommend: cacheTime > staleTime)
  staleTime: 3000, // default: 0 | time trạng thái của một data được coi là còn mới hay không, nếu có thì sẽ ko refetch
  // Callback with status
  onSuccess: () => {}, // cb call khi query thành công
  onError: () => {}, // cb call query khi thất bại
  onSettled: () => {}, // cb call khi đã query xong
  // Dependency
  enabled: false, // default: true | nếu enabled = true thì mới query
  select: (data) => data, // default: undefined | xử lý dữ liệu trước khi trả về cho biến data, nhưng ko làm ảnh hưởng data trong cache
  // Initial data
  initialData: [], // default: undefined | dữ liệu khởi tạo cho data trong khi fetching hoặc retry
  placeholderData: [], // default: undefined | giống như initialData nhưng không được lưu vào cache
  keepPreviousData: true, // default: false | trong khi đang query dữ liệu mới sẽ tạm thời lấy data cache trước đó hiển thị cho UI
})
```

- useQuery by Id

```jsx
const getData = async (context) => {
  const res = await fetch(`server-api/${context.queryKey[0]}`)
  return await res.json()
}

const { isLoading, isError, data } = useQuery({
  queryKey: ['nameQuery'],
  queryFn: getData
})
```

> [!TIP]
> Nên custom hook để sử dụng useQuery một cách đơn giản hơn ở component

### useInfiniteQuery

```jsx useInfiniteQuery in top level component
const {
  // Có các value trước như useQuery
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  fetchPreviousPage,
  isFetchingPreviousPage,
  hasPreviousPage
} = useInfiniteQuery({
  // Có các options trước như useQuery
  getNextPageParam: (lastPage) => {},
  getPreviousPageParam: (firstPage) => {}
})
```

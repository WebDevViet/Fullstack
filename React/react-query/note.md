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

## Install & Config

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

## How to use

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
  isFetching, // isFetching = true khi đang fetching data
  isStale
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
  cacheTime: 2000, // v4 - default: 5p | life time của một data được lưu trong cache khi ko còn được sử dụng (recommend: cacheTime > staleTime)
  gcTime: 2000, // v5 - default: 5p | life time của một data được lưu trong cache khi ko còn được sử dụng (recommend: cacheTime > staleTime)
  staleTime: 3000, // default: 0 | time status của một data được coi là còn mới hay không, nếu có thì sẽ ko refetch
  // Callback with status
  onSuccess: () => {}, // cb call khi query thành công
  onError: () => {}, // cb call query khi thất bại
  onSettled: () => {}, // cb call khi đã query xong, tương tự như finally
  // Dependency
  enabled: false, // default: true | nếu enabled = true thì mới query
  select: (data) => data, // default: undefined | xử lý dữ liệu trước khi trả về cho biến data, nhưng ko làm ảnh hưởng data lưu ở cache
  // Initial data
  initialData: [], // default: undefined | dữ liệu khởi tạo cho data trong khi fetching hoặc retry
  placeholderData: [], // default: undefined | giống như initialData nhưng không được lưu vào cache
  keepPreviousData: true, // default: false | trong khi đang query dữ liệu mới sẽ tạm thời lấy data cache trước đó hiển thị cho UI,

})
```

#### useQuery by Id

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

### useQueries

- useQueries: dùng để truy vấn nhiều query cùng 1 lúc

#### Cách 1

```jsx
const queryResult = useQueries({
  queries: [
    {
      queryKey: ['nameQuery', queryId],
      queryFn: getData
      // other options...
    },
    {
      queryKey: ['nameQuery', queryId],
      queryFn: getData
      //...
    }
  ]
})

// queryResult: [
//   { data, isFetching, isLoading, isError },
//   { ... }
// ]
```

#### Cách 2

```jsx
const queryResult = useQueries({
  queries: dataQuery.map((queryId) => ({
    queryKey: ['nameQuery', queryId],
    queryFn: getData
  }))
})

// queryResult: [
//   { data, isFetching, isLoading, isError },
//   { ... }
// ]
```

### useInfiniteQuery

```jsx useInfiniteQuery in top level component
const {
  // Có các value như useQuery
  fetchNextPage, // callback: khi gọi sẽ query đến trang mà getNextPageParam trả về
  hasNextPage, // boolean: false khi getNextPageParam => undefined
  isFetchingNextPage, // boolean: true khi đang fetchNextPage
  fetchPreviousPage, // callback: khi gọi sẽ query lùi về trang về mà getPreviousPageParam trả về
  hasPreviousPage, // boolean: false khi getPreviousPageParam => undefined
  isFetchingPreviousPage // boolean: true khi đang fetchPreviousPage
} = useInfiniteQuery({
  // Có các options như useQuery
  initialPageParam: 1,
  getNextPageParam: (currPage, allPage) => {},
  getPreviousPageParam: (currPage, allPage) => {}
})
```

### useQueryClient

#### Get data cache

```jsx
import { useQueryClient } from '@tanstack/react-query'

const App = () => {
  const queryClient = useQueryClient()

  // TH1: Lấy 1 data
  const data = queryClient.getQueryData(['nameQuery', queryId], {
    exact: true // default: true
  })
  // ex: data = { data: [], totalPages }

  // TH2: Lấy nhiều data
  const queries = [
    ['nameQuery', queryId],
    ['nameQuery', queryId]
  ]

  const data = queries.forEach((query) => {
    return queryClient.getQueryData(query)
  })

  // TH3: Lấy tất data
  const data = queryClient.getQueriesData()
  // ex: data = [
  //   [['nameQuery', queryId], { data: [], totalPages }],
  //   [['nameQuery', queryId], { data: [], totalPages }]
  // ]
}
```

> [!NOTE]  
> Nếu ko có truyền queryId thì ta sẽ dùng `exact = false`, nó sẽ tìm data đầu tiên có `queryKey` khớp với `'nameQuery'`, còn `exact = true` thì ta phải có `queryId` nếu ko sẽ return về `undefined`

#### Delete data cache

> [!NOTE]  
> **removeQueries**: có chức năng xoá data và cả query key trong cache

```jsx
const App = () => {
  const queryClient = useQueryClient()

  const handleClearCache = () => {
    // TH1: Xoá 1 query cache
    queryClient.removeQueries({ queryKey: ['nameQuery', queryId] })

    // TH2: Xoá nhiều query cache
    const queries = [
      ['nameQuery', queryId],
      ['nameQuery', queryId]
    ]

    queries.forEach((queryKey) => {
      queryClient.removeQueries({ queryKey })
    })

    // TH3: Xoá tất cả query cache
    queryClient.removeQueries()
  }

  return <button onClick={handleClearCache}></button>
}
```

#### Reset data cache

> [!NOTE]  
> **resetQueries**: có chức năng xoá data nhưng vẫn giữ được query key trong cache

- Chúng ta dùng tương tự như removeQueries: Reset nhiều, reset 1 hoặc tất cả

```jsx
queryClient.resetQueries({ queryKey: ['nameQuery', queryId] })
```

#### Refetch data cache

> [!NOTE]  
> **refetchQueries**: refetch lại data dựa vào query key

- Chúng ta dùng tương tự như removeQueries: refetch nhiều query, refetch 1 hoặc tất cả query

```jsx
queryClient.refetchQueries({ queryKey: ['nameQuery', queryId] })
```

#### Set data cache

- **setQueryData**: set lại data mới dựa vào query key

```jsx
queryClient.setQueryData({ queryKey: ['nameQuery', queryId] }, newData)
```

- newData: string || number || boolean || object || array
- newData: (oldData) => {...oldData, ...newData}
- newData: (oldData) => [...oldData, ...newData]

> [!WARNING]
> Nên immutable data với **setQueryData**, tương tự khi làm việc với setState trong react

#### Invalidate data cache

> [!NOTE]  
> **invalidateQueries**: giống như refetchQueries nhưng nó sẽ check queryKey phải đang được sử dụng thì mới refetch, ko nó sẽ bỏ qua

- Chúng ta dùng tương tự như removeQueries: refetch nhiều query, refetch 1 hoặc tất cả query

```jsx
queryClient.invalidateQueries({ queryKey: ['nameQuery', queryId] })
```

#### Prefetch data cache

> [!NOTE]  
> **prefetchQuery**: dùng để tải trước data và đưa vào cache

```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['nameQuery', queryId],
      queryFn: fetchData
    })
  }, [])
}
```

#### Cancel Query

```jsx
const QueryClient = () => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['nameQuery', queryId],
    queryFn: ({ signal }) => fetchData({ signal })
  })

  useEffect(() => {
    return () => {
      queryClient.cancelQueries({ queryKey: ['nameQuery', queryId] })
    }
  }, [])

  return (
    <>
      <h1>Query Client</h1>
    </>
  )
}
```

### useMutation

- Thường được dùng với các method cần gửi dữ liệu như: post, put, patch, delete

#### POST

```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const queryClient = useQueryClient()

  const postData = async (data = {}) => {
    const res = await axios.post('/server-api', data)
    return res.data
  }

  const mutation = useMutation({
    mutationFn: postData,
    onSuccess: (resData) => {
      // resData = postData => res.data
      queryClient.setQueryData(['nameQuery', resData.id], resData)
    }
  })

  const handlePostData = () => {
    mutation.mutate(newData)
  }
}
```

#### DELETE

```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const queryClient = useQueryClient()

  const deleteData = async (id) => {
    const res = await axios.delete('/server-api/' + id)
    return id
  }

  const mutation = useMutation({
    mutationFn: deleteData,
    onSuccess: (idDeleted) => {
      // [].filter
      queryClient.setQueryData(['nameQuery', queryId], idDeleted)
      // del => str || num || boolean
      queryClient.removeQueries(['nameQuery', queryId])
    }
  })

  const handleDeleteData = (id) => {
    mutation.mutate(id)
  }
}
```

#### PATCH

```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const queryClient = useQueryClient()

  const updateData = async ({ id, data }) => {
    const res = await axios.patch('/server-api/' + id, data)
    return { id, newData: res.data }
  }

  const mutation = useMutation({
    mutationFn: updateData,
    onSuccess: ({ id, newData }) => {
      queryClient.setQueryData(['nameQuery', id], newData)
    }
  })

  const handleUpdateData = (id) => {
    mutation.mutate({ id, data })
  }
}
```

### useIsFetching

> [!NOTE]  
> `useIsFetching` sẽ trả về cho ta số lượng các query đang fetching

```jsx
import { useIsFetching } from '@tanstack/react-query'

const App = () => {
  const isFetching = useIsFetching()
  // isFetching = number, ex: 3
}
```

### useIsMutating

> [!NOTE]  
> `useIsMutating` sẽ trả về cho ta số lượng các query đang mutate

```jsx
import { useIsMutating } from '@tanstack/react-query'

const App = () => {
  const isMutating = useIsMutating()
  // isMutating = number, ex: 1
}
```

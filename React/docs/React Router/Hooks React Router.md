# Hooks React Router

## useLocation

- Trả về thông tin vị trí hiện tại của URL như: pathname, search, hash, state, key

_Blogs.jsx - URL: /blogs?page=2&limit=10#123456_

```jsx
import { useLocation } from 'react-router-dom'

const Blogs = () => {
  const location = useLocation()
  //   location = {
  //     pathname: '/blogs',
  //     search: '?page=2&limit=10',
  //     hash: '#123456',
  //     state: null,
  //     key: 'default'
  //   }
}
```

## useNavigate

### Redirect - Chuyển hướng đến trang cụ thể

```jsx
import { useNavigate } from 'react-router-dom'

const App = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/thank-you')
  }

  //...
}
```

- Khi hàm navigate được gọi sẽ chuyển hướng đến trang `/thank-you`

### Send Data - Gửi data tới trang được chuyển hướng

_App.jsx_

```jsx
navigate('/thank-you', { state: { email: 'abc@gmail.com', ...} })
```

_ThankYou.jsx_

```jsx
const ThankYou = () => {
  const location = useLocation()
  //   location = {
  //     pathname: '/thank-you',
  //     search: '',
  //     hash: '',
  //     state: { email: 'abc@gmail.com', ...},
  //     key: '...'
  //   }
}
```

> [!NOTE]
> Nếu ko được gửi data thì `state` trong **location** sẽ có giá trị là `null`

### Replace - Thay thế url hiện tại

```jsx
navigate('/home', { replace: true })
```

- Khi người dùng chuyển hướng, trang đích sẽ không lưu thêm trong history stack nữa, mà nó sẽ thay thế trang hiện tại trong đó luôn.

### Back / Forward - Chuyển trang

#### Back

- History stack: A -> B -> C
- Current page: B

```jsx
navigate(-1)
```

- Current page: A

---

- History stack: A -> B -> C
- Current page: C

```jsx
navigate(-2)
```

- Current page: A

---

#### Forward

---

- History stack: A -> B -> C
- Current page: B

```jsx
navigate(1)
```

- Current page: C

---

### Params Object

- Chúng ta có thể chuyền tham số cho navigate dưới dạng object đang mô tả url

```jsx
import { createSearchParams } from 'react-router-dom'

const searchValue = createSearchParams({ page: 2, limit: 10 }).toString()

navigate({
  pathName: '/products',
  search: searchValue, // ?page=2&limit=10
  hash: '#123456'
})
```

> [!TIP]  
> `createSearchParams` là một hàm để tạo đối tượng **searchParams** có đối số là 1 object mô tả url, và ta chỉ cần `toString()` nữa là nó sẽ thành dạng chuỗi search → `page=2&limit=10`, còn dấu **?** sẽ được hàm `navigate` thêm một cách tự động

## useParams

- Hook useParams trả về một object gồm các cặp key/value của các dynamic params từ URL hiện tại được khớp với `<Route path>`. Child routes thừa hưởng tất cả params từ các routes cha của chúng.

_App.jsx_

```jsx
const App = () => {
  return (
    <Routes>
      <Route path='/products'>
        <Route index element={<Products />} />
        <Route path=':id'>
          <Route index element={<ProductDetail />} />
          <Route path=':slug' element={<ProductDetail />} />
        </Route>
      </Route>
    </Routes>
  )
}
```

_ProductDetail.jsx - URL: /products/5/intel-core-i9_

```jsx
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
  const { id, slug } = useParams()
  // id = '5'
  // slug = 'intel-core-i9'
}
```

## useSearchParams

- Dùng để tương tác với search params trên url

_ProductList.jsx - URL: /products?page=2&limit=10_

```jsx
import { useSearchParams } from 'react-router-dom'

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  searchParams.get('page') // '2'
  searchParams.get('limit') // '10'

  Array.from(searchParams) // [['page', '2'], ['limit', '10']]

  setSearchParams({
    page: 2,
    limit: 10,
    category: ['a', 2, false]
  }) // 'page=2&limit=10&category=a&category=2&category=false'
}
```

## useOutletContext

- Dùng để lấy giá trị data từ props context trong `<Outlet context={data} />` nếu được truyền tới

_AuthenMiddleware.jsx_

```jsx
import { Navigate, Outlet } from 'react-router-dom'

const AuthenMiddleware = () => {
  let isAuthen = true
  return isAuthen ? <Outlet context={{ profile: 'react' }} /> : <Navigate to={'/auth/login'} />
}

export default AuthenMiddleware
```

_App.jsx_

```jsx
<Route element={<AuthenMiddleware />}>
  <Route path='/profile' element={<Profile />} />
</Route>
```

_Profile.jsx_

```jsx
import { useOutletContext } from 'react-router-dom'

const Profile = () => {
  const context = useOutletContext()
  // context.profile = 'react'
}
```

> [!NOTE]
> Nếu không được chuyền context ở `Outlet` thì mặc định sẽ có giá trị là null

## useResolvedPath

- Chuyển chuỗi url thành đối tượng mô tả nó

```jsx
import { useResolvedPath } from 'react-router-dom'

const resolvedPath = useResolvedPath('/blog?page=2&limit=10#123')

// resolvedPath = {
//   pathname: '/blog',
//   search: '?page=2&limit=10',
//   hash: '#123'
// }
```

## useMatch

- Thường dùng để kiểm tra đối số có match với url hiện tại hay không

```jsx
import { useResolvedPath } from 'react-router-dom'

const { pathname } = useResolvedPath('/blog?page=2&limit=10#123')

const match = useMatch({
  path: pathname
})
```

- Nếu match thì sẽ return về `obj = {params: {}, pathname: '/blog', pathnameBase: '/blog', pattern: {path: '/blog'}}`

- Nếu ko match thì sẽ return về `null`

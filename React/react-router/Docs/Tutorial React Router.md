# REACT ROUTER

## Install & Config

```bash with npm
npm install react-router-dom
```

```bash with yarn
yarn add react-router-dom
```

```bash with pnpm
pnpm add react-router-dom
```

```bash with bun
bun add react-router-dom
```

_main.jsx_

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
)
```

## How to use

### Khai báo routes

#### Cách 1: Khai báo routes dùng component Routes và Route

_App.jsx_

```jsx
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
      <header>
        <Menu />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/products/:id' element={<ProductDetail />} />
        </Routes>
      </main>
    </>
  )
}

export default App
```

> [!TIP]
>
> - Dùng thẻ `Link` để redirect mà ko bị reload page
> - Dùng thẻ `NavLink` có chức năng như thẻ `Link` nhưng nó thêm class `.active` khi match route

_Menu.jsx_

```jsx
import { NavLink } from 'react-router-dom'

const Menu = () => {
  return (
    <ul>
      <li>
        <NavLink to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink to='/products'>Products</NavLink>
      </li>
      <li>
        <NavLink to='/blog'>Blog</NavLink>
      </li>
      <li>
        <NavLink to='/about'>About</NavLink>
      </li>
    </ul>
  )
}
```

_ProductList.jsx_

```jsx
return (
  <ul>
    <li>
      <Link to='/products/1'>Product 1</Link>
    </li>
    <li>
      <Link to='/products/2'>Product 2</Link>
    </li>
    <li>
      <Link to='/products/3'>Product 3</Link>
    </li>
  </ul>
)
```

> [!CAUTION]
> Chỉ dùng thẻ `Routes` là cha trực tiếp của thẻ `Route` và ngược lại

#### Cách 2: Khai báo routes dùng useRoutes

_App.jsx_

```jsx
import { useRoutes } from 'react-router-dom'

const App = () => {
  const elements = useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/products',
      element: <Products />,
      children: [
        {
          path: ':id',
          element: <ProductDetail />
        }
      ]
    }
  ])

  return (
    <>
      <header>
        <Menu />
      </header>
      <main>{elements}</main>
    </>
  )
}

export default App
```

### Nested Routes

#### TH1: Khai báo routes ở 1 nơi

- /products => `<ProductList />`
- /products/1 => `<ProductDetail />`
- /products/1/intel-core-i9 => `<ProductInfo />`

_App.jsx_

```jsx
<Routes>
  <Route path='/products'>
    <Route element={<ProductList />} index />
    <Route path=':id'>
      <Route element={<ProductDetail />} index />
      <Route path=':slug' element={<ProductInfo />} />
    </Route>
  </Route>
</Routes>
```

> [!TIP]
> Prop `index` được chỉ định để khi match '/products' thì sẽ vào Route `ProductList`

#### TH2: Khai báo routes ở nhiều nơi

- /products => `<Products />`
- /products/add => `<AddProduct />`
- /products/1 => `<ProductDetail />`
- /products/1/intel-core-i9 => `<ProductInfo />`

_App.jsx_

```jsx
<Routes>
  <Route path='/products/*' element={<Products />} >
</Routes>
```

_Products.jsx_

```jsx
return (
  <>
    <ul>
      <li>
        <NavLink>Product List</NavLink>
      </li>
      <li>
        <NavLink>Add Product</NavLink>
      </li>
    </ul>

    <Routes>
      <Route index element={<ProductList />} />
      <Route path='add' element={<AddProduct />} />
      <Route path=':id'>
        <Route index element={<ProductDetail />} />
        <Route path=':slug' element={<ProductInfo />} />
      </Route>
    </Routes>
  </>
)
```

### Private Routes

_App.jsx_

```jsx
<Routes>
  <Route element={<AuthenMiddleware />}>
    <Route path='/profile' element={<Profile />} />
    <Route element={<AuthorMiddleware />}>
      <Route path='/admin' element={<Admin />} />
    </Route>
  </Route>

  <Route path='/auth/login' element={<Login />} />
  <Route path='/404' element={<PageNotFound />} />
  <Route path='*' element={<PageNotFound />} />
</Routes>
```

_AuthenMiddleware.jsx_

```jsx
import { Navigate, Outlet } from 'react-router-dom'

const AuthenMiddleware = () => {
  let isAuthen = false
  return isAuthen ? <Outlet /> : <Navigate to={'/auth/login'} />
}

export default AuthenMiddleware
```

> [!NOTE]
> Dùng thẻ `Outlet` na ná như children prop dùng để hiển thị component Route tương ứng đang match với url

_AuthorMiddleware.jsx_

```jsx
import { Navigate, Outlet } from 'react-router-dom'

const AuthorMiddleware = () => {
  let isAuthor = true

  return isAuthor ? <Outlet /> : <Navigate to='/404' />
}

export default AuthorMiddleware
```

- /profile => `<AuthenMiddleware />` => ✅ => `<Profile />`
- /profile => `<AuthenMiddleware />` => ❌ => `<Login />`
- /admin => `<AuthorMiddleware />` => ✅ => `<Admin />`
- /admin => `<AuthorMiddleware />` => ❌ => `<PageNotFound />`

### Layout

_App.jsx_

```jsx
<Routes>
  <Route element={<MainLayout />}>
    <Route path='/' element={<Home />} />
    <Route path='/blog' element={<Blog />} />

    <Route path='/404' element={<PageNotFound />} />
    <Route path='*' element={<PageNotFound />} />
  </Route>

  <Route path='/auth' element={<AuthenLayout />}>
    <Route path='login' element={<Login />} />
  </Route>
</Routes>
```

_MainLayout.jsx_

```jsx
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      <header>
        <Menu />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
```

_AuthenLayout.jsx_

```jsx
import { Outlet } from 'react-router-dom'

const AuthenLayout = () => {
  return (
    <main>
      <Outlet />
    </main>
  )
}

export default AuthenLayout
```

## Components

### Link

- Khi chuyển hướng bằng thẻ `Link`, nếu chúng ta muốn thay thế đường dẫn hiện tại chứ không phải thêm history vào stack thì ta dùng prop `replace`

```jsx
<Link to='/' replace>
  ...
</Link>
```

### NavLink

#### Custom class .active

- Vì một lý do nào đó chúng ta không muốn dùng class mặc định là `.active` của thẻ `<NavLink />` khi match thì ta sẽ làm như sau:

```jsx
// Cách 1
const activeWithClass = ({ isActive, ...rests }) => {
  // rests = {isPending: false, isTransitioning: false}
  return isActive ? 'current' : ''
}

// Cách 2
const activeWithStyle = ({ isActive }) => {
  return isActive ? { color: red } : {}
}

return (
  <ul>
    <li>
      <NavLink to='/home' className={activeWithClass}>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to='/about' style={activeWithStyle}>
        About
      </NavLink>
    </li>
  </ul>
)
```

#### NavLink bị active hàng loạt

```jsx
<ul>
  <li>
    <NavLink to='/'>Home</NavLink>
  </li>
  <li>
    <NavLink to='/blog'>Blog</NavLink>
  </li>
  <li>
    <NavLink to='/blog/new'>New Blog</NavLink>
  </li>
</ul>
```

- Như trường hợp trên đây do 2 thẻ `NavLink` có chung path là `/blog` nên khi đang ở route `/blog/new` cả 2 thẻ đều được `active`

```jsx
<NavLink to='/blog' end>
  Blog
</NavLink>
```

> [!TIP]
> Muốn khắc phục hiện trạng trên ta chỉ cần thêm prop `end` vào thẻ được cho là route cha (ở đây là thẻ `Blog`), thì khi vào route con nó sẽ không active thẻ route cha nữa

### Always Match Route

> [!NOTE]
> Đây là 1 tính năng nếu ta muốn route nào đó luôn hiện mặc dù url không match route đó, chỉ cần thêm prop location vào thẻ `Routes` và chỉ định path cho nó

- Component `<Blog />` nó sẽ luôn hiện cho dù đang ở url nào đi chăng nữa

```jsx
<Routes location='/blog'>
  <Routes path='/blog' element={<Blog />} />
</Routes>
```

#### Lưu ý thêm

> [!WARNING]
> Nếu dùng react-router-dom thấp hơn **v.6** thì hãy sắp xếp route theo thứ tự ưu tiên vì nó có thể hoạt động không đúng với mong muốn

- Như trường hợp dưới đây `/blog/new` sẽ không vào được route `<NewBlog />` mà nó sẽ vào route `<BlogDetail/>`, bởi vì route `/:id` được khai báo trước và vẫn coi là match nên không vào được route `/new`

```jsx
<Routes>
  <Route path='/blog' element={<Blog />}>
    <Route path=':id' element={<BlogDetail />} />
    <Route path='new' element={<NewBlog />} />
  </Route>
</Routes>
```

- Chúng ta phải đưa route `/new` lên trước route `/:id`

```jsx
<Routes>
  <Route path='/blog' element={<Blog />}>
    <Route path='new' element={<NewBlog />} />
    <Route path=':id' element={<BlogDetail />} />
  </Route>
</Routes>
```

> [!TIP]
> Nhưng từ v.6 đã thông minh hơn nên chúng ta không cần phải sắp xếp thứ tự route nữa

## Bonus

### Suspense Wrapper

> [!NOTE]
> Suspense Wrapper là một component sử dụng `Suspense` của react để xử lý tác vụ của một route heavy nào đó

- VD: như dưới đây chúng ta có 1 component có tác vụ khá nặng cần thời gian để xử lý thì mới hoàn thành được component này

_Fibonacci.jsx_

```jsx
const Fibonacci = () => {
  const fc = (n) => {
    if (n < 2) {
      return n
    }
    return fc(n - 1) + fc(n - 2)
  }
  return (
    <>
      <h1>About</h1>
      <p>{fc(40)}</p>
    </>
  )
}

export default Fibonacci
```

_SuspenseWrapper.jsx_

```jsx
import { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
export default function SuspenseWrapper({ path }) {
  const LazyComponent = lazy(() => import(path))
  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <LazyComponent />
    </Suspense>
  )
}

SuspenseWrapper.propTypes = {
  path: PropTypes.string.isRequired
}
```

_App.jsx_

```jsx
<Route path='/fibonacci' element={<SuspenseWrapper path='../pages/Fibonacci.jsx' />} />
```

> [!WARNING]
> Nên nhớ là `path` sẽ được tính từ `SuspenseWrapper` đang đứng tới đường dẫn **component heavy** chứ không phải là nơi chúng ta dùng `SuspenseWrapper` này

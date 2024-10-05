import { Route, Routes } from 'react-router-dom'
import { AuthenMiddleware, AuthorMiddleware } from './Middleware'
import { Blog, Contact, Home, Products, Profile, ThankYou } from './Pages'

import './App.css'
import SuspenseWrapper from './Components/SuspenseWrapper'
import { AuthenLayout, MainLayout } from './Layouts'

const App = () => {
  // const elements = useRoutes([
  //   {
  //     path: '/',
  //     element: <MainLayout />,
  //     children: [
  //       {
  //         path: '/',
  //         element: <Home />
  //       },
  //       {
  //         path: '/about',
  //         element: <SuspenseWrapper path='../Pages/About.jsx' />
  //       }
  //     ]
  //   }
  // ])

  // return elements

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />

        {/* Heavy Component */}
        <Route path='/about' element={<SuspenseWrapper path='../Pages/About.jsx' />} />
        {/* <Route
          path='/about'
          element={
            <Suspense fallback={<h3>Loading...</h3>}>
              <About />
            </Suspense>
          }
        /> */}

        <Route path='/products/*' element={<Products />} />
        {/* <Route path='/products'>
          <Route index element={<Products />} />
          <Route path=':id'>
            <Route index element={<ProductDetail />} />
            <Route path=':slug' element={<ProductDetail />} />
          </Route>
        </Route> */}

        {/* <Route path='/products/:path' element={<ProductDetail />} /> */}

        <Route path='/contact' element={<Contact />} />
        <Route path='/blog' element={<Blog />} />

        <Route path='/thank-you' element={<ThankYou />} />

        <Route element={<AuthenMiddleware />}>
          {/* Middleware route - Authen*/}
          <Route path='/profile' element={<Profile />} />
          <Route element={<AuthorMiddleware />}>
            {/* Author */}
            <Route path='/admin' element={<h1>Admin</h1>} />
          </Route>
        </Route>

        <Route path='*' element={<h1>Not found</h1>} />
      </Route>

      <Route path='/auth' element={<AuthenLayout />}>
        <Route path='login' element={<h1>Login</h1>} />
      </Route>
    </Routes>
  )
}

export default App

// <Route path='/products'>
//   <Route path='' element={<Products />} />
//   <Route path=':id' element={<ProductDetail />}>
//     <Route path=':slug' element={<ProductDetail />} />
//   </Route>
// </Route>

// <Route index element={<Products />} />

{
  /* <Route element={<AuthenMiddleware />}>
  <Route path='/admin' element={<h1>Admin</h1>} />
  <Route path='/profile' element={<h1>Profile</h1>} />
  </Route> */
}

{
  /* <Route path='/auth'>
  <Route path='login' element={<h1>Login</h1>} />
</Route> */
}

// <Routes>
//   <Route element={<MainLayout />}>
//     <Route path='/' element={<Home />} />
//     <Route path='/about' element={<About />} />

// <Route path='/products'>
//   <Route path='' element={<Products />} />
//   <Route path=':id' element={<ProductDetail />}>
//     <Route path=':slug' element={<ProductDetail />} />
//   </Route>
// </Route>

//     <Route path='/contact' element={<Contact />} />
//     <Route path='/blog' element={<Blog />} />

//     <Route path='/thank-you' element={<ThankYou />} />

//     <Route element={<AuthenMiddleware />}>
//       <Route path='/admin' element={<h1>Admin</h1>} />
//       <Route path='/profile' element={<h1>Profile</h1>} />
//     </Route>

//     <Route path='*' element={<h1>Not found</h1>} />
//   </Route>

//   <Route path='/auth' element={<AuthenLayout />}>
//     <Route path='login' element={<h1>Login</h1>} />
//   </Route>
// </Routes>

// ---- OLD
// <div className='app'>
//   <Menu />
//   <main>
//     <Routes>
//       <Route path='/' element={<Home />} />
//       <Route path='/about' element={<About />} />

//       <Route path='/products'>
//         {/* Nested route */}
//         <Route index element={<Products />} />
//         <Route path=':id'>
//           <Route index element={<ProductDetail />} />
//           <Route path=':slug' element={<ProductDetail />} />
//         </Route>
//       </Route>

//       <Route path='/contact' element={<Contact />} />
//       <Route path='/blog' element={<Blog />} />

//       <Route path='/thank-you' element={<ThankYou />} />

//       <Route element={<AuthenMiddleware />}>
//         {/* Middleware route - Authen*/}
//         <Route path='/profile' element={<Profile />} />
//         <Route element={<AuthorMiddleware />}>
//           {/* Author */}
//           <Route path='/admin' element={<h1>Admin</h1>} />
//         </Route>
//       </Route>

//       <Route path='/auth'>
//         <Route index element={<Error />} />
//         <Route path='login' element={<h1>Login</h1>} />
//       </Route>
//       <Route path='*' element={<Error />} />
//     </Routes>
//   </main>
// </div>

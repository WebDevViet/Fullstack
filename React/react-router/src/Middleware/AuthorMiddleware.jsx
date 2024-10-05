import { Navigate, Outlet } from 'react-router-dom'

const AuthorMiddleware = () => {
  let isAuthor = false

  return isAuthor ? <Outlet /> : <Navigate to='/page-not-found' />
}

export default AuthorMiddleware

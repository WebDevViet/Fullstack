import { Navigate, Outlet } from 'react-router-dom'

const AuthenMiddleware = () => {
  let isAuthen = true
  return isAuthen ? <Outlet context={{ profile: 'Phuc' }} /> : <Navigate to={'/auth/login'} />
}

export default AuthenMiddleware

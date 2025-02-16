import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Login = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  useEffect(() => {
    const accessToken = params.get('access-token')
    const refreshToken = params.get('refresh-token')

    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    const newUser = params.get('new-user')
    const verifyEmail = params.get('verify-email')
    navigate('/', { state: { newUser, verifyEmail, isLogged: true } })
  }, [params, navigate])
  return <div>Login</div>
}

export default Login

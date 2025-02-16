import { Link, useLocation, useNavigate } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import { getGoogleAuthUrl } from './helpers/getGoogleAuthURL'
import viteLogo from '/vite.svg'
import { useEffect } from 'react'

const oauthGoogleUrl = getGoogleAuthUrl()

const UserVerifyStatus = {
  Unverified: 0,
  Verified: 1,
  Blocked: 2
}

const Home = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/', { state: null })
  }

  useEffect(() => {
    if (state?.newUser === 'true') {
      alert('Account created successfully')
    }
  }, [state])

  return (
    <>
      <div>
        <span>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </span>
        <span>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </span>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        {state?.isLogged ? (
          <>
            {+state?.verifyEmail === UserVerifyStatus.Unverified ? (
              <p>
                <strong>Please verify your email</strong>
              </p>
            ) : (
              <p>Hello</p>
            )}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to={oauthGoogleUrl.href}>Login with Google</Link>
        )}
      </div>
    </>
  )
}

export default Home

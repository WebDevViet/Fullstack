import { useEffect, useState } from 'react'

export default function Authen() {
  const [isLogin, setIsLogin] = useState(false)
  const [status, setStatus] = useState('pending')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLogin(true)
    }
    setStatus('idle')
  }, [])

  // useLayoutEffect(() => {
  //   run before render
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     setIsLogin(true)
  //   }
  // }, [])

  return (
    <div className='w-75 mx-auto py-3'>
      <h1>Authentication</h1>

      {(status === 'pending' && <p>loading...</p>) || <h2>{isLogin ? 'Welcome' : 'Login'}</h2>}
    </div>
  )
}

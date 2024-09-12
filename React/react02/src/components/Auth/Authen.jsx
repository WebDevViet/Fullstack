import { useEffect } from 'react'
import { useDispatch, useSelector } from '../../store/hook'
import Login from './Login'
import Profile from './Profile'
import fetchAuth from '../../store/middlewares/fetchAuth'

export default function Authen() {
  const authen = useSelector((state) => state.authen)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))

    if (token) return dispatch(fetchAuth({ token }))

    dispatch({
      type: 'authen/setStatus',
      payload: 'idle'
    })
  }, [])
  console.log('render Authen')

  return (
    <div>
      <div>{authen.status === 'idle' && (authen.user ? <Profile /> : <Login />)}</div>
      <p>{authen.status === 'pending' && 'loading...'}</p>
    </div>
  )
}

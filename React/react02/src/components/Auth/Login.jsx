import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from '../../store/hook'
import fetchAuth from '../../store/middlewares/fetchAuth'

export default function Login() {
  const [form, setForm] = useState({})
  const dispatch = useDispatch()
  const authen = useSelector((state) => state.authen)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.email || !form.password) {
      return alert('Please enter username and password')
    }

    dispatch(fetchAuth(form))
  }

  useEffect(() => {
    if (authen.token) {
      localStorage.setItem('token', JSON.stringify(authen.token))
    }
  }, [authen.token])

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            required
            type='email'
            placeholder='email'
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            value={form.email}
          />
        </div>
        <div>
          <input
            required
            type='password'
            placeholder='password'
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            value={form.password}
          />
        </div>
        <button disabled={authen.isLoading === 'pending'} type='submit'>
          {authen.isLoading === 'pending' ? 'Loading...' : 'Login'}
        </button>
      </form>
    </>
  )
}

//Lấy dữ liệu từ form
//Call API login ==> Lấy token ==> Lưu vào localStorage
//Dùng token để lấy thông tin profile
//Lưu toàn bộ thông tin profile lên store
//Dùng dữ liệu từ store để check và thay đổi hiển thị component

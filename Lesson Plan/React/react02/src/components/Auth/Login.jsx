import { useState } from 'react'
import { useDispatch, useSelector } from '../../store/hook'
import { fetchAuth } from '../../store/middlewares/fetchAuth'
export default function Login() {
  const [form, setForm] = useState({})
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const handleChangeValue = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmitForm = (e) => {
    e.preventDefault()
    dispatch(fetchAuth(form.email, form.password))
  }

  return (
    <div>
      <h1>Login</h1>
      <form action='' onSubmit={handleSubmitForm}>
        <div>
          <input type='email' name='email' placeholder='Email...' onChange={handleChangeValue} />
        </div>
        <div>
          <input type='password' name='password' placeholder='Password...' onChange={handleChangeValue} />
        </div>
        <button disabled={auth.isLoading === 'pending'}>{auth.isLoading === 'pending' ? 'loading...' : 'login'}</button>
      </form>
    </div>
  )
}

//Lấy dữ liệu từ form
//Call API login ==> Lấy token ==> Lưu vào localStorage
//Dùng token để lấy thông tin profile
//Lưu toàn bộ thông tin profile lên store
//Dùng dữ liệu từ store để check và thay đổi hiển thị component

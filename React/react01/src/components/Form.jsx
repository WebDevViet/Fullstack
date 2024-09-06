import { useState } from 'react'

const initState = {
  email: '',
  password: ''
}

export default function Form() {
  const [form, setForm] = useState(initState)

  const [errors, setErrors] = useState({})

  const [status, setStatus] = useState('idle')

  const [users, setUsers] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('loading')

    setErrors({
      email: form.email ? null : 'Vui lòng nhập email',
      password: form.password ? null : 'Vui lòng nhập password'
    })

    if (form.email && form.password) {
      form.id = users.length + 1
      setUsers([...users, form])
      setForm(initState)
    }

    // API
    setStatus('idle')
  }

  const handleChangeValue = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value })
  }

  return (
    <div className='w-75 mx-auto py-3'>
      <h1 className='text-center'>Form</h1>
      <h2 className='text-center'>Login</h2>
      <form action='' onSubmit={handleSubmit}>
        <div className='mb-3'>
          {/* htmlFor: id cho input*/}
          <label htmlFor=''>Email</label>
          <input
            type='text'
            className='form-control'
            name='email'
            placeholder='Email...'
            onChange={handleChangeValue}
            value={form.email}
          />
          {errors.email && <p className='text-danger'>{errors.email}</p>}
        </div>
        <div className='mb-3'>
          <label htmlFor=''>Password</label>
          <input
            type='password'
            className='form-control'
            name='password'
            placeholder='Password...'
            onChange={handleChangeValue}
            value={form.password}
          />
          {errors.password && <p className='text-danger'>{errors.password}</p>}
        </div>
        <div className='d-grid'>
          <button disabled={status === 'loading'} className='btn btn-primary'>
            {status === 'loading' ? 'Loading...' : 'Login'}
          </button>
        </div>
      </form>
      <hr />
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  )
}

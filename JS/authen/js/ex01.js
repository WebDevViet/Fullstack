import { httpClient } from './client.js'

const userInfo = {
  email: 'john@mail.com',
  password: 'changeme'
}

// handle Loading btn submit

const setLoadingBtn = (loginForm) => {
  const btn = loginForm.querySelector('.btn')
  btn.disabled = true
  btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span><span> Loading...</span>`
}
const removeLoadingBtn = (loginForm) => {
  const btn = loginForm.querySelector('.btn')
  btn.innerText = 'Đăng nhập'
  btn.disabled = false
}

// Show message error
const showMessage = (loginForm, msg, type = 'success') => {
  const msgEl = loginForm.querySelector('.msg')
  msgEl.innerHTML = `<div class="alert alert-${type} text-center">${msg}</div>`
}

// handle call API Login
const sendLogin = async (loginData) => {
  try {
    const { response, data } = await httpClient.post('/auth/login', loginData)

    if (!response.ok) {
      throw new Error('Unauthorize')
    }

    // return response.json()
    return data
  } catch {
    return false
  }
}

// handle event

document.body.addEventListener('submit', async (e) => {
  e.preventDefault()
  const loginForm = e.target
  const { email, password } = Object.fromEntries([...new FormData(e.target)])

  const errors = {}

  if (!email) {
    errors.email = 'Vui lòng nhập email'
  }

  if (!password) {
    errors.password = 'Vui lòng nhập mật khẩu'
  }

  const elListErr = loginForm.querySelectorAll('.error')

  // reset error
  elListErr.forEach((errorEl) => {
    errorEl.innerText = ''
  })

  if (Object.keys(errors).length) {
    Object.keys(errors).forEach((key) => {
      const error = errors[key]
      const errorEl = loginForm.querySelector(`.error-${key}`)
      if (errorEl) {
        errorEl.innerText = error
      }
    })
  } else {
    // call API verify Authentication (get access token & refresh token)
    setLoadingBtn(loginForm)
    const token = await sendLogin({ email, password })
    removeLoadingBtn(loginForm)

    if (!token) {
      showMessage(loginForm, 'Email hoặc mật khẩu không chính xác', 'danger')
    } else {
      localStorage.setItem('login_token', JSON.stringify(token))
      render()
    }
  }
})

const addEventLogout = () => {
  const btnLogout = document.querySelector('.btn-logout')
  btnLogout.addEventListener(
    'click',
    () => {
      localStorage.removeItem('login_token')
      render()
    },
    { once: true }
  )
}

// show name

const getProfile = async () => {
  try {
    const { access_token: accessToken } = JSON.parse(localStorage.getItem('login_token'))
    httpClient.accessToken = accessToken

    const { response, data } = await httpClient.get('/auth/profile')
    if (!response.ok) {
      throw new Error('Unauthorize')
    }

    return data
  } catch (error) {
    return false
  }
}

const showProfile = async () => {
  const user = await getProfile()
  if (user) {
    const profileNameEl = document.querySelector('.profile-name')
    profileNameEl.innerText = user.name
    addEventLogout()
  } else render()
}

// start render

const render = async () => {
  const status = localStorage.getItem('login_token') ? true : false //Trạng thái đăng nhập

  if (status) {
    document.body.innerHTML = `<div class="container py-3">
      <h2>Chào mừng bạn đến với F8</h2>
      <ul class="list-unstyled d-flex gap-2">
        <li>Chào bạn: <span class="profile-name">Loading...</span></li>
        <li><a href="#" class="btn-logout">Đăng xuất</a></li>
      </ul>
    </div>`
    showProfile()
  } else {
    document.body.innerHTML = `<div class="w-50 mx-auto py-3">
      <h2 class="text-center">Đăng nhập</h2>
      <form action="" class="login-form">
        <div class="msg"></div>
        <div class="mb-3">
          <label for="">Email</label>
          <input
            type="text"
            name="email"
            class="form-control"
            placeholder="Email..."
          />
          <span class="text-danger error error-email"></span>
        </div>
        <div class="mb-3">
          <label for="">Mật khẩu</label>
          <input
            type="password"
            name="password"
            class="form-control"
            placeholder="Mật khẩu..."
          />
          <span class="text-danger error error-password"></span>
        </div>
        <div class="d-grid">
          <button class="btn btn-primary">Đăng nhập</button>
        </div>
      </form>
    </div>`
  }
}

document.addEventListener('DOMContentLoaded', render)

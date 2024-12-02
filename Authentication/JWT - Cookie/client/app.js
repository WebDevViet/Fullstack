class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:4000/',
      timeout: 10000,
      withCredentials: true
    })
    let refreshingToken = null

    // Mỗi req được gửi đi sẽ kèm theo header nếu có

    this.refreshToken = async () => {
      try {
        const tokenNew = await this.instance.post('refresh-token')
        return tokenNew
      } catch (error) {
        throw error
      }
    }

    // Success
    const handleResponse = (response) => {
      return response.data
    }

    // Error
    const handleResponseError = async (error) => {
      if (error.response.status === 401 && error.response.data.name === 'EXPIRED_ACCESS_TOKEN') {
        refreshingToken ??= this.refreshToken()
        try {
          await refreshingToken
          // Đã refreshToken thành công => trả về access token mới - cookie đã có access token mới
          // error.response.config: thông tin của req của trước đó bị exp (config: method, header, body)
          return this.instance(error.response.config) // chạy lại req trước đó do access Token bị exp
        } catch (refreshTokenError) {
          throw refreshTokenError
        } finally {
          refreshingToken = null // để cho req tiếp theo chạy lại refreshToken() mới nếu bị access exp
        }
      }
      throw error
    }

    this.instance.interceptors.response.use(handleResponse, handleResponseError)
  }

  get(url) {
    return this.instance.get(url)
  }

  post(url, body) {
    return this.instance.post(url, body)
  }
}

const http = new Http()

const fetchProfile = () => {
  http
    .get('profile')
    .then((res) => {
      // res = res.data
      console.log('🚀 ~ fetchProfile ~ res:', res)
    })
    .catch((error) => {
      console.log('🚀 ~ fetchProfile ~ error:', error)
    })
}

const fetchProducts = () => {
  http
    .get('products')
    .then((res) => {
      console.log('🚀 ~ fetchProducts ~ res:', res)
    })
    .catch((error) => {
      console.log('🚀 ~ fetchProducts ~ error:', error)
    })
}

document.getElementById('login-form').addEventListener('submit', (event) => {
  event.preventDefault()
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  http
    .post('login', {
      email,
      password
    })
    .then((res) => {
      console.log('🚀 ~ .then ~ res:', res)
    })
    .catch((error) => {
      console.log('🚀 ~ login-form ~ error:', error)
    })
})

document.getElementById('btn-get-profile').addEventListener('click', (event) => {
  fetchProfile()
})

document.getElementById('btn-get-products').addEventListener('click', (event) => {
  fetchProducts()
})

document.getElementById('btn-get-both').addEventListener('click', (event) => {
  fetchProfile()
  fetchProducts()
})

document.getElementById('btn-refresh-token').addEventListener('click', (event) => {
  http.refreshToken()
})

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:4000',
      timeout: 10000,
      withCredentials: true
    })
    let refreshingToken = null

    this.refreshToken = async () => {
      try {
        const tokenNew = await this.instance.post('refresh-token')
        return tokenNew
      } catch (error) {
        throw error.response
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
          return this.instance(error.response.config)
        } catch (refreshTokenError) {
          throw refreshTokenError
        } finally {
          refreshingToken = null
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
  http
    .refreshToken()
    .then((res) => {
      console.log('🚀 ~ .then ~ res:', res)
    })
    .catch((error) => {
      console.log('🚀 ~ document.getElementById ~ error:', error)
    })
})

document.getElementById('btn-logout').addEventListener('click', (event) => {
  http
    .get('logout')
    .then((res) => {
      console.log('🚀 ~ .then ~ res:', res)
    })
    .catch((error) => {
      console.log('🚀 ~ document.getElementById ~ error:', error)
    })
})

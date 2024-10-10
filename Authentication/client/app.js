class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:4000/',
      timeout: 10000
    })
    let refreshingToken = null

    this.refreshToken = async () => {
      const refresh_token = localStorage.getItem('refresh_token')
      try {
        const res = await this.instance.post('refresh-token', { refresh_token })
        const { access_token } = res.data
        localStorage.setItem('access_token', access_token)
        return access_token
      } catch (error) {
        localStorage.clear()
        throw error.response
      }
    }

    const addAuthorizationHeader = (config) => {
      const access_token = localStorage.getItem('access_token')
      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`
      }
      return config
    }

    const handleResponse = (response) => {
      return response.data
    }

    const handleResponseError = async (error) => {
      if (error.response.status === 401 && error.response.data.name === 'EXPIRED_ACCESS_TOKEN') {
        refreshingToken ??= this.refreshToken()
        try {
          error.response.config.Authorization = await refreshingToken
          return this.instance(error.response.config)
        } catch (refreshTokenError) {
          throw refreshTokenError
        } finally {
          refreshingToken = null
        }
      }
      return Promise.reject(error)
    }

    this.instance.interceptors.request.use(addAuthorizationHeader)
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
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
}

const fetchProducts = () => {
  http
    .get('products')
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
}

document.getElementById('login-form').addEventListener('submit', (event) => {
  event.preventDefault()
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  http
    .post('login', {
      username,
      password
    })
    .then((res) => {
      localStorage.setItem('access_token', res.data.access_token)
      localStorage.setItem('refresh_token', res.data.refresh_token)
    })
    .catch((error) => {
      console.log(error)
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

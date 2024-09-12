import { config } from './config.js'
export const httpClient = {
  serverApi: config.SERVER_API ?? null,
  accessToken: null,
  refreshTokenPromise: null,
  send: async function (path, method = 'GET', body = null, headers = {}) {
    try {
      if (!this.serverApi) {
        throw new Error('serverApi is not defined')
      }

      const url = this.serverApi + path

      headers['Content-Type'] = 'application/json'

      if (this.accessToken) {
        headers.Authorization = `Bearer ${this.accessToken}`
      }

      const options = { method, headers }

      if (body) {
        options.body = JSON.stringify(body)
      }

      const response = await fetch(url, options)

      if (!response.ok) {
        // usually Unauthorize - 401
        throw new Error(response.statusText)
      }

      const data = await response.json()
      return { response, data }
    } catch (error) {
      //Gọi API để cấp lại accessToken mới (Truyền lên refreshToken)
      //Kiểm tra Response của api RefreshToken có hợp lệ không
      // - Không hợp lệ --> Failed --> Logout
      // - Hợp lệ --> Lưu token mới vào Storage --> Gọi lại request bị Failed (Gọi lại hàm send)
      //Lưu ý: Xử lý trường hợp nhiều request chạy đồng thời
      if (this.accessToken) {
        if (!this.refreshTokenPromise) {
          this.refreshTokenPromise = this.getNewAccessToken()
        }
        const newToken = await this.refreshTokenPromise
        if (!newToken) {
          return false
        }
        this.accessToken = newToken.access_token
        return this.send(path, method, body, headers)
      }
    }
  },
  getNewAccessToken: async function () {
    try {
      const { refresh_token: refreshToken } = JSON.parse(localStorage.getItem('login_token'))
      const { response, data: newToken } = await this.post('/auth/refresh-token', { refreshToken })
      if (!response.ok) {
        localStorage.removeItem('login_token')
        throw new Error('RefreshToken is not valid')
      }
      localStorage.setItem('login_token', JSON.stringify(newToken))
      return newToken
    } catch (e) {
      return false
    }
  },
  get: function (path, headers = {}) {
    return this.send(path, 'GET', null, headers)
  },
  post: function (path, body, headers = {}) {
    return this.send(path, 'POST', body, headers)
  },
  put: function (path, body, headers = {}) {
    return this.send(path, 'PUT', body, headers)
  },
  patch: function (path, body, headers = {}) {
    return this.send(path, 'PATCH', body, headers)
  },
  delete: function (path, headers = {}) {
    return this.send(path, 'DELETE', null, headers)
  }
}

/*
const {response, data} = await httpClient.get('/users')
*/

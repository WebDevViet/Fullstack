const authenticate = async (email, password) => {
  const res = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })

  const data = await res.json()
  return data
}

export const getProfile = async (token) => {
  const res = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()
  return data
}

export default function fetchAuth({ email, password, token }) {
  // Trường hợp mounting component
  const isMounting = token

  return async (dispatch) => {
    try {
      if (!token) {
        // Trường hợp login
        dispatch({
          type: 'authen/isLoading',
          payload: 'pending'
        })

        token = await authenticate(email, password)
        if (!token) throw new Error('Login failed')

        dispatch({
          type: 'authen/setToken',
          payload: token
        })
      }

      const profile = await getProfile(token.access_token)

      if (!profile) throw new Error('Get profile failed')

      dispatch({
        type: 'authen/setUser',
        payload: profile
      })
    } catch (error) {
      dispatch({
        type: 'authen/setUser',
        payload: error.message
      })
    } finally {
      if (!isMounting) {
        dispatch({
          type: 'authen/isLoading',
          payload: 'idle'
        })
      }

      if (isMounting) {
        dispatch({
          type: 'authen/setStatus',
          payload: 'idle'
        })
      }
    }
  }
}

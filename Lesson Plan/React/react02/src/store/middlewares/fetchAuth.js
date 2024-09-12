const authenticate = async (data) => {
  const response = await fetch(`https://api.escuelajs.co/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

const getProfile = async (accessToken) => {
  const response = await fetch(`https://api.escuelajs.co/api/v1/auth/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return response.json()
}

export const fetchAuth = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'auth/setLoading', payload: 'pending' })
      const token = await authenticate({ email, password })

      if (!token) {
        throw new Error('Login failed')
      }

      const profile = await getProfile(token.access_token)

      if (!profile) {
        throw new Error('Profile failed')
      }

      if (profile) {
        dispatch({ type: 'auth/setUser', payload: profile })
      }

      localStorage.setItem('user_token', JSON.stringify(token))
    } catch (error) {
      alert(error.message)
    } finally {
      dispatch({ type: 'auth/setLoading', payload: 'idle' })
    }
  }
}

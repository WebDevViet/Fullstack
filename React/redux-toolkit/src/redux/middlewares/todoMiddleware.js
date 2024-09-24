const getTodos = () => {
  return async (dispatch, _, API) => {
    try {
      const res = await fetch(`${API}/todos`)

      if (!res.ok) throw new Error(res.statusText)

      const todos = await res.json()
      dispatch({ type: 'todo/set', payload: todos })
    } catch (error) {
      dispatch({ type: 'todo/setError', payload: error.message })
    }
  }
}

export default getTodos

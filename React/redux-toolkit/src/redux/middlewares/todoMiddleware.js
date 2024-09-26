//createAsyncThunk - API - extraReducers
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getTodos = createAsyncThunk('todos/getTodos', async (_, { extra: { api } }) => {
  const res = await fetch(api + '/todos')
  const todos = await res.json()
  return todos
})

// reduxThunk - logic at client - reducers
// import { setError, setLoading, setTodos } from '../slices/todoSlice'

// const getTodos = () => {
//   return async (dispatch) => {
//     try {
//       dispatch(setLoading('pending'))
//       const res = await fetch(`https://jsonplaceholder.typicode.com/todos`)

//       console.log('🚀 ~ return ~ res:', res)
//       if (!res.ok) throw new Error(res.statusText)

//       const todos = await res.json()
//       dispatch(setTodos(todos))
//     } catch (error) {
//       dispatch(setError(error.message)) //status = failed
//     }
//   }
// }

// export default getTodos

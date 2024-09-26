import { createSlice } from '@reduxjs/toolkit'
import { getTodos } from '../middlewares/todoMiddleware'

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todoList: [],
    status: 'idle',
    error: null
  },
  reducers: {
    // chuyên xử lý state client
  },
  extraReducers: (builder) => {
    // giống reducers nhưng extraReducers chuyên xử lý action async API
    builder.addCase(getTodos.pending, (state) => {
      state.status = 'pending'
    })

    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.status = 'idle'
      state.todoList = action.payload
    })

    builder.addCase(getTodos.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})

export const { setTodos, setError, setLoading } = todoSlice.actions
export default todoSlice.reducer

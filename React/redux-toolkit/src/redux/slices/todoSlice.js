import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todoList: [],
    status: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = 'pending'
    })

    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todoList = action.payload
      state.status = 'idle'
    })

    builder.addCase(fetchTodos.rejected, (state) => {
      state.status = 'failed'
    })
  }
})

//Thunk Middleware
export const fetchTodos = createAsyncThunk('fetchTodos', async (_, { rejectWithValue }) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos')
  if (!response.ok) {
    return rejectWithValue('No Data')
  }
  const todos = await response.json()
  return todos
})
